import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ProjectService } from '../services/project.service';
import { Project } from '../models/project.model';

@Component({
  selector: 'project-edit',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
  <section class="edit-card">
    <div class="container">
      <h2>{{ isNew ? 'Crear proyecto' : 'Editar proyecto' }}</h2>
      <form (ngSubmit)="save()">
        <label>Título</label>
        <input [(ngModel)]="model.title" name="title" required />

        <label>Descripción</label>
        <input [(ngModel)]="model.description" name="description" />

        <label>Imagen principal (URL)</label>
        <input [(ngModel)]="model.imageUrl" name="imageUrl" />

        <label>Tecnologías (coma-separadas)</label>
        <input [(ngModel)]="model.technology" name="technology" />

        <label>Argumento</label>
        <textarea [(ngModel)]="model.argument" name="argument"></textarea>

        <label>Documentación URL</label>
        <input [(ngModel)]="model.docsUrl" name="docsUrl" />

        <label>README URL</label>
        <input [(ngModel)]="model.readmeUrl" name="readmeUrl" />

        <label>Repo URL</label>
        <input [(ngModel)]="model.repoUrl" name="repoUrl" />

        <fieldset class="images-section">
          <legend>Imágenes del Proyecto</legend>
          <div *ngFor="let img of attributes; let i = index" class="image-item">
            <label>Imagen {{ i + 1 }} URL</label>
            <input [(ngModel)]="img.url" [name]="'imgUrl' + i" />
            <label>Caption</label>
            <input [(ngModel)]="img.caption" [name]="'imgCaption' + i" />
            <button type="button" (click)="removeImage(i)" class="danger">Eliminar</button>
          </div>
          <button type="button" (click)="addImage()" class="secondary-btn">+ Agregar imagen</button>
        </fieldset>

        <div class="actions">
          <button type="submit">Guardar</button>
          <a routerLink="/" class="secondary">Cancelar</a>
        </div>
      </form>
    </div>
  </section>
  `,
  styles: [
    `.edit-card{padding:18px;padding-bottom:200px}
    .container{max-width:760px;margin:0 auto;background:var(--card-bg);padding:18px;border-radius:10px;box-shadow:0 6px 18px rgba(0,0,0,0.06)}
    label{display:block;margin-top:10px;font-weight:600;color:var(--muted)}
    input,textarea{width:100%;padding:8px;border-radius:8px;border:1px solid #e6e9ef;margin-top:6px;box-sizing:border-box}
    textarea{min-height:120px}
    fieldset{border:1px solid #e6e9ef;padding:12px;border-radius:8px;margin-top:12px}
    legend{padding:0 6px;font-weight:600}
    .image-item{background:#f9fafb;padding:12px;border-radius:8px;margin-bottom:10px;border:1px solid #e6e9ef}
    .image-item label{margin-top:8px}
    .actions{display:flex;gap:12px;justify-content:flex-end;margin-top:12px}
    .secondary{display:inline-block;padding:8px 12px;border-radius:8px;background:#f3f5f8;color:#333;text-decoration:none}
    .secondary-btn{background:#f3f5f8;color:#333;border:1px solid #e6e9ef;padding:8px 12px;border-radius:8px;cursor:pointer;margin-top:10px}
    .secondary-btn:hover{background:#e6e9ef}
    button[type="submit"]{background:#007bff;color:#fff;border:none;padding:8px 14px;border-radius:8px;cursor:pointer}
    button[type="submit"]:hover{background:#0056b3}
    button.danger{background:#dc3545;color:#fff;border:none;padding:6px 10px;border-radius:6px;cursor:pointer;font-size:0.85rem}
    button.danger:hover{background:#c82333}
    `
  ]
})
export class ProjectEditComponent implements OnInit {
    model: Partial<Project> = {};
    technology = '';
    attributes: Array<{ url: string; caption: string }> = [];
    id = '';
    isNew = false;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private ps: ProjectService,
        private cd: ChangeDetectorRef
    ) {}

    ngOnInit(): void {
        this.id = this.route.snapshot.paramMap.get('id') || '';
        this.isNew = this.id === 'new';

        if (!this.isNew) {
            this.ps.get(this.id).subscribe({
            next: p => {
                if (!p) {
                this.router.navigate(['/']);
                return;
                }

                this.model = p;
                this.technology = (p.technology || []).join(', ');
                this.attributes = (p.attributes || []).map(img => ({ ...img }));
                this.cd.markForCheck();
            },
           
            error: err => console.error(err)
            });
        }
    }


    addImage() {
        this.attributes.push({ url: '', caption: '' });
    }

    removeImage(index: number) {
        this.attributes.splice(index, 1);
    }

    save(): void {
        const payload: Partial<Project> = {
            ...this.model,
            technology: this.technology
            .split(',')
            .map(s => s.trim())
            .filter(Boolean),
            attributes: this.attributes.filter(img => img.url)
        };

        if (this.isNew) {
            this.ps.create(payload).subscribe({
            next: created => {
                this.router.navigate(['/project', created.id]);
            },
            error: err => {
                console.error(err);
                alert('Error al guardar');
            }
            });
        } else {
            this.ps.update(this.id, payload).subscribe({
            next: () => {
                this.router.navigate(['/project', this.id]);
            },
            error: err => {
                console.error(err);
                alert('Error al guardar');
            }
            });
        }
    }
}
