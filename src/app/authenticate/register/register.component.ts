import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../common/services/api.service';
import { ToastrService } from 'ngx-toastr';
import { RegisterResponse } from '../interfaces/user.interface';
import { InputComponent } from '../../common/widgets/input/input.component';
import { ButtonComponent } from "../../common/widgets/button/button.component";

@Component({
    selector: 'app-register',
    standalone: true,
    imports: [FormsModule, ReactiveFormsModule, InputComponent, ButtonComponent],
    templateUrl: './register.component.html',
    styleUrl: './register.component.scss'
})

export class RegisterComponent implements OnInit {

    registerForm!: FormGroup;
    isFormSubmitted: boolean = false;

    constructor(private fb: FormBuilder, private router: Router, private apiService: ApiService, private toastr: ToastrService) { }

    ngOnInit(): void {
        this.createForm();
    }

    createForm() {
        this.registerForm = this.fb.group({
            firstName: ['', [Validators.required]],
            lastName: ['', [Validators.required]],
            email: ['', [Validators.required]],
            password: ['', [Validators.required]],
            confirmPassword: ['', [Validators.required]]
        });
    }

    register() {
        this.isFormSubmitted = true;
        if (this.registerForm.valid) {
            this.apiService.register(this.registerForm.value).subscribe((res: RegisterResponse) => {
                if (res && res.data) {
                    this.toastr.success(res.message);
                    this.router.navigate(['/auth/login']);
                }
            });
        }
    }

    login() {
        this.router.navigate(['/auth/login']);
    }
}
