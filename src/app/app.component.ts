import { Component, ViewChild, OnInit, ElementRef, AfterViewInit } from '@angular/core';
import WebViewer, { CoreControls, WebViewerInstance } from '@pdftron/webviewer';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { SomeService } from './some-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {
  // @ViewChild('viewer', { static: false }) viewer: ElementRef;
  // wvInstance: WebViewerInstance;
  private someObservable$: Observable<number>;

  private dialogVisible: boolean = true;

  private fileUrlToLoad: string;

  constructor(private someService: SomeService) {
    // this.fileUrlToLoad = 'https://pdftron.s3.amazonaws.com/files/demo.pdf';
  }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    // WebViewer({
    //   path: '../lib',
    //   initialDoc: '../files/webviewer-demo-annotated.pdf'
    // }, this.viewer.nativeElement).then(instance => {

    // });
  }

  dialogVisibililtyChanged(visible: boolean) {
    this.dialogVisible = visible;
    if (!visible) {
    }
  }
}


