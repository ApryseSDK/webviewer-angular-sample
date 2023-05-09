# WebViewer - Angular sample

[WebViewer](https://www.pdftron.com/documentation/web/) is a powerful JavaScript-based PDF Library that's part of the [PDFTron PDF SDK](https://www.pdftron.com). It provides a slick out-of-the-box responsive UI that interacts with the core library to view, annotate and manipulate PDFs that can be embedded into any web project.

![WebViewer UI](https://www.pdftron.com/downloads/pl/webviewer-ui.png)

This repo is specifically designed for any users interested in integrating WebViewer into Angular project. This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.1.0.

You can [watch a video](https://www.youtube.com/watch?v=OxNjs4dc6zY) that walks you through how to embed PDFTron's WebViewer inside of Angular project.

## Demos

- [Customizable out-of-the-box UI](https://showcase.apryse.com/toolbar-customization)
- [PDF Viewer](https://showcase.apryse.com/)
- [DOCX Editor](https://showcase.apryse.com/office-editor)
- [Annotation & Markup](https://showcase.apryse.com/annotation-permissions)
- [Generate PDFs from DOCX template](https://showcase.apryse.com/office-template-fill)
- [Digital Signatures](https://showcase.apryse.com/digital-signatures)
- [PDF Text Editing](https://showcase.apryse.com/pdf-editing)
- [Page Manipulation](https://showcase.apryse.com/pdf-page-manipulation-api)
- [Redaction](https://showcase.apryse.com/redaction)
- [Form Building](https://showcase.apryse.com/pdf-form-build)
- [Annotate Videos](https://showcase.apryse.com/annotate-video-frames)
- [More](https://showcase.apryse.com/)

## Trial

WebViewer comes with a 7-day trial without any feature limitations or trial key needed. To extend the trial, you can obtain the trial key by [signing-up](https://dev.apryse.com/) on our [developer portal](https://dev.apryse.com/).

## Initial setup

Before you begin, make sure your development environment includes [Node.js](https://nodejs.org/en/).

## Install

```
git clone https://github.com/PDFTron/webviewer-angular-sample.git
cd webviewer-angular-sample
npm install
```

## Run

```
npm start
```

Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `npm run build` to build the development build of the project.
Run `npm run build-prod` to build the production build of the project.
The build artifacts will be stored in the `dist/` directory.

To run the build, navigate to the `dist/angular` directory, and run `http-server`. Navigate to the url: host:port/index.html to see the app
(https://github.com/http-party/http-server/issues/525).

## WebViewer APIs

See [API documentation](https://www.pdftron.com/documentation/web/guides/ui/apis).

## Enabling full API

PDFNetJS Full is a complete browser side PDF SDK, unlocking viewing, parsing and editing of PDF files. To enable full API, you can modify constructor in webviewer.component.ts:

```
 ngAfterViewInit(): void {
    WebViewer({
      path: '../lib',
      initialDoc: '../files/webviewer-demo-annotated.pdf',
      fullAPI: true
    }, this.viewer.nativeElement);
  }
```

You can refer to this [guide for more information](https://www.pdftron.com/documentation/web/guides/pdfnetjsfull-getting-started)

## Contributing

See [contributing](./CONTRIBUTING.md).

## License

See [license](./LICENSE).
![](https://onepixel.pdftron.com/webviewer-angular-sample)
