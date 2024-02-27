import { ControlValueAccessor } from '@angular/forms';

export abstract class BaseValueAccessor<T> implements ControlValueAccessor {
  public selectedValue!: T;

  private changed = new Array<(value: T) => void>();
  private touched = new Array<() => void>();
  protected propagateChange = (_: any) => { };

  get value(): T {
    return this.selectedValue;
  }

  set value(value: T) {
    if (this.selectedValue !== value) {
      this.selectedValue = value;
      this.changed.forEach(f => f(value));
    }
  }

  writeValue(value: T) {
    this.selectedValue = value;
  }

  registerOnChange(fn: (value: T) => void) {
    this.changed.push(fn);
    this.propagateChange = fn;
  }

  registerOnTouched(fn: () => void) {
    this.touched.push(fn);
  }

  touch() {
    this.touched.forEach(f => f());
  }
}
