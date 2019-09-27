# WebViewer - Angular sample

[WebViewer](https://www.pdftron.com/webviewer) is a powerful JavaScript-based PDF Library that's part of the [PDFTron PDF SDK](https://www.pdftron.com). It provides a slick out-of-the-box responsive UI that interacts with the core library to view, annotate and manipulate PDFs that can be embedded into any web project.

![WebViewer UI](https://www.pdftron.com/downloads/pl/webviewer-ui.png)

This repo is specifically designed for any users interested in integrating WebViewer into Angular project. This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.0.3. See [Angular - Getting Started](https://angular.io/guide/quickstart) for more information.

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

To run the build, navigate to the `dist/` directory, and run `http-server`. Navigate to the url: host:port/index.html to see the app
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
