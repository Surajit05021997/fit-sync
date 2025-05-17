import {
  Component,
  forwardRef,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-fs-input',
  templateUrl: './fs-input.component.html',
  styleUrls: ['./fs-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FsInputComponent),
      multi: true,
    },
  ],
})
export class FsInputComponent implements ControlValueAccessor {
  @Input() name = '';
  @Input() id = '';
  @Input() placeholder = '';
  @Input() labelText = '';
  @Output() input = new EventEmitter<any>();
  @Output() change = new EventEmitter<any>();

  value = '';

  onChange = (_: any) => {};
  onTouched = () => {};

  writeValue(val: any): void {
    this.value = val;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  onInput(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.value = value;
    this.onChange(value);
    this.input.emit(value);
  }

  onChangeEvent(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.change.emit(value);
  }
}
