import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appCepMask]'
})
export class CepMaskDirective {

  constructor(
    private el: ElementRef,
    private renderer: Renderer2
  ) {}

  @HostListener('input', ['$event'])
  onInputChange(event: any): void {
    let { value } = event.target;

    value = value.replace(/\D/g, '');

    if (value.length > 5) {
      value = value.replace(/^(\d{5})(\d)/, '$1-$2');
    }

    this.renderer.setProperty(this.el.nativeElement, 'value', value);
  }
}
