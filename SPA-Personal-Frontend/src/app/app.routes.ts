import { Routes } from '@angular/router';
import { MainViewComponent } from './components/mainview.component';
import { LoginComponent } from './components/login.component';
import { RegisterComponent } from './components/register.component';
import { adminGuard } from './guards/role.guard';
import { ProjectAdminComponent } from './components/project-admin.component';
import { ProjectDetailComponent } from './components/project-detail.component';
import { AboutDetailComponent } from './components/about-detail.component';
import { ContactComponent } from './components/contact.component';
import { ProjectEditComponent } from './components/project-edit.component';

export const routes: Routes = [
	{ path: '', component: MainViewComponent },
	{ path: 'about', component: AboutDetailComponent },
	{ path: 'contact', component: ContactComponent },
	{ path: 'admin/project/:id/edit', component: ProjectEditComponent, canActivate: [adminGuard] },
	{ path: 'login', component: LoginComponent },
	{ path: 'register', component: RegisterComponent },
	{ path: 'admin', component: ProjectAdminComponent, canActivate: [adminGuard] },
	{ path: 'project/:id', component: ProjectDetailComponent }
];
export const apiUrl: String = 'http://localhost:8080';
