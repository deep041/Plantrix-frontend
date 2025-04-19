import { Component, OnInit } from '@angular/core';
import { InputComponent } from "../../common/widgets/input/input.component";
import { TextareaComponent } from "../../common/widgets/textarea/textarea.component";
import { FileComponent } from "../../common/widgets/file/file.component";
import { DateComponent } from "../../common/widgets/date/date.component";
import { ButtonComponent } from "../../common/widgets/button/button.component";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../../common/services/api.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-add-project',
    standalone: true,
    imports: [InputComponent, TextareaComponent, FileComponent, DateComponent, ButtonComponent, FormsModule, ReactiveFormsModule],
    templateUrl: './add-project.component.html',
    styleUrl: './add-project.component.scss'
})

export class AddProjectComponent implements OnInit {

    addProjectForm!: FormGroup;
    isFormSubmitted: boolean = false;

    constructor(private fb: FormBuilder, private apiService: ApiService, private router: Router, private toaster: ToastrService) { }

    ngOnInit(): void {
        this.createForm();
    }

    createForm() {
        this.addProjectForm = this.fb.group({
            name: ['', [Validators.required]],
            description: ['', [Validators.required]],
            startDate: [''],
            endDate: [''],
            logo: ['']
        });
    }

    save() {
        this.isFormSubmitted = true;

        if (this.addProjectForm.valid) {
            this.apiService.addProject(this.addProjectForm.value).subscribe((res) => {
                if (res.success) {
                    this.toaster.success(res.message);
                    this.router.navigate(['/']);
                }
            });
        }
    }

}
