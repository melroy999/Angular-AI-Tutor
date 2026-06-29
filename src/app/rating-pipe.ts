import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'rating',
})
export class RatingPipe implements PipeTransform {
  transform(value: number): string {
    return value > 0 ? `★ ${value}/5` : 'No rating';
  }
}
