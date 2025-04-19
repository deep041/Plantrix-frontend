import { CommonModule } from '@angular/common';
import { Component, Input, forwardRef } from '@angular/core';
import { AbstractControl, ControlValueAccessor, FormsModule, NG_VALIDATORS, NG_VALUE_ACCESSOR, Validator, Validators } from '@angular/forms';

@Component({
    selector: 'app-file',
    standalone: true,
    imports: [FormsModule, CommonModule],
    templateUrl: './file.component.html',
    styleUrl: './file.component.scss',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => FileComponent),
            multi: true
        },
        {
            provide: NG_VALIDATORS,
            useExisting: forwardRef(() => FileComponent),
            multi: true
        }
    ]
})

export class FileComponent implements ControlValueAccessor, Validator {

    @Input() title: string = '';
    @Input() placeholder: string = '';
    @Input() isFormSubmitted: boolean = false;

    value: string = '';
    disabled = false;
    isRequired: boolean = false;
    isShowError: boolean = false;
    inputErrorMessage: string = '';
    inputType: string = 'file';

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
