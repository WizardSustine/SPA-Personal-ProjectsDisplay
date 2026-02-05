import { Component, Input, EventEmitter, Output } from '@angular/core';
import { Project } from '../models/project.model';

@Component({
  selector: 'project-card',
  standalone: true,
  template: `
  <div class="card">
    <img [src]="project.imageUrl" alt="{{project.title}}" />
    <div class="content">
      <h3>{{project.title}}</h3>
      <p>{{project.description}}</p>
      <div class="actions">
        <ng-content></ng-content>
      </div>
    </div>
  </div>
  `,
  styles: [
    `:host { display:block; }
    .card { width: 100%; max-width:340px; border: 1px solid rgba(0,0,0,0.08); border-radius:12px; overflow:hidden; display:flex; flex-direction:column; background:#fff; background:linear-gradient(135deg, #8d88f059 0%, #f6f6ff65 100%); box-shadow:0 6px 18px rgba(20,20,30,0.04); transition:transform .18s ease, box-shadow .18s ease }
    .card:hover{ transform:translateY(-6px); box-shadow:0 18px 40px rgba(20,20,30,0.08) }
    img { width:100%; height:200px; object-fit:cover; display:block }
    .content { padding:14px; display:flex; flex-direction:column; gap:8px; min-height:140px }
    h3{ margin:0;font-size:1.05rem;line-height:1.2 }
    p{ margin:0;color:rgba(0,0,0,0.7);font-size:0.95rem;display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden }
    .actions { margin-top:auto; display:flex; gap:8px }
    button{ border:0;background:#007bff;color:#fff;padding:8px 10px;border-radius:6px;cursor:pointer }
    button.secondary{ background:#6c757d }
    @media (max-width:640px){ img{height:160px} }
    `
  ]
})
export class ProjectCardComponent {
  @Input() project!: Project;
}
