import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate',
})
export class TruncatePipe implements PipeTransform {
  transform(value: string | undefined, maxLength: number): string {
    value = value ?? "";
    return value.length > maxLength ? value.substring(0, maxLength) + '...' : value;
  }
}
