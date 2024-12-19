import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProjectService } from '../../../core/project/project.service';

@Component({
  selector: 'app-project-detail',
  imports: [CommonModule],
  templateUrl: './project-detail.component.html',
  styleUrl: './project-detail.component.css'
})
export class ProjectDetailComponent implements OnInit {
  project: any = null;
  projectId: number | null = null;
  errorMessage: string = '';
  isLoading: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private projectService: ProjectService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.projectId = +id;
        this.loadProjectData(this.projectId);
      }
    });
  }

  loadProjectData(projectId: number): void {
    this.isLoading = true;
    this.projectService.getProjectById(projectId).subscribe({
      next: (project) => {
        this.project = project;
        this.isLoading = false;
      },
      error: () => {
        this.errorMessage = 'Error al cargar el proyecto.';
        this.isLoading = false;
      },
    });
  }

}
