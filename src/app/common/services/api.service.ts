import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { AddProjectPayload, Login, LoginResponse, ProjectsListResponse, RegisterPayload, RegisterResponse } from '../../authenticate/interfaces/user.interface';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class ApiService {

    constructor(private http: HttpClient) { }

    testAPI() {
        return this.http.get(`${environment.apiUrl}`);
    }

    login(payload: Login): Observable<LoginResponse> {
        return this.http.post<LoginResponse>(`${environment.apiUrl}authenticate/login`, payload);
    }

    register(payload: RegisterPayload): Observable<RegisterResponse> {
        return this.http.post<RegisterResponse>(`${environment.apiUrl}authenticate/register`, payload);
    }

    // Projects
    getProjects(): Observable<ProjectsListResponse> {
        return this.http.get<ProjectsListResponse>(`${environment.apiUrl}project`);
    }

    addProject(payload: AddProjectPayload): Observable<any> {
        return this.http.post<any>(`${environment.apiUrl}project`, payload);
    }
}
