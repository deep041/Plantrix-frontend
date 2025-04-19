import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../../common/services/api.service';
import { LoginResponse } from '../interfaces/user.interface';
import { Router } from '@angular/router';
import { InputComponent } from "../../common/widgets/input/input.component";
import { ButtonComponent } from "../../common/widgets/button/button.component";

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [FormsModule, ReactiveFormsModule, InputComponent, ButtonComponent],
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss'
})

export class LoginComponent implements OnInit {

    loginForm!: FormGroup;
    isFormSubmitted: boolean = false;

    constructor(private fb: FormBuilder, private apiService: ApiService, private router: Router) { }

    ngOnInit(): void {
        this.createForm();
    }

    createForm() {
        this.loginForm = this.fb.group({
            email: ['', [Validators.required]],
            password: ['', [Validators.required]]
        });
    }

    login() {
        this.isFormSubmitted = true;
        if (this.loginForm.valid) {
            this.apiService.login(this.loginForm.value).subscribe((res: LoginResponse) => {
                if (res && res.data) {
                    localStorage.setItem('token', res.data.token);
                    this.router.navigate(['/']);
                }
            });
        }
    }

    register() {
        this.router.navigate(['/auth/register']);
    }
}
