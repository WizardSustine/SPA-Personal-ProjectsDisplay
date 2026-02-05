import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Project } from '../models/project.model';
import { ProjectService } from '../services/project.service';
import { ProjectCardComponent } from './project-card.component';

@Component({
  selector: 'project-admin',
  standalone: true,
  imports: [ProjectCardComponent, CommonModule],
  template: `
  <section class="admin">
    <h2>Administrar proyectos</h2>
<!--
    <form (submit)="create($event)" class="create">
      <input name="title" placeholder="Título" required />
      <input name="imageUrl" placeholder="Image URL" required />
      <input name="description" placeholder="Descripción" required />
      <label><input type="checkbox" name="public" checked /> Público</label>
      <button type="submit">Crear</button>
    </form>

    <div class="grid">
      <project-card *ngFor="let p of projects" [project]="p">
        <button (click)="edit(p)">Editar</button>
        <button (click)="remove(p)">Borrar</button>
      </project-card>
    </div>
  </section-->
  `,
  styles: [
    `.admin{ padding:12px } .grid{ display:flex; gap:12px; flex-wrap:wrap } .create{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:12px}`
  ]
})
export class ProjectAdminComponent implements OnInit {
  projects: Project[] = [];

  constructor(private ps: ProjectService) {}

  async ngOnInit() {}/* await this.load(); }

  async load() {
    try { this.projects = await this.ps.getAll(); } catch (e) { console.error(e); }
  }

  async create(e: Event) {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const title = (form.elements.namedItem('title') as HTMLInputElement).value;
    const imageUrl = (form.elements.namedItem('imageUrl') as HTMLInputElement).value;
    const description = (form.elements.namedItem('description') as HTMLInputElement).value;
    const pub = (form.elements.namedItem('public') as HTMLInputElement).checked;
    try {
      await this.ps.create({ title, imageUrl, description, public: pub } as Partial<Project>);
      form.reset();
      await this.load();
    } catch (err) { console.error(err); alert('Create failed'); }
  }

  edit(p: Project) {
    const title = prompt('Título', p.title);
    if (title === null) return;
    const description = prompt('Descripción', p.description) ?? p.description;
    const imageUrl = prompt('Image URL', p.imageUrl) ?? p.imageUrl;
    this.ps.update(p.id, { title, description, imageUrl }).then(() => this.load());
  }

  remove(p: Project) {
    if (!confirm('Borrar?')) return;
    this.ps.delete(p.id).then(() => this.load()).catch(e => console.error(e));
  }*/
}
