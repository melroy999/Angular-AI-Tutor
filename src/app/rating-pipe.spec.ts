import { TestBed } from '@angular/core/testing';
import { RatingPipe } from './rating-pipe';

describe('RatingPipe', () => {
  it('create an instance', () => {
    const pipe = TestBed.runInInjectionContext(() => new RatingPipe());
    expect(pipe).toBeTruthy();
  });
});
