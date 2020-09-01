import { Component, ViewChild, OnInit, ElementRef, AfterViewInit } from '@angular/core';
import WebViewer from '@pdftron/webviewer';

enum Colors {
  GREY = '#ededed',
  RED = '#c72a2a'
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {
  @ViewChild('viewer', { static: false }) viewer: ElementRef;
  wvInstance: any;

  constructor() { }

  ngAfterViewInit(): void {

    WebViewer({
      path: '../lib',
      initialDoc: '../files/test_four_fields.pdf',
      css: 'app/webviewer.css',
      config: 'app/config.js',
    }, this.viewer.nativeElement).then(instance => {
      this.wvInstance = instance;

      // now you can access APIs through this.webviewer.getInstance()
      instance.openElements(['notesPanel']);
      // see https://www.pdftron.com/documentation/web/guides/ui/apis for the full list of APIs

      // or listen to events from the viewer element
      this.viewer.nativeElement.addEventListener('pageChanged', (e) => {
        const [pageNumber] = e.detail;
        console.log(`Current page is ${pageNumber}`);
      });

      // or from the docViewer instance
      instance.docViewer.on('documentLoaded', this.wvDocumentLoadedHandler);
    });
  }

  ngOnInit() {
    this.wvDocumentLoadedHandler = this.wvDocumentLoadedHandler.bind(this);
  }

  wvDocumentLoadedHandler(): void {
    console.log('documentLoaded');

    // you can access docViewer object for low-level APIs
    const docViewer = this.wvInstance;
    const annotManager = this.wvInstance.annotManager;
    // and access classes defined in the WebViewer iframe
    const { Annotations } = this.wvInstance;

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

    this.wvInstance.docViewer.on('annotationsLoaded', () => {
      console.log('annotations loaded');
      const annotList = annotManager.getAnnotationsList();
      annotList.forEach(annot => {
        if (annot instanceof Annotations.WidgetAnnotation) {

          // C for Calculate, F for Format, V for Validation, K for Keystroke
          switch (annot.fieldName) {
            case 'Text1':
              // Actions that handle Zipcode format and keystroke
              (<any>annot).addAction('F', new this.wvInstance.Actions.JavaScript({ javascript: 'AFSpecial_Format(0);' }));
              (<any>annot).addAction('K', new this.wvInstance.Actions.JavaScript({ javascript: 'AFSpecial_Keystroke(0);' }));
              break;
            case 'Text2':
              // Actions that handles a mask on the field
              (<any>annot).addAction('K', new this.wvInstance.Actions.JavaScript({ javascript: 'AFSpecial_KeystrokeEx("99-999");' }));
              break;
            default:
              console.log(annot.fieldActions);
              break;
          }
        }
      });
    });

    annotManager.on('annotationsDrawn', pageNumber => {

    });
  }
}
