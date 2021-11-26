import { Component, ViewChild, OnInit, Output, EventEmitter, ElementRef, AfterViewInit } from '@angular/core';
import { Subject } from 'rxjs';
import WebViewer, { WebViewerInstance } from '@pdftron/webviewer';
import { initializeVideoViewer } from '@pdftron/webviewer-video/dist/main-with-react';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {
  @ViewChild('viewer') viewer: ElementRef;
  wvInstance: WebViewerInstance;
  @Output() coreControlsEvent:EventEmitter<string> = new EventEmitter(); 

  private documentLoaded$: Subject<void>;

  constructor() {
    this.documentLoaded$ = new Subject<void>();
  }

  ngAfterViewInit(): void {

    WebViewer({
      path: '../lib',
    }, this.viewer.nativeElement).then(async instance => {
      const license = `---- Insert commercial license key here after purchase ----`;
      const videoUrl = 'https://pdftron.s3.amazonaws.com/downloads/pl/video/video.mp4';

      this.wvInstance = instance;

      //this.coreControlsEvent.emit(instance.UI.LayoutMode.Single);

      const videoInstance = await initializeVideoViewer(
        //@ts-ignore
        instance,
        {
          license,
        }
      );

      // Load a video at a specific url. Can be a local or public link
      // If local it needs to be relative to lib/ui/index.html.
      // Or at the root. (eg '/video.mp4')
      videoInstance.loadVideo(videoUrl);



      const { documentViewer, Annotations, annotationManager } = instance.Core;

      instance.UI.openElements(['notesPanel']);

      documentViewer.addEventListener('annotationsLoaded', () => {
        console.log('annotations loaded');
      });

      // documentViewer.addEventListener('documentLoaded', () => {
      //   this.documentLoaded$.next();
      //   const rectangleAnnot = new Annotations.RectangleAnnotation({
      //     PageNumber: 1,
      //     // values are in page coordinates with (0, 0) in the top left
      //     X: 100,
      //     Y: 150,
      //     Width: 200,
      //     Height: 50,
      //     Author: annotationManager.getCurrentUser()
      //   });
      //   annotationManager.addAnnotation(rectangleAnnot);
      //   annotationManager.redrawAnnotation(rectangleAnnot);
      // });
    })
  }

  ngOnInit() {
  }

  getDocumentLoadedObservable() {
    return this.documentLoaded$.asObservable();
  }
}
