import { ChangeDetectorRef, Component, OnInit, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { Project } from '../models/project.model';
import { ProjectService } from '../services/project.service';
import { ProjectCardComponent } from './project-card.component';
import { AboutSummaryComponent } from './about-summary.component';
import { AuthService } from '../services/auth.service';
import { TrackClickDirective } from "../directives/trackclick.directive";

@Component({
  selector: 'mainview',
  standalone: true,
  imports: [ProjectCardComponent, CommonModule, RouterLink, AboutSummaryComponent, TrackClickDirective],
  template: `
  <about-summary></about-summary>
  @if (data.length > 0) {
  <div class="grid">
    <div class="card-link" *ngFor="let p of data">
      <a [routerLink]="['/project', p.id]" class="card-inner" [trackClick]="'project ' + p.id">
        <project-card [project]="p"></project-card>
      </a>
      <div class="card-actions" *ngIf="auth.hasRole('admin')">
        <a [routerLink]="['/admin/project', p.id, 'edit']" class="secondary">Editar</a>
        <button (click)="del(p);">Borrar</button>
      </div>
    </div>
  </div>
} @else {
  <p>Cargando proyectos...</p>
}
    `,
  styles: [
    `:host{display:block;padding-right:2.5rem}
    .grid{ display:grid; grid-template-columns:repeat(auto-fill,minmax(300px,1fr)); gap:3rem; justify-items:center;  }
    .card-link{ text-decoration:none; color:inherit; display:flex; flex-direction:column; gap:8px; }
    .card-inner{ text-decoration:none; color:inherit; display:block ; }
    .card-actions{ display:flex; gap:8px; justify-content:center }
    .card-actions a, .card-actions button{ padding:6px 12px; border-radius:6px; border:none; cursor:pointer; font-size:0.9rem }
    .card-actions .secondary{ background:#f3f5f8; color:#333; text-decoration:none; display:inline-block }
    .card-actions button{ background:#dc3545; color:#fff }
    `
  ]
})
export class MainViewComponent implements OnInit {
  data: Project[] = [];
  error: string | null = null;

  constructor(
    public auth: AuthService,
    private ps: ProjectService,
    private router: Router,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    console.log('[Home] init');
    this.ps.getAll().subscribe({
      next: projects => {
        console.log('[Home] data loaded', projects.length);
        this.data = projects;
        this.cd.markForCheck();
      },
      error: err => {
        console.error(err);
        this.error = 'Failed to load projects.';
      }
    });
  }
  
  del(p: Project) {
    if (!confirm('Borrar proyecto?')) return;
      this.ps.delete(p.id).subscribe({
        next: () => {
          this.data = this.data.filter(x => x.id !== p.id);
        },
        error: err => console.error(err)
      });
  }
  
}
