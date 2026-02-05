import { Component } from '@angular/core';
import {  RouterLink } from '@angular/router';
import { aboutMock } from '../data/mock-about';

@Component({
  selector: 'about-summary',
  standalone: true,
  imports: [RouterLink],
  template: `
  <section class="about-summary" [routerLink]="['/about']" role="button">
    <div class="about-inner">
      <div class="about-text">
        <h2>{{data.titleMain}}</h2>
        <p class="subtitle">{{data.argumentMain}}</p>
        <p class="lead">{{data.argumentDetail}}</p>
      </div>
    </div>
  </section>
  `,
  styles: [
    `
    .about-summary{width:100%;margin-bottom:1rem; background:linear-gradient(135deg, #f6f6ff65 0%, #c3c1f096 100%);padding:18px;border-radius:10px; cursor:pointer}
    .about-inner{
        max-width:1100px;margin:0;display:flex;justify-content:space-between;align-items:start;gap:12px}
    .about-text h2{margin:0}
    .subtitle{color:var(--muted)}
    .lead{margin:8px 0 0 0}
    @media(max-width:800px){ .about-inner{flex-direction:column;align-items:flex-start} }
    `
  ]
})
export class AboutSummaryComponent {
  data = aboutMock;


}
