import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, Input, Output } from "@angular/core";
import WebViewer, { CoreControls, WebViewerInstance } from '@pdftron/webviewer';
import { EventEmitter } from '@angular/core';
@Component({
  selector: 'some-dialog',
  templateUrl: './some-dialog.component.html',
  styleUrls: ['./some-dialog.component.css']
})
export class SomeDialogComponent implements OnInit, AfterViewInit {
  @ViewChild('viewer', { static: false }) viewer: ElementRef;
  wvInstance: WebViewerInstance;

  @Input()
  visible: boolean = true;

  @Input()
  fileUrl: string;

  @Output()
  dialogHidden = new EventEmitter();

  @Output()
  dialogShown = new EventEmitter();

  constructor() {

  }

  ngOnInit() {

  }

  ngAfterViewInit(): void {
    WebViewer({
      path: '../lib',
      // initialDoc: '../files/webviewer-demo-annotated.pdf'
    }, this.viewer.nativeElement).then(instance => {
      this.wvInstance = instance;
      this.wvInstance.docViewer.loadDocument(this.fileUrl);
    });
  }

  onShow() {
    if (this.wvInstance) {
      this.wvInstance.docViewer.loadDocument(this.fileUrl);
    }
    this.dialogShown.emit(undefined);
  }

  onDialogHidden() {
    this.dialogHidden.emit(undefined);
  }
}