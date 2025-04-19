import { Component } from '@angular/core';
import { InputComponent } from "../common/widgets/input/input.component";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { JsonPipe } from '@angular/common';
import { ButtonComponent } from "../common/widgets/button/button.component";

@Component({
    selector: 'app-design-system',
    standalone: true,
    imports: [InputComponent, FormsModule, ReactiveFormsModule, JsonPipe, ButtonComponent],
    templateUrl: './design-system.component.html',
    styleUrl: './design-system.component.scss'
})

export class DesignSystemComponent {

    inputValue: string = 'value';
    inputForm: FormGroup;

    constructor(private fb: FormBuilder) {
        this.inputForm = this.fb.group({
            inputValue: ['', [Validators.required]]
        });
    }

}
