import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  template: `
  <div class="auth-form">
    <form (submit)="onSubmit($event)">
      <h2>Crear cuenta</h2>
      <label>Email<input name="email" type="email" required /></label>
      <label>Contraseña<input name="password" type="password" required /></label>
      <button type="submit">Registrarse</button>
      <p class="hint">💡 Usa "admin@" en el email para rol admin</p>
    </form>
  </div>
  `,
  styles: [`.auth-form{max-width:400px;margin:40px auto;padding:20px;border:1px solid #ddd;border-radius:8px;background:#fff}
  form{display:flex;flex-direction:column;gap:12px}
  label{display:flex;flex-direction:column;gap:4px}
  input{padding:8px;border:1px solid #ccc;border-radius:4px}
  button{padding:10px;background:#28a745;color:#fff;border:none;border-radius:4px;cursor:pointer}
  button:hover{background:#218838}
  .hint{font-size:0.9rem;color:#666}`]
})
export class RegisterComponent {
  constructor(private auth: AuthService, private router: Router) {}

  async onSubmit(e: Event) {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const email = (form.elements.namedItem('email') as HTMLInputElement).value;
    const password = (form.elements.namedItem('password') as HTMLInputElement).value;
    try {
      await this.auth.register(email, password);
      this.router.navigate(['/']);
    } catch (err) {
      alert('Register failed');
    }
  }
}
