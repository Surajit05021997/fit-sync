import {
  Component,
  Input,
  Output,
  EventEmitter,
  forwardRef,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-fs-radio',
  templateUrl: './fs-radio.component.html',
  styleUrls: ['./fs-radio.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FsRadioComponent),
      multi: true,
    },
  ],
})
export class FsRadioComponent implements ControlValueAccessor {
  @Input() label: string = '';
  @Input() id: string = '';
  @Input() name: string = '';
  @Input() value: any;
  @Input() disabled: boolean = false;
  @Output() change = new EventEmitter<any>();

  checked = false;

  onChange = (_: any) => {};
  onTouched = () => {};

  writeValue(selectedValue: any): void {
    this.checked = selectedValue === this.value;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  selectRadio(event: Event) {
    if (this.disabled) return;
    this.checked = true;
    this.onChange(this.value);
    this.change.emit(this.value);
  }
}
