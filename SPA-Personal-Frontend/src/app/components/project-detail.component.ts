import { Component, OnInit, ChangeDetectorRef, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Project } from '../models/project.model';
import { ProjectService } from '../services/project.service';

@Component({
  selector: 'project-detail',
  standalone: true,
  imports: [CommonModule],
  template: `
  @if (project){
  <section class="detail">
    <div class="cards">
      <div class="card main-card">
        <div class="main-media"><img [src]="project.imageUrl" [alt]="project.title" /></div>
        <div class="main-body">
          <h1>{{project.title}}</h1>
          <!--p class="desc">{{project.description}}</p-->
          <div class="argument">
            <h3>Argumento</h3>
            <p>{{project.argument}}</p>
          </div>
          <div class="chips">
            <strong>Tecnologías:</strong>
            <span class="chip" *ngFor="let t of project.technology">{{t}}</span>
          </div>
        </div>
      </div>

      <div class="card image-card" *ngFor="let att of (project.attributes || []) | slice:0:3; let i = index" [class.reverse]="i % 2 === 0">
      <div class="img-body">
          <h4>Imagen {{i + 1}}</h4>
          <p>{{att.caption}} </p>
        </div>  
      <div class="img-wrap"><img [src]="att.url" [alt]="att.caption" /></div>
        
      </div>

      <div class="links-row">
        <a *ngIf="project.docsUrl" [href]="project.docsUrl" target="_blank" rel="noopener" class="link-card">
          <div class="title">Documentación técnica</div>
          <div class="meta">Guía y especificaciones</div>
        </a>
        <a *ngIf="project.readmeUrl" [href]="project.readmeUrl" target="_blank" rel="noopener" class="link-card">
          <div class="title">README</div>
          <div class="meta">Instrucciones de instalación y uso</div>
        </a>
        <a *ngIf="project.repoUrl" [href]="project.repoUrl" target="_blank" rel="noopener" class="link-card">
          <div class="title">Repositorio</div>
          <div class="meta">Código fuente en Git</div>
        </a>
      </div>
    
      <div class="back">
        <button (click)="goBack()">← Volver</button>
      </div>
    </div>
  </section>
}@else {
    <p># Loading...</p>
}
  `,
  styles: [
    `.detail{max-width:98%;margin:2px auto; padding:2px; }
    .cards{display:flex;flex-direction:column;gap:16px}
    .card{display:flex;gap:18px;background:linear-gradient(135deg, #f6f6ff65 0%, #c3c1f096 100%);padding:14px;border-radius:12px;align-items:stretch;box-shadow:0 8px 20px rgba(10,10,30,0.04)}
    /* Main card: image at right (row-reverse) and text area larger */
    .main-card{min-height:180px;flex-direction:row-reverse}
    .main-media{flex:0 0 260px;display:flex;align-items:center}
    .main-media img{width:260px;height:160px;object-fit:cover;border-radius:8px}
    .main-body{flex:1;display:flex;flex-direction:column;gap:10px}
    .chips{display:flex;flex-wrap:wrap;gap:8px}
    .chip{background:#eef;padding:6px 8px;border-radius:6px;font-weight:600}
    .argument{background:transparent;padding:0}

    /* Image cards: uniform image size, alternate alignment */
    .image-card{min-height:160px;align-items:stretch}
    .image-card .img-wrap{flex:0 0 220px}
    .image-card .img-wrap img{width:220px;height:140px;object-fit:cover;border-radius:8px;display:block}
    .image-card .img-body{flex:1;display:flex;flex-direction:column;justify-content:center;padding:8px}
    .image-card.reverse{flex-direction:row-reverse}

    /* Link cards */
    .links-row{display:flex;gap:12px}
    .link-card{flex:1;display:flex;flex-direction:column;padding:12px;border-radius:10px;background:#fff;text-decoration:none;color:#111;border:1px solid #eee;box-shadow:0 6px 18px rgba(10,10,30,0.04)}
    .link-card .title{font-weight:700}
    .link-card .meta{font-size:0.9rem;color:#666}

    .back{margin-top:8px}
    button{padding:8px 12px;border-radius:6px;border:0;background:#007bff;color:#fff}

    @media(max-width:900px){
      .main-media{flex-basis:100%}
      .main-media img{width:100%;height:200px}
      .card{flex-direction:column}
      .image-card .img-wrap{width:100%}
      .image-card .img-wrap img{width:100%;height:200px}
      .links-row{flex-direction:column}
    }
    `
  ]
})
export class ProjectDetailComponent implements OnInit {
    project?: Project;
    
    constructor(
        private route: ActivatedRoute,
        private ps: ProjectService,
        private router: Router,
        private cd: ChangeDetectorRef
        ) {}

    ngOnInit(): void {
        console.log("acá corre el details " + this.route.snapshot.paramMap.get('id'));
        const id = this.route.snapshot.paramMap.get('id');
        if (!id) return;

        this.ps.get(id).subscribe({
            next: p => {
            if (!p) {
                this.router.navigate(['/']);
                return;
            }
            this.project = {
                ...p,
                attributes: p.attributes ?? []
            };
            this.cd.markForCheck();
            console.log('[ProjectDetail] loaded project', p.title, " - also ", p.technology);
            },
            error: err => {
            console.error(err);
            this.router.navigate(['/']);
            }
        });
    }

    goBack() {
        this.router.navigate(['/']);
    }
}
