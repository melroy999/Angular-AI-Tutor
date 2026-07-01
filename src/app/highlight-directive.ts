import { Directive, ElementRef, HostListener, inject } from '@angular/core';

@Directive({
  selector: '[appHighlight]',
})
export class HighlightDirective {
  private el = inject(ElementRef);

  constructor() {
    this.el.nativeElement.style.transition = 'box-shadow 200ms';
  }

  @HostListener('mouseenter') onMouseEnter() {
    this.el.nativeElement.style.setProperty('box-shadow', '3px 5px 4px rgba(0, 0, 0, 0.5)', 'important');
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.el.nativeElement.style.removeProperty('box-shadow');
  }
}
