import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProjectService } from '../../../core/project/project.service';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/auth/auth.service';

@Component({
  selector: 'app-project-create',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './project-create.component.html',
  styleUrl: './project-create.component.css'
})
export class ProjectCreateComponent {
  manualForm: FormGroup;
  excelForm: FormGroup;
  selectedOption: 'manual' | 'excel' | null = null;
  excelFile: File | null = null;

  constructor(private fb: FormBuilder, private projectService: ProjectService, private router: Router, private authService: AuthService) {
    this.manualForm = this.fb.group({
      description: ['', Validators.required],
      generalobjective: ['', Validators.required],
    });

    this.excelForm = this.fb.group({
      file: ['', Validators.required],
    });
  }

  selectOption(option: 'manual' | 'excel') {
    this.selectedOption = option;
  }

  createManualProject() {
    if (this.manualForm.invalid) {
      alert('Por favor completa todos los campos');
      return;
    }

    const userId = this.getUserId();
    const project = this.manualForm.value;
    this.projectService.createProject(project, userId).subscribe({
      next: (response) => {
        alert('Proyecto creado exitosamente');
        setTimeout(() => this.router.navigate(['/projects']), 2000);
      },
      error: (err) => {
        alert('Error al crear el proyecto');
      },
    });
  }

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.excelFile = input.files[0];
    }
  }

  createFromExcel() {
    if (!this.excelFile) {
      alert('Por favor selecciona un archivo Excel');
    }
    else{
      const userId = this.getUserId();
      this.projectService.createProjectsFromExcel(this.excelFile, userId).subscribe({
        next: (response) => {
          alert('Proyecto creado exitosamente desde Excel');
          setTimeout(() => this.router.navigate(['/projects']), 2000);
        },
        error: (err) => {
          alert('Error al procesar el archivo Excel');
        },
      });
    }
  }

  getUserId(): number {
    const id = this.authService.getUserIdFromToken();
    if (id){
      return id;
    }
    throw new Error('No se pudo obtener el id del usuario');
  }
}