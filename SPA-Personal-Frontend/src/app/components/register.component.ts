import { Component, signal } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule],
  template: `
  <div class="auth-form">
    <form (submit)="onSubmit($event)">
      <h2>Crear cuenta</h2>
      
      <label>
        Usuario
        <input 
          name="username" 
          type="text" 
          placeholder="nombre de usuario"
          required 
          [disabled]="isLoading()"
        />
      </label>
      
      <label>
        Email
        <input 
          name="email" 
          type="email" 
          required 
          [disabled]="isLoading()"
        />
      </label>
      
      <label>
        Contraseña
        <input 
          name="password" 
          type="password" 
          required 
          [disabled]="isLoading()"
        />
      </label>
      
      <button type="submit" [disabled]="isLoading()">
        {{ isLoading() ? 'Registrando...' : 'Registrarse' }}
      </button>
      
      <p *ngIf="errorMessage()" class="error">{{ errorMessage() }}</p>
      <p class="hint">Se registrará con rol de usuario estándar</p>
    </form>
  </div>
  `,
  styles: [`
    .auth-form {
      max-width: 400px;
      margin: 40px auto;
      padding: 20px;
      border: 1px solid #ddd;
      border-radius: 8px;
      background: #fff;
    }
    
    form {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    
    label {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }
    
    input {
      padding: 8px;
      border: 1px solid #ccc;
      border-radius: 4px;
    }
    
    input:disabled {
      background: #f0f0f0;
      cursor: not-allowed;
    }
    
    button {
      padding: 10px;
      background: #28a745;
      color: #fff;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-weight: 500;
    }
    
    button:hover:not(:disabled) {
      background: #218838;
    }
    
    button:disabled {
      background: #ccc;
      cursor: not-allowed;
    }
    
    .hint {
      font-size: 0.9rem;
      color: #666;
      text-align: center;
      margin: 0;
    }
    
    .error {
      color: #d32f2f;
      font-size: 0.9rem;
      margin: 0;
      padding: 8px;
      background: #ffebee;
      border-radius: 4px;
    }
  `]
})
export class RegisterComponent {
  isLoading = signal(false);
  errorMessage = signal('');

  constructor(private auth: AuthService, private router: Router) {}

  async onSubmit(e: Event) {
    e.preventDefault();
    this.errorMessage.set('');
    this.isLoading.set(true);

    const form = e.target as HTMLFormElement;
    const username = (form.elements.namedItem('username') as HTMLInputElement).value;
    const email = (form.elements.namedItem('email') as HTMLInputElement).value;
    const password = (form.elements.namedItem('password') as HTMLInputElement).value;

    try {
      // Register always with 'user' role (no admin/master assignment allowed here)
      await this.auth.register(email, password, username);
      this.router.navigate(['/']);
    } catch (err: any) {
      const msg = typeof err === 'string' ? err : (err?.message || 'Registration failed');
      this.errorMessage.set(msg);
      console.error('[RegisterComponent] Error:', err);
    } finally {
      this.isLoading.set(false);
    }
  }
}
