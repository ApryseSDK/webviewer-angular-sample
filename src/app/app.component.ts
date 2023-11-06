import {AfterViewInit, Component, ElementRef, EventEmitter, Output, ViewChild} from '@angular/core';
import WebViewer, {WebViewerInstance} from "@pdftron/webviewer";
import {Subject} from "rxjs";

@Component({
  selector: 'app-root',
  styleUrls: ['app.component.css'],
  templateUrl: 'app.component.html'
})

// This code was tested with
// Angular CLI: 15.1.6
// Node: 20.9.0 (Unsupported)
// Package Manager: npm 10.1.0
// OS: win32 x64
//
// and
// Angular CLI: 15.1.6
// Node: 16.20.2
// Package Manager: npm 8.19.4
// OS: win32 x64


export class AppComponent implements AfterViewInit {

   jsonData = {
    COMPANYNAME: 'Apryse',
    CUSTOMERNAME: 'Huw Dickens',
    CompanyAddressLine1: '838 W Hastings St 5th floor',
    CompanyAddressLine2: 'Vancouver, BC V6C 0A6',
    CustomerAddressLine1: '123 Main Street',
    CustomerAddressLine2: 'Vancouver, BC V6A 2S5',
    Date: { html: "<span style='color: red'><b>Nov 5th, 2023</b></span>" },
    ExpiryDate: 'Nov 15th, 2023',
    QuoteNumber: '134',
    WEBSITE: 'www.apryse.com',
    rows: [{ 'item': 'Apples', 'item_qty': '3', 'item_price': '$5.00', 'item_total': '$15.00' },
    { 'item': 'Oranges', 'item_qty': '2', 'item_price': '$5.00', 'item_total': '$10.00' }],
    days: '30',
    total: '$25.00'
  };

  wvInstance?: WebViewerInstance;
  
  @ViewChild('viewer') viewer!: ElementRef;
  
  @Output() coreControlsEvent:EventEmitter<string> = new EventEmitter();

  private documentLoaded$: Subject<void>;

  constructor() {
    this.documentLoaded$ = new Subject<void>();
  }

  ngAfterViewInit(): void {

    WebViewer({
      path: '../lib',
      initialDoc: '../files/quote.docx',
      licenseKey: 'your_license_key'  // sign up to get a free trial key at https://dev.apryse.com
    }, this.viewer.nativeElement).then(instance => {
      this.wvInstance = instance;

      const { documentViewer} = instance.Core;

      documentViewer.addEventListener('documentLoaded', () => {
        documentViewer.getDocument().applyTemplateValues(this.jsonData);
      });
   
    })
  }
}
