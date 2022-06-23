import { Component, ViewChild, OnInit, Output, EventEmitter, ElementRef, AfterViewInit } from '@angular/core';
import { Subject } from 'rxjs';
import WebViewer, { WebViewerInstance } from '@pdftron/webviewer';
import { initializeVideoViewer } from '@pdftron/webviewer-video';

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
    })
  }

  ngOnInit() {
  }

  getDocumentLoadedObservable() {
    return this.documentLoaded$.asObservable();
  }
}
