import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appUppercase]'
})
export class UppercaseDirective {

  constructor(private elementRef: ElementRef,
    private renderer: Renderer2) { }

  @HostListener("keyup")
  onKeyUp() {
    if (this.elementRef.nativeElement.value == null || this.elementRef.nativeElement.value == undefined) {
      return;
    }

    let value = this.elementRef.nativeElement.value;

    if (value) {
      let valueList = value.split(' ');
      let newValue = '';
      for (let i = 0; i < valueList.length; i++) {
        let newStr = valueList[i];
        let newStrs = newStr[0].toUpperCase() + newStr.substr(1, newStr.length);
        newValue += newStrs + ' ';
      }

      value = newValue.trim();
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
