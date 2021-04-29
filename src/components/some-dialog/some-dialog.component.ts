import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, Input, Output } from "@angular/core";
import WebViewer, { CoreControls, WebViewerInstance } from '@pdftron/webviewer';
import { EventEmitter } from '@angular/core';

import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

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

      instance.docViewer.on('documentLoaded', () => {
        console.log('loaded');
      });

      instance.docViewer.on('documentUnloaded', () => {
        console.log('unloaded');
      });
    });
  }

  onShow() {
    window.setTimeout(() => {
      if (this.wvInstance) {
        // this.wvInstance.docViewer.loadDocument(this.fileUrl);
      }
    });

    this.dialogShown.emit(undefined);
  }

  onDialogHidden() {
    // if (this.wvInstance) {
    //   this.wvInstance.docViewer.closeDocument();
    // }
    this.dialogHidden.emit(undefined);
  }
}