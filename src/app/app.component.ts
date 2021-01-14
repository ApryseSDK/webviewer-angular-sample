import { Component, ViewChild, OnInit, ElementRef, AfterViewInit } from '@angular/core';
import WebViewer from '@pdftron/webviewer';
import { WebViewerInstance, Annotations as AnnotationsType } from '@pdftron/webviewer';
import { Flyout } from './flyout';

enum Colors {
  GREY = '#ededed',
  RED = '#c72a2a'
}

enum AnnotationFieldType {
  TX = 'Tx', // select, combobox, listbox
  BTN = 'Btn', // checkbox and radio buttons
  CH = 'Ch', // select, combobox, listbox
  SIG = 'Sig' // pdftron signature type
}

export interface Step {
  name: string;
  index: number;
  type: AnnotationFieldType;
  pageNumber: number
  x: number;
  y: number;
  field: AnnotationsType.Forms.Field
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {
  @ViewChild('viewer', { static: false }) viewer: ElementRef;
  wvInstance: any;

  steps: Array<Step> = [];
  annotationsLoaded = false;
  annotationTracker = {};
  stepTracker: { [name: string]: Step } = {};
  flyout: Flyout;

  initialPagesDrawn: Array<number> = [];

  constructor() { }

  ngAfterViewInit(): void {

    WebViewer({
      path: '../lib',
      initialDoc: '../files/test_7_pages_01.pdf',
      css: 'app/webviewer.css',
    }, this.viewer.nativeElement).then(instance => {
      this.wvInstance = instance;

      instance.docViewer.on('documentLoaded', this.wvDocumentLoadedHandler);
    });
  }

  ngOnInit() {
    this.wvDocumentLoadedHandler = this.wvDocumentLoadedHandler.bind(this);
  }

  wvDocumentLoadedHandler(): void {
    console.log('documentLoaded');
    const { Annotations, docViewer, annotManager } = this.wvInstance;

    Annotations.WidgetAnnotation.getContainerCustomStyles = widget => {
      if (widget instanceof Annotations.TextWidgetAnnotation) {
        // can check widget properties
        if (widget.fieldFlags.get('Required')) {
          return {
            'background-color': Colors.GREY,
            'border': `solid 1px ${Colors.RED}`
          };
        }
        return {
          'background-color': Colors.GREY
        };
      }
    };

    docViewer.on('annotationsLoaded', this.onAnnotationsLoaded.bind(this));
    annotManager.on('annotationsDrawn', this.onAnnotationsDrawn.bind(this));
  }

  /**
   * Handler that is called when all annotations have been loaded. All the fields are
   * looped over to in order to create the guide steps. Grouped fields, like grouped
   * radio buttons, are counted as one step.
   */
  private onAnnotationsLoaded() {
    const { annotManager } = this.wvInstance;
    const fieldManager = annotManager.getFieldManager();
    let index = 0;

    const getField = (field: AnnotationsType.Forms.Field) => {
      if (!field.type) {
        // Recursive to get the fields that are nested in the document tree
        field.children.forEach(getField);
      } else {
        const step = {
          name: field.name,
          index: index,
          type: <AnnotationFieldType>field.type,
          pageNumber: field.widgets[0].PageNumber,
          x: field.widgets[0].getX(),
          y: field.widgets[0].getY(),
          field: field
        }
        this.steps.push(step);
        this.stepTracker[step.name] = step;
        index += 1;
      }
    }

    fieldManager.forEachField(getField);

    this.annotationsLoaded = true;

    // Handle annotationsDrawn handler for pages that have already been drawn
    this.initialPagesDrawn.forEach(this.onAnnotationsDrawn.bind(this));
  }

  /**
   * Handler that is triggered when the annotations have been drawn on a given page.
   * This is needed because we have to wait until the annotations are drawn on
   * the page before we can attach events to them as the steps would not exist.
   * After the annotations are loaded, the function will be run on the pages that
   * have already been drawn.
   * @param {number} pageNumber
   */
  private onAnnotationsDrawn(pageNumber: number) {
    const { annotManager, Annotations } = this.wvInstance;
    const annotList = annotManager.getAnnotationsList();

    if (!this.annotationsLoaded && this.initialPagesDrawn.indexOf(pageNumber) === -1) {
      // We do not want to handle the annotations until all annotations have been loaded
      // because the 'annotationsDrawn' event will fire before the annotationsLoaded event.
      this.initialPagesDrawn.push(pageNumber);
    } else if (this.annotationsLoaded) {
      if (annotList) {
        // console.log('annotationsDrawn', pageNumber);
        annotList.forEach((annot) => {
          if (annot instanceof Annotations.WidgetAnnotation) {
            if (!this.annotationTracker[annot.Id]) {
              this.attachEvents(annot);
            }
          }
        });
      }
    }
  }

  private attachEvents(annotation: AnnotationsType.WidgetAnnotation) {
    // Events are attached to each applicable annotation (Focus)
    const field = annotation.getField();
    const element = (<HTMLElement>annotation.element);
    const step = this.stepTracker[field.name];

    if (element && step) {
      // Update the tracker when we have a element to attach events to
      this.annotationTracker[annotation.Id] = true;

      element.firstChild.addEventListener('focus', (ev: FocusEvent) => {
        // The current step is whatever field is focused
        // On focus, update the bar and flyout
        // console.log('focus', step.pageNumber, step.name);

        const nextStepIndex = step.index + 1 === this.steps.length ? 0 : step.index + 1;

        if (!this.flyout) {
          this.flyout = new Flyout(this.wvInstance, step, this.steps[nextStepIndex]);
        } else {
          this.flyout.move(step, this.steps[nextStepIndex]);
        }
      });
    }
  }
}
