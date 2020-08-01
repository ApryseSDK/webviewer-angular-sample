import { Component, ViewChild, OnInit, ElementRef, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import WebViewer from '@pdftron/webviewer';
import { saveAs } from 'file-saver';
import * as uuid from 'uuid';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {
  @ViewChild('viewer', { static: false }) viewer: ElementRef;
  wvInstance: any;

  colorChange = false;

  constructor(private changeDetectorRef: ChangeDetectorRef) { }

  ngAfterViewInit(): void {

    WebViewer({
      path: '../lib',
      initialDoc: '../files/PdfFields_All_v2.1.pdf'
    }, this.viewer.nativeElement).then(instance => {
      this.wvInstance = instance;

      instance.setHeaderItems(header => {
        header.push({
          type: 'actionButton',
          // tslint:disable-next-line: max-line-length
          img: '<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="rocket" class="svg-inline--fa fa-rocket fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M505.12019,19.09375c-1.18945-5.53125-6.65819-11-12.207-12.1875C460.716,0,435.507,0,410.40747,0,307.17523,0,245.26909,55.20312,199.05238,128H94.83772c-16.34763.01562-35.55658,11.875-42.88664,26.48438L2.51562,253.29688A28.4,28.4,0,0,0,0,264a24.00867,24.00867,0,0,0,24.00582,24H127.81618l-22.47457,22.46875c-11.36521,11.36133-12.99607,32.25781,0,45.25L156.24582,406.625c11.15623,11.1875,32.15619,13.15625,45.27726,0l22.47457-22.46875V488a24.00867,24.00867,0,0,0,24.00581,24,28.55934,28.55934,0,0,0,10.707-2.51562l98.72834-49.39063c14.62888-7.29687,26.50776-26.5,26.50776-42.85937V312.79688c72.59753-46.3125,128.03493-108.40626,128.03493-211.09376C512.07526,76.5,512.07526,51.29688,505.12019,19.09375ZM384.04033,168A40,40,0,1,1,424.05,128,40.02322,40.02322,0,0,1,384.04033,168Z"></path></svg>',
          onClick: () => {
            this.toggleColorChange();
            this.changeDetectorRef.detectChanges();
          }
        }).push({
          type: 'actionButton',
          // tslint:disable-next-line: max-line-length
          img: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"/><path d="M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm-5 16c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-10H5V5h10v4z"/></svg>',
          onClick: () => {
            this.export();
          }
        });
      });

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
    const rectangle = new Annotations.RectangleAnnotation();
    rectangle.PageNumber = 1;
    rectangle.X = 100;
    rectangle.Y = 100;
    rectangle.Width = 250;
    rectangle.Height = 250;
    rectangle.StrokeThickness = 5;
    rectangle.Author = annotManager.getCurrentUser();
    // annotManager.addAnnotation(rectangle);
    // annotManager.drawAnnotations(rectangle.PageNumber);
    // see https://www.pdftron.com/api/web/WebViewer.html for the full list of low-level APIs

    const pageTracker = {};

    this.wvInstance.docViewer.on('annotationsLoaded', () => {
      console.log('annotations loaded');
    });

    annotManager.on('annotationsDrawn', pageNumber => {
      if (!pageTracker[pageNumber]) {
        // Attach events
        console.log('annotationsDrawn', pageNumber);
        pageTracker[pageNumber] = true;
        setTimeout(() => {
          const _annotList = annotManager.getAnnotationsList();
          _annotList.forEach(annot => {
            console.log(annot, !!annot.element);
          });
        }, 100);
      }
    });
  }

  toggleColorChange() {
    this.colorChange = !this.colorChange;
  }

  export() {
    const { annotManager } = this.wvInstance;
    annotManager.exportAnnotations({ links: false, widgets: false }).then(xfdfString => {
      const dataURI = `data:text/xml;base64,${window.btoa(xfdfString)}`;
      const fileName = `ExportedXFDF_${uuid.v4()}.xml`;
      saveAs(dataURI, fileName);
    });
  }
}
