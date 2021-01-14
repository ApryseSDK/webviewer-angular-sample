import { WebViewerInstance } from "@pdftron/webviewer";
import { Step } from "./app.component";

export class Flyout {
  private iframeDoc: Document;
  private element: HTMLElement;

  constructor(
    private instance: WebViewerInstance,
    private step: Step,
    private nextStep: Step
  ) {
    this.create(step, nextStep);
  }

  create(step: Step, nextStep: Step) {
    const zoom = this.instance.getZoomLevel();
    this.iframeDoc = this.instance.iframeWindow.document;

    const template: HTMLTemplateElement = document.querySelector('#guide-flyout');
    this.element = this.iframeDoc.importNode(template, true);

    const yPos = !!step ? step.y * zoom : 0;

    this.element.setAttribute('style', `top: ${yPos}px; left: ${-85}px`);

    const container = this.getPageContainer(step.pageNumber);
    container.insertBefore(this.element, container.childNodes[0]);

    this.element.querySelector('.flyout-label').addEventListener('click', (ev: MouseEvent) => {
      ev.preventDefault();

      let element: HTMLElement;
      if (this.step.pageNumber !== this.nextStep.pageNumber) {
        this.instance.docViewer.setCurrentPage(this.nextStep.pageNumber);
        setTimeout(() => {
          element = <HTMLElement>this.nextStep.field.widgets[0].element.firstChild;
          element.focus();
        }, 500);
      } else {
        element = <HTMLElement>this.nextStep.field.widgets[0].element.firstChild;
        element.focus();
      }
    });
  }

  move(step: Step, nextStep: Step) {
    this.step = step;
    this.nextStep = nextStep;
    const zoom = this.instance.getZoomLevel();
    const container = this.getPageContainer(this.step.pageNumber);
    this.element.style.top = `${step.y * zoom}px`;
    container.insertBefore(this.element, container.childNodes[0]);
  }

  private getPageContainer(pageNumber: number) {
    return this.iframeDoc.getElementById('pageWidgetContainer' + (pageNumber - 1)).parentElement;
  }
}
