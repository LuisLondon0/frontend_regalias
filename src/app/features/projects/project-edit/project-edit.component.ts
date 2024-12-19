import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProjectService } from '../../../core/project/project.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-project-edit',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './project-edit.component.html',
  styleUrl: './project-edit.component.css'
})
export class ProjectEditComponent implements OnInit {
  projectForm: FormGroup;
  projectId: number | null = null;
  errorMessage: string = '';
  isLoading: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private projectService: ProjectService
  ) {
    this.projectForm = this.fb.group({
      description: ['', [Validators.required, Validators.minLength(3)]],
      generalobjective: [''],
      projectdocument: [''],
      totalsgr: [0, [Validators.required, Validators.min(0)]],
      totalduration: [0, [Validators.required, Validators.min(0)]],
    });
  }

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
        this.projectForm.patchValue({
          description: project.description,
          generalobjective: project.generalobjective,
          projectdocument: project.projectdocument,
          totalsgr: project.totalsgr,
          totalduration: project.totalduration,
        });
        this.isLoading = false;
      },
      error: () => {
        this.errorMessage = 'Error al cargar el proyecto.';
        this.isLoading = false;
      },
    });
  }

  onSubmit(): void {
    if (this.projectForm.valid && this.projectId !== null) {
      console.log(this.projectForm.value);
      const updatedProject = this.projectForm.value;
      this.projectService.updateProject(this.projectId, updatedProject).subscribe({
        next: () => {
          alert('Proyecto actualizado correctamente.');
          setTimeout(() => { this.router.navigate(['/project-list']); }, 1000);
        },
        error: () => {
          this.errorMessage = 'Error al actualizar el proyecto.';
        },
      });
    }
  }

  onCancel(): void {
    this.router.navigate(['/project-list']);
  }

}
