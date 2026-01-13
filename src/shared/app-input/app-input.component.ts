import { CommonModule } from '@angular/common';
import { Component, forwardRef, Input, Optional, Self } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NgControl } from '@angular/forms';
import { AppIconComponent } from '../icon/icon.component';

@Component({
  selector: 'app-app-input',
  standalone: true,
  imports: [CommonModule, AppIconComponent],
  templateUrl: './app-input.component.html',
  styleUrl: './app-input.component.scss'
})
export class AppInputComponent implements ControlValueAccessor {
  @Input() label?: string;
  @Input() placeholder = '';
  @Input() type: 'text' | 'email' | 'password' | 'number' = 'text';

  @Input() required = false;
  @Input() minLength?: number;
  @Input() maxLength?: number;

  @Input() errorRequired = 'Campo obrigatório!';
  @Input() errorMinLength = 'Valor muito curto!';
  @Input() errorMaxLength = 'Valor muito longo!';

  value: any = '';
  disabled = false;

  constructor(@Optional() @Self() public ngControl: NgControl) {
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }

  // ControlValueAccessor
  onChange = (_: any) => { };
  onTouched = () => { };

  writeValue(value: any): void {
    this.value = value ?? '';
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

  // Helpers
  get control() {
    return this.ngControl?.control;
  }

  get showError(): boolean {
    return !!(
      this.control &&
      this.control.invalid &&
      (this.control.touched || this.control.dirty)
    );
  }

  get errors() {
    return this.control?.errors || {};
  }
}
