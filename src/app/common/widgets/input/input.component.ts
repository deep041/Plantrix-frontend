import { CommonModule } from '@angular/common';
import { Component, forwardRef, Input } from '@angular/core';
import { AbstractControl, ControlValueAccessor, FormsModule, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validator, Validators } from '@angular/forms';

@Component({
    selector: 'app-input',
    standalone: true,
    imports: [FormsModule, CommonModule],
    templateUrl: './input.component.html',
    styleUrl: './input.component.scss',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => InputComponent),
            multi: true
        },
        {
            provide: NG_VALIDATORS,
            useExisting: forwardRef(() => InputComponent),
            multi: true
        }
    ],
})

export class InputComponent implements ControlValueAccessor, Validator {

    @Input() title: string = '';
    @Input() inputType: string = 'text';
    @Input() placeholder: string = '';
    @Input() isFormSubmitted: boolean = false;

    value: string = '';
    disabled = false;
    isRequired: boolean = false;
    isShowError: boolean = false;
    inputErrorMessage: string = '';

    onChange = (value: any) => { };
    onTouched = () => { };

    writeValue(value: any): void {
        this.value = value;
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

    handleInput(): void {
        this.onChange(this.value);
    }

    // Validator interface
    validate(control: AbstractControl): any {
        if (control?.hasValidator(Validators.required)) {
            this.isRequired = true;
        } else {
            this.isRequired = false;
        }

        if (control?.hasValidator(Validators.required) && !String(control.value)?.trim()) {
            this.isShowError = true;
            this.inputErrorMessage = this.title + ' is required';
            return;
        } else if (control?.errors) {
            this.isShowError = true;
            this.inputErrorMessage = this.title + ' is not valid';
            return;
        } else {
            this.isShowError = false;
        }
        return;
    }
}
