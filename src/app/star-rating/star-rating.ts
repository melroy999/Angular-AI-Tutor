import { Component, forwardRef, inject, signal } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MAX_RATING } from '../tokens';

@Component({
  selector: 'app-star-rating',
  imports: [],
  templateUrl: './star-rating.html',
  styleUrl: './star-rating.css',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => StarRating),
    multi: true
  }]
})
export class StarRating implements ControlValueAccessor {
  private readonly maxRating = inject(MAX_RATING);
  protected readonly stars = Array.from({ length: this.maxRating }, (_, i) => i + 1);
  readonly value = signal<number>(0);

  private onChange: (value: number) => void = () => {};
  private onTouched: () => void = () => {};
  private isDisabled = signal<boolean>(false);

  select(value: number) {
    if (this.isDisabled()) return;
    this.value.set(value);
    this.onChange(value);
    this.onTouched()
  }

  writeValue(value: number): void {
    this.value.set(value ?? 0);
  }

  registerOnChange(fn: (value: number) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled.set(isDisabled);
  }
}
