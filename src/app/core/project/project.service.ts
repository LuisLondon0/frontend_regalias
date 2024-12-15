import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  private apiUrl = 'http://localhost:8000/api/v1';

  constructor(private http: HttpClient) {}

  getProjectsByUser(userId: number): Observable<any> {
    return this.http.get<any[]>(`${this.apiUrl}/users-projects/user/${userId}`);
  }

  getProjectById(projectId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/projects/${projectId}`);
  }

  createProject(project: any, user_id: number): Observable<any> {
    const projectData = { ...project, user_id };
    return this.http.post<any>(`${this.apiUrl}/projects`, projectData);
  }
  
  createProjectsFromExcel(file: File, userId: number): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('userId', userId.toString());
    return this.http.post<any>(`${this.apiUrl}/projects/from-excel`, formData);
  }

  updateProject(project: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/projects/${project.id}`, project);
  }

  deleteProject(projectId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/projects/${projectId}`);
  }
}