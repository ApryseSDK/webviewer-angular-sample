import { Component, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { WebViewerComponent } from './webviewer.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {
  @ViewChild(WebViewerComponent) private webviewer: WebViewerComponent;

  ngOnInit() {
    this.wvReadyHandler = this.wvReadyHandler.bind(this);
    this.wvDocumentLoadedHandler = this.wvDocumentLoadedHandler.bind(this);
  }

  ngAfterViewInit() {
    this.webviewer.getElement().addEventListener('ready', this.wvReadyHandler);
    this.webviewer.getElement().addEventListener('documentLoaded', this.wvDocumentLoadedHandler);
  }

  wvReadyHandler(): void {
    // now you can access APIs through this.webviewer.getInstance()
    this.webviewer.getInstance().openElement('notesPanel');
    // see https://www.pdftron.com/documentation/web/guides/ui/apis for the full list of APIs

    // or listen to events from the viewer element
    this.webviewer.getElement().addEventListener('pageChanged', (e) => {
      const [ pageNumber ] = e.detail;
      console.log(`Current page is ${pageNumber}`);
    });

    // or from the docViewer instance
    this.webviewer.getInstance().docViewer.on('annotationsLoaded', () => {
      console.log('annotations loaded');
    });
  }

  wvDocumentLoadedHandler(): void {
    // you can access docViewer object for low-level APIs
    const { docViewer } = this.webviewer.getInstance();
    const annotManager = docViewer.getAnnotationManager();
    // and access classes defined in the WebViewer iframe
    const { Annotations } = this.webviewer.getWindow();
    const rectangle = new Annotations.RectangleAnnotation();
    rectangle.PageNumber = 1;
    rectangle.X = 100;
    rectangle.Y = 100;
    rectangle.Width = 250;
    rectangle.Height = 250;
    rectangle.StrokeThickness = 5;
    rectangle.Author = annotManager.getCurrentUser();
    annotManager.addAnnotation(rectangle);
    annotManager.drawAnnotations(rectangle.PageNumber);
    // see https://www.pdftron.com/api/web/PDFTron.WebViewer.html for the full list of low-level APIs
  }
}
