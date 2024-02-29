import { Component } from '@angular/core';
declare const Core: any;

@Component({
  selector: 'app-without-viewer',
  templateUrl: 'without-viewer.html',
  styles: [
  ]
})
export class WithoutViewerComponent {

  click() {
    (async function() {
      Core.setWorkerPath('./lib/core');

      await Core.PDFNet.initialize("demo:1686757895540:7d86b1ba030000000049491bef43714654d2dec710ec9c728a35106d71");

      const buf = await Core.PDFNet.Convert.office2PDF("./files/legal-contract.docx", null);
    })()
  }

}
