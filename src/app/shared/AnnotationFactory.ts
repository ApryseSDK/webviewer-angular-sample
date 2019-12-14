export class AnnotationFactory {
  static createTriangle = Annotations => {
    class TriangleAnnotation extends Annotations.MarkupAnnotation {
      constructor() {
        super();
      }

      draw(ctx, pageMatrix) {
        // the setStyles function is a function on markup annotations that sets up
        // certain properties for us on the canvas for the annotation's stroke thickness.
        this.setStyles(ctx, pageMatrix);

        // first we need to translate to the annotation's x/y coordinates so that it's
        // drawn in the correct location
        ctx.translate(this.X, this.Y);
        ctx.beginPath();
        ctx.moveTo(this.Width / 2, 0);
        ctx.lineTo(this.Width, this.Height);
        ctx.lineTo(0, this.Height);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
      }
    }

    // Static (class-side) data properties and prototype data properties must be defined outside of the ClassBody declaration
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes
    TriangleAnnotation.prototype.elementName = 'triangle';
    TriangleAnnotation.prototype.Subject = 'Triangle';
    return new TriangleAnnotation();
  }
}
