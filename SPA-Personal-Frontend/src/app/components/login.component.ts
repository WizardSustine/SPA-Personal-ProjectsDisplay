import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  template: `
  <div class="auth-form">
    <form (submit)="onSubmit($event)">
      <h2>Entrar</h2>
      <label>Email<input name="email" type="email" required /></label>
      <label>Contraseña<input name="password" type="password" required /></label>
      <button type="submit">Entrar</button>
      <p class="hint">💡 Usa "admin@" en el email para rol admin</p>
    </form>
  </div>
  `,
  styles: [`.auth-form{max-width:400px;margin:40px auto;padding:20px;border:1px solid #ddd;border-radius:8px;background:#fff}
  form{display:flex;flex-direction:column;gap:12px}
  label{display:flex;flex-direction:column;gap:4px}
  input{padding:8px;border:1px solid #ccc;border-radius:4px}
  button{padding:10px;background:#007bff;color:#fff;border:none;border-radius:4px;cursor:pointer}
  button:hover{background:#0056b3}
  .hint{font-size:0.9rem;color:#666}`]
})
export class LoginComponent {
  constructor(private auth: AuthService, private router: Router) {}

  async onSubmit(e: Event) {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const email = (form.elements.namedItem('email') as HTMLInputElement).value;
    const password = (form.elements.namedItem('password') as HTMLInputElement).value;
    console.log('[LoginComponent] onSubmit:', { email, password });
    try {
      await this.auth.login(email, password);
      console.log('[LoginComponent] Login successful, navigating...');
      this.router.navigate(['/']);
    } catch (err) {
      console.error('[LoginComponent] Error:', err);
      alert('Login failed');
    }
  }
}
