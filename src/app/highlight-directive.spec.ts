import { TestBed } from '@angular/core/testing';
import { ElementRef } from '@angular/core';
import { HighlightDirective } from './highlight-directive';

describe('HighlightDirective', () => {
  it('should create an instance', () => {
    TestBed.configureTestingModule({
      providers: [
        { provide: ElementRef, useValue: { nativeElement: document.createElement('div') } },
      ]
    });

    const directive = TestBed.runInInjectionContext(() => new HighlightDirective());
    expect(directive).toBeTruthy();
  });
});
