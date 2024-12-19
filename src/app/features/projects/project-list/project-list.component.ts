import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectService } from '../../../core/project/project.service';
import { AuthService } from '../../../core/auth/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-project-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './project-list.component.html',
  styleUrl: './project-list.component.css'
})
export class ProjectListComponent implements OnInit {
  projects: any[] = [];
  errorMessage: string = '';
  showModal: boolean = false;
  selectedProject: any = null;

  constructor(
    private projectService: ProjectService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const userId = this.authService.getUserIdFromToken();
    if (!userId) {
      this.router.navigate(['/login']);
      return;
    }

    this.projectService.getProjectsByUser(userId).subscribe({
      next: (userProjects) => {
        const projectstIds = userProjects.map((project: { project_id: number; }) => project.project_id);

        projectstIds.forEach((projectId: number) => {
          this.projectService.getProjectById(projectId).subscribe({
            next: (project) => {
              this.projects.push(project);
            },
            error: (err) => {
              this.errorMessage = 'Error al cargar los proyectos.';
            }
          });
        });

      },
      error: (err) => {
        this.errorMessage = 'Error al cargar los proyectos.';
      }
    });
  }

  createProject(): void {
    this.router.navigate(['/project-create']);
  }

  viewDetails(projectId: number) {
    this.router.navigate(['/project-detail', projectId]);
  }

  editProject(projectId: number) {
    this.router.navigate(['/project-edit', projectId]);
  }

  deleteProject(projectId: number) {
    this.projectService.deleteProject(projectId).subscribe({
      next: () => {
        alert('Proyecto eliminado.');
        this.projects = this.projects.filter((project) => project.id !== projectId);
        this.closeModal();
      },
      error: (err) => {
        this.errorMessage = 'Error al eliminar el proyecto.';
        this.closeModal();
      }
    });
  }

  confirmDelete(projectId: number): void {
    this.selectedProject = this.projects.find(project => project.id === projectId);
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
    this.selectedProject = null;
  }
}
