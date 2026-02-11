import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { aboutMock } from '../data/mock-about';
import { AuthService } from '../services/auth.service';
import { bannerMock } from '../data/mock-banner';

@Component({
  selector: 'about-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
  <main class="about-page">
    <div class="container">
      <div class="about-header">
        <h1>{{data.titleDetail}}</h1>
      </div>
      <p class="subtitle">{{data.argumentDetail}}</p>
      <div class="cards">
        <article *ngFor="let c of data.cards; let i = index" [class.reverse]="i%2===0" class="about-card">
          <div class="card-media"><img [src]="c.imageUrl" [alt]="c.title"></div>
          <div class="card-body">
            <h3>{{c.title}}</h3>
            <p>{{c.text}}</p>
          </div>
        </article>
      </div>
    </div>
    <div trackClick="banner" class="banner" *ngIf="banner">
      <img [src]="banner.imageUrl" [alt]="banner.alt" />
    </div>
  </main>
  `,
  styles: [
    `.about-page{padding:1rem}
    .container{max-width:96%;margin:0 auto}
    .subtitle{color:var(--muted)}
    .cards{display:flex;flex-direction:column;gap:16px;margin-top:18px}
    .about-card{display:flex;gap:12px;align-items:center}
    .about-card.reverse{flex-direction:row-reverse}
    .card-media img{width:260px;height:160px;object-fit:fill;border-radius:8px}
    .card-body{flex:1}
    @media(max-width:800px){.about-card{flex-direction:column}.about-card.reverse{flex-direction:column}}
    @media(max-width:600px){
        .about-page{padding:1rem;}
        .container{max-width:96%;margin:0 auto;}
        .about-card{flex-direction:column}.about-card.reverse{flex-direction:column}}
    `
  ]
})
export class AboutDetailComponent {
  banner = bannerMock;
  data = aboutMock;
  constructor(public auth: AuthService) {}
}
