import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

@Component({
  selector: 'app-contact',
  imports: [CommonModule, ReactiveFormsModule],
  template: `
  <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"></script>
  <section class="contact-summary">
    <div class="contact-inner">
      <div class="contact-text">
        <h2>Contacto</h2>
        <p class="subtitle">Escribime para hablar sobre proyectos, colaboraciones o consultas.</p>
      </div>
      <div class="contact-body">
        <form (ngSubmit)="submit()" [formGroup]="contactForm" class="contact-form">
          <label>Nombre</label>
          <input formControlName="name" />

          <label>Email</label>
          <input formControlName="email" type="email" />
          
          <label>Teléfono</label>
          <input formControlName="phone" type="tel" />

          <label>Mensaje</label>
          <textarea formControlName="message"></textarea>

          <div *ngIf="contactForm.errors?.['atLeastOneRequired'] && contactForm.touched" style="color: red;">
            Debe completar al menos el email o el teléfono.
          </div>

          <div class="actions">
            <button [disabled]="contactForm.invalid" type="submit">Enviar</button>
          </div>
        </form>
      </div>
    </div>
  </section>
  `,
  styles: [`
    .contact-summary{width:97.5%;background:linear-gradient(90deg,#fff,#f7fbff);padding:18px;border-radius:10px; margin: 0}
    .contact-inner{margin:0 auto;display:flex;justify-content:space-between;align-items:center;gap:12px}
    .contact-text h2{margin:0}
    .subtitle{color:var(--muted)}
    .contact-body{width:90%}
    input, textarea { display: block; width: 100%; margin-bottom: 10px; }
    textarea { height: 100px; }
    @media(max-width:600px){.contact-inner{flex-direction:column;align-items:flex-start}.contact-summary{width:92%}}
    @media(max-width:900px){.contact-summary{width:92%}.contact-inner{flex-direction:column;align-items:flex-start}}
    

  `]
})
export class ContactComponent implements OnInit {
  contactForm!: FormGroup;

  emailJS: any;
  constructor(private fb: FormBuilder) { 
    const emailScript = document.createElement('script');
    emailScript.type = 'text/javascript';
    emailScript.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js';
    document.head.appendChild(emailScript);
    emailScript.onload = () => {
       this.emailJS = (window as any).emailjs;
    };
  }
  
  ngOnInit() {
    // 4. Incluimos todos los campos en el grupo para que la validación sea global
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: [''],
      phone: [''],
      message: ['', Validators.required]
    }, { validators: atLeastOneValidator() });
  }

  submit() {
    if (this.contactForm.valid) {     
    console.log('Formulario válido, enviando mensaje...');
    this.emailJS.init("8-uoy-m8n5mWqzj10"); // Initialize EmailJS with your Public Key
    const serviceID = "service_m0slf0o";
    const templateID = "template_saajyhf";

    const templateParams = {
      name: this.contactForm.value.name,
      email: this.contactForm.value.email,
      phone: this.contactForm.value.phone,
      message: this.contactForm.value.message
    };

    console.log('Enviando con EmailJS:', templateParams);
    this.emailJS.send(serviceID, templateID, templateParams)
      .then((response: any) => {
         console.log('ÉXITO!', response.status, response.text);
         alert('Mensaje enviado!');
         this.contactForm.reset();
      }, (err: any) => {
         console.log('ERROR...', err);
         alert('Fallo al enviar el mensaje.');
      });
    } else {
      this.contactForm.markAllAsTouched();
    }
  }
}

// El validador se mantiene igual, es correcto.
export const atLeastOneValidator = (): ValidatorFn => {
  return (control: AbstractControl): ValidationErrors | null => {
    const email = control.get('email')?.value;
    const phone = control.get('phone')?.value;
    return email || phone ? null : { atLeastOneRequired: true };
  };
};