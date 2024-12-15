import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../core/auth/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  name: string = '';
  username: string = '';
  password: string = '';
  roleId: number | null = null;
  roles: { id: number, description: string }[] = [];
  errorMessage: string = '';
  successMessage: string = '';

  private apiUrl = 'http://localhost:8000/api/v1/users';
  private rolesApiUrl = 'http://localhost:8000/api/v1/roles';

  constructor(private authService: AuthService, private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.authService.isLoggedIn().subscribe((isLoggedIn) => {
      if (isLoggedIn) {
        this.router.navigate(['/projects']);
      }
    });
    this.http.get<{ id: number, description: string }[]>(this.rolesApiUrl).subscribe({
      next: (data) => {
        this.roles = data;
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = 'No se pudieron cargar los roles';
      }
    });
  }

  onSubmit(): void {
    if (!this.name || !this.username || !this.password || !this.roleId) {
      this.errorMessage = 'Todos los campos son obligatorios';
      return;
    }

    const payload = {
      name: this.name.trim(),
      user: this.username.trim(),
      password: this.password.trim(),
      rol_id: this.roleId,
    };

    this.http.post(this.apiUrl, payload).subscribe({
      next: () => {
        this.successMessage = 'Usuario registrado exitosamente';
        this.errorMessage = '';
        setTimeout(() => this.router.navigate(['/login']), 2000);
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = err.error?.detail || 'Ocurrió un error al registrar el usuario';
        this.successMessage = '';
      },
    });
  }

  goBack(): void {
    this.router.navigate(['../']);
  }
}