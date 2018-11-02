import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

declare const PDFTron: any;
declare let sampleL: string;

@Component({
  selector: 'app-webviewer',
  template: '<div #viewer></div>',
  styles: ['div { width: 100%; height: 100%; }']
})
export class WebViewerComponent implements AfterViewInit {
  @ViewChild('viewer') viewer: ElementRef;
  myWebViewer: any;

  ngAfterViewInit(): void {
    this.myWebViewer = new PDFTron.WebViewer({
      path: '../assets/webviewer',
      initialDoc: '../assets/files/webviewer-demo-annotated.pdf',
      l: sampleL
    }, this.viewer.nativeElement);
  }

  getInstance(): any {
    return this.myWebViewer.getInstance();
  }

  getWindow(): any {
    return this.viewer.nativeElement.querySelector('iframe').contentWindow;
  }

  getElement(): any {
    return this.viewer.nativeElement;
  }
}
