import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../common/services/api.service';
import { ProjectsList, ProjectsListResponse } from '../../authenticate/interfaces/user.interface';
import { Router } from '@angular/router';

@Component({
    selector: 'app-projects',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './projects.component.html',
    styleUrl: './projects.component.scss'
})

export class ProjectsComponent implements OnInit {

    projects: ProjectsList[] = [];

    constructor(private apiService: ApiService, private router: Router) { }

    ngOnInit(): void {
        this.getProjects();
    }

    getProjects() {
        this.apiService.getProjects().subscribe((res: ProjectsListResponse) => {
            if (res && res.data) {
                this.projects = res.data;
            }
        });
    }

    addProject() {
        this.router.navigate(['/add-project']);
    }

}
