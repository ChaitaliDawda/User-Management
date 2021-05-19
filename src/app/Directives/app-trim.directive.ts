import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appAppTrim]'
})
export class AppTrimDirective {

  constructor(private elementRef: ElementRef,
    private renderer: Renderer2) { }

  @HostListener("blur")
  onBlur() {
    if (this.elementRef.nativeElement.value == null || this.elementRef.nativeElement.value == undefined) {
      return;
    }

    let value = this.elementRef.nativeElement.value;

    if (value) {
      value = value.trim();
      this.renderer.setProperty(
        this.elementRef.nativeElement, "value", value);
      this.renderer.setAttribute(
        this.elementRef.nativeElement, "value", value);
    } else {
      this.renderer.setProperty(
        this.elementRef.nativeElement, "value", null);
      this.renderer.setAttribute(
        this.elementRef.nativeElement, "value", null);
    }
  }
}
