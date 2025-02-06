import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appPhoneMask]'
})
export class PhoneMaskDirective {

  constructor(
    private el: ElementRef,
    private renderer: Renderer2
  ) {}

  @HostListener('input', ['$event'])
  onInputChange(event: any): void {
    let { value } = event.target as HTMLInputElement;

    value = value.replace(/\D/g, '');

    if (value.length > 11) {
      value = value.substring(0, 11);
    }

    if (value.length === 11) {
      value = value.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3');

    } else if (value.length === 10) {
      value = value.replace(/^(\d{2})(\d{4})(\d{4})$/, '($1) $2-$3');

    } else {
      if (value.length >= 6) {
        value = value.replace(/^(\d{2})(\d{4})(\d{0,4})$/, '($1) $2-$3');

      } else if (value.length >= 3) {
        value = value.replace(/^(\d{2})(\d{0,4})$/, '($1) $2');

      } else if (value.length > 0) {
        value = value.replace(/^(\d{0,2})$/, '($1');
      }
    }

    this.renderer.setProperty(this.el.nativeElement, 'value', value);
  }
}
