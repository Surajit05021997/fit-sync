import {
  Component,
  Input,
  Output,
  EventEmitter,
  forwardRef,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-fs-checkbox',
  templateUrl: './fs-checkbox.component.html',
  styleUrls: ['./fs-checkbox.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FsCheckboxComponent),
      multi: true,
    },
  ],
})
export class FsCheckboxComponent implements ControlValueAccessor {
  @Input() label: string = '';
  @Input() id: string = '';
  @Input() disabled: boolean = false;
  @Output() change = new EventEmitter<boolean>();

  checked = false;

  onChange = (_: any) => {};
  onTouched = () => {};

  writeValue(value: boolean): void {
    this.checked = !!value;
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

  toggleChecked(event: Event) {
    if (this.disabled) return;
    this.checked = (event.target as HTMLInputElement).checked;
    this.onChange(this.checked);
    this.change.emit(this.checked);
  }
}
