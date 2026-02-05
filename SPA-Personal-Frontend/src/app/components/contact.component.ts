import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
  <section class="about-summary contact-summary">
    <div class="about-inner">
      <div class="about-text">
        <h2>Contacto</h2>
        <p class="subtitle">Escríbeme para hablar sobre proyectos, colaboraciones o consultas.</p>
      </div>
      <div class="contact-body">
        <form (ngSubmit)="submit()" #f="ngForm" class="contact-form">
          <label>Nombre</label>
          <input name="name" [(ngModel)]="model.name" required />

          <label>Email</label>
          <input name="email" [(ngModel)]="model.email" type="email" required />

          <label>Mensaje</label>
          <textarea name="message" [(ngModel)]="model.message" required></textarea>

          <div class="actions">
            <button type="submit">Enviar</button>
          </div>
        </form>
      </div>
    </div>
  </section>
  `
  ,
  styles: [
    `.about-summary{width:100%;background:linear-gradient(90deg,#fff,#f7fbff);padding:18px;border-radius:10px}
    .about-inner{max-width:1100px;margin:0 auto;display:flex;justify-content:space-between;align-items:center;gap:12px}
    .about-text h2{margin:0}
    .subtitle{color:var(--muted)}
    .contact-body{width:480px}
    @media(max-width:900px){.about-inner{flex-direction:column;align-items:flex-start}.contact-body{width:100%}}
    `
  ]
})
export class ContactComponent {
  model = { name: '', email: '', message: '' };

  submit() {
    // For now just log and show a confirmation — backend can be wired later
    console.log('[Contact] submitted', this.model);
    alert('Gracias — su mensaje ha sido enviado (simulado).');
    this.model = { name: '', email: '', message: '' };
  }
}
