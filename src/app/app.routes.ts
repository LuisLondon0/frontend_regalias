import { Routes } from '@angular/router';
import { LoginComponent } from './features/login/login.component';
import { RegisterComponent } from './features/register/register.component';
import { ProjectListComponent } from './features/projects/project-list/project-list.component';
import { ProjectCreateComponent } from './features/projects/project-create/project-create.component';
import { ProjectDetailComponent } from './features/projects/project-detail/project-detail.component';
import { ProjectEditComponent } from './features/projects/project-edit/project-edit.component';

export const routes: Routes = [
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent },
    {path: 'projects', component: ProjectListComponent},
    {path: 'project-create', component: ProjectCreateComponent},
    {path: 'project-detail/:id', component: ProjectDetailComponent},
    {path: 'project-edit/:id', component: ProjectEditComponent},
    {path: '**', redirectTo: 'login'},
];
