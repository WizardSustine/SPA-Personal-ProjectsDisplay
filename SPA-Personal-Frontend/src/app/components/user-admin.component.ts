import { ChangeDetectorRef, Component, OnInit, signal } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserPayload } from '../models/user.model';

interface User {
  id: string;
  email: string;
  username?: string;
  roles: string;
}

@Component({
  selector: 'app-user-admin',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="admin-container">
      <h2>Administración de Usuarios</h2>
      
      <div *ngIf="!isAuthorized()" class="error-message">
        No tienes permiso para acceder a esta sección. Solo administradores y maestros pueden gestionar usuarios.
      </div>

      <div *ngIf="isAuthorized()" class="admin-content">
        <div *ngIf="isLoading()" class="loading">Cargando usuarios...</div>
        
        <div *ngIf="!isLoading() && errorMessage()" class="error-message">
          {{ errorMessage() }}
        </div>

        <div *ngIf="!isLoading() && users().length === 0" class="info-message">
          No hay usuarios registrados.
        </div>

        <table *ngIf="!isLoading() && users().length > 0" class="users-table">
          <thead>
            <tr>
              <th class="mobile-gone">ID</th>
              <th>Email</th>
              <th class="mobile-gone">Usuario</th>
              <th>Gestionar rol</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let user of users()">
              @if(user.username !== "master" && user.email !=="usuario@usuario.com" && user.email !=="admin@admin.com" ){
              <td class="mobile-gone">{{ user.id }}</td>
              <td>{{ user.email }}</td>
              <td class="mobile-gone">{{ user.username || '-' }}</td>
              <td>@if(user.email == auth.user()?.email){
                <div class="btn-group">
                  <button 
                    type="button"
                    (click)="selectRole(user, 'user')"
                    [class.active]="user.roles.includes('user')" disabled>
                    User
                  </button>
                  
                  <button 
                    type="button"
                    (click)="selectRole(user, 'admin')"
                    [class.active]="user.roles.includes('admin')" disabled>
                    Admin
                  </button>
  </div>}@else {<div class="btn-group">
                  <button 
                    type="button"
                    (click)="selectRole(user, 'user')"
                    [class.active]="user.roles.includes('user')">
                    User
                  </button>
                  
                  <button 
                    type="button"
                    (click)="selectRole(user, 'admin')"
                    [class.active]="user.roles.includes('admin')">
                    Admin
                  </button>
  </div>}
              </td>
              <td> <button 
                  class="delete-btn"
                  (click)="onDeleteUser(user)"
                  [disabled]="user.email === auth.user()?.email"
                  [title]="user.email === auth.user()?.email ? 'No puedes eliminarte a ti mismo' : 'Eliminar usuario'"
                >
                  Eliminar
                </button>
              </td>
              }
            
            </tr>
          </tbody>
        </table>

        <div *ngIf="successMessage()" class="success-message">
          {{ successMessage() }}
        </div>
      </div>
    </div>
  `,
  styles: [`
    .admin-container {
      max-width: 1000px;
      margin: 20px auto;
      padding: 20px;
      background: #fff;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }

    h2 {
      margin-top: 0;
      color: #333;
      border-bottom: 2px solid #007bff;
      padding-bottom: 10px;
    }

    .admin-content {
      margin-top: 20px;
    }

    .loading {
      text-align: center;
      padding: 20px;
      color: #666;
    }

    .error-message {
      padding: 12px;
      background: #ffebee;
      color: #d32f2f;
      border-radius: 4px;
      margin-bottom: 10px;
      border-left: 4px solid #d32f2f;
    }

    .success-message {
      padding: 12px;
      background: #e8f5e9;
      color: #2e7d32;
      border-radius: 4px;
      margin-top: 10px;
      border-left: 4px solid #2e7d32;
    }

    .info-message {
      padding: 12px;
      background: #e3f2fd;
      color: #1565c0;
      border-radius: 4px;
      text-align: center;
      border-left: 4px solid #1565c0;
    }

    .users-table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 15px;
    }

    .users-table thead {
      background: #f5f5f5;
    }

    .users-table th {
      padding: 12px;
      text-align: left;
      font-weight: 600;
      border-bottom: 2px solid #ddd;
      color: #333;
    }

    .users-table td {
      padding: 10px 12px;
      border-bottom: 1px solid #eee;
    }

    .mobile-gone {
    }

    .users-table tbody tr:hover {
      background: #f9f9f9;
    }

    .delete-btn {
      padding: 6px 12px;
      background: #d32f2f;
      color: #fff;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 14px;
      font-weight: 500;
    }

    .delete-btn:hover:not(:disabled) {
      background: #c62828;
    }

    .delete-btn:disabled {
      background: #ccc;
      cursor: not-allowed;
    }  

    .btn-group {
  display: inline-flex;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid #ddd;
}

.btn-group button {
  padding: 8px 16px;
  border: none;
  background: white;
  cursor: pointer;
  transition: all 0.2s ease;
  font-weight: 500;
  color: #666;
}

/* Línea divisoria entre botones */
.btn-group button:first-child {
  border-right: 1px solid #ddd;
}

/* Estado cuando el botón está activo */
.btn-group button.active {
  background-color: #007bff; /* Azul o el color de tu marca */
  color: white;
  cursor: default;
}

/* Efecto hover solo en el que no está activo */
.btn-group button:not(.active):hover {
  background-color: #f8f9fa;
}

.btn-group button.active:disabled {
  background-color: #0b3c6c; /* Azul o el color de tu marca */
  color: white;
  cursor: not-allowed;
}

/* Efecto hover solo en el que no está activo */
.btn-group button:not(.active):disabled {
  background-color: #9b9b9b;
  cursor: not-allowed;
}

    @media (max-width:800px){
      .mobile-gone {
        display:none;
      }
      .users-table {
        padding:0;
        font-size: 0.6rem;
      }

      .btn-group {

      }
      
    }
  `]
})

export class UserAdminComponent implements OnInit {
  users = signal<User[]>([]);
  isLoading = signal(true);
  errorMessage = signal('');
  successMessage = signal('');


  constructor(
    public auth: AuthService,
    private router: Router,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit() {
    // Verificar si el usuario tiene permisos
    if (!this.isAuthorized()) {
      setTimeout(() => this.router.navigate(['/']), 2000);
      return;
    }

    this.loadUsers();
  }

  selectRole(user:User, role: string) {
    if (confirm(`¿Estás seguro de que deseas cambiar el rol a ${user.email}?`)) {
      let selectedRole: 'user' | 'admin' | 'master';
    
      if (role === 'admin') {
        selectedRole = 'admin';
      } else {
        selectedRole = 'user';
      }

      // 2. Creamos el payload directamente como un objeto
      const payload: UserPayload = {
        id: user.id,
        email: user.email,
        username: user.username,
        role: selectedRole
      };

      // 3. Lo enviamos al servicio
      this.auth.updateUserRole(payload).subscribe({
        next: () => {console.log('Rol actualizado'),
          this.loadUsers()},
        error: (err) => {
          console.error('Error', err),
          this.loadUsers() // Recargar para restaurar el valor anterior
        }
      });
    }
  }

  isAuthorized(): boolean {
    return this.auth.hasAnyRole(['admin', 'master']);
  }

  loadUsers() {
    this.isLoading.set(true);
    this.errorMessage.set('');
    this.successMessage.set('');

    this.auth.getAllUsers().subscribe({
      next: (data: any[]) => {
        this.users.set(data.map(it => ({
                                        ...it,
                                        username: it.roles.includes("MASTER") ? "master" : it.username,
                                        email: it.roles.includes("MASTER") ? "master" : it.email,
                                        password: it.roles.includes("MASTER") ? "master" : "master",
                                        roles: it.roles.includes("MASTER") ? ["master"] : 
                                              it.roles.includes("ADMIN") ? ["admin"] : ["user"]
                                      })
                                    ));                                   
        this.isLoading.set(false);
      },
      error: (err: any) => {
        console.error('Error loading users:', err);
        this.errorMessage.set('Error al cargar los usuarios');
        this.isLoading.set(false);
      }
    });
  }

  onDeleteUser(user: User) {
    if (confirm(`¿Estás seguro de que deseas eliminar a ${user.email}?`)) {
      this.auth.deleteUser(user.id).subscribe({
        next: () => {
          this.users.set(this.users().filter(u => u.id !== user.id));
          this.successMessage.set(`Usuario ${user.email} eliminado correctamente`);
          setTimeout(() => this.successMessage.set(''), 3000);
        },
        error: (err: any) => {
          console.error('Error deleting user:', err);
          this.errorMessage.set('Error al eliminar el usuario');
        }
      });
    }
  }

  
}
