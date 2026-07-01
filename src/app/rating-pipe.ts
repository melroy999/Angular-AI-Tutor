import { inject, Pipe, PipeTransform } from '@angular/core';
import { MAX_RATING } from './tokens';

@Pipe({
  name: 'rating',
})
export class RatingPipe implements PipeTransform {
  private maxRating = inject(MAX_RATING);

  transform(value: number): string {
    return value > 0 ? `★ ${value}/${this.maxRating}` : 'No rating';
  }
}
