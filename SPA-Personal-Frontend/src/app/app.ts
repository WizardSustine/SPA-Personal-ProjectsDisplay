import { Component, NgZone, OnInit, signal  } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from './services/auth.service';
import { bannerMock } from './data/mock-banner';
import { TrackClickDirective } from './directives/trackclick.directive';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, CommonModule, TrackClickDirective],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App implements OnInit {
  public banner = bannerMock;
  public menuOpen = signal(false);

  constructor(public auth: AuthService, private ngZone: NgZone) {}

  ngOnInit() {
    this.ngZone.runOutsideAngular(() => {
      document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'hidden') {
          TrackClickDirective.prototype.onClick.call({ trackClick: 'page_hidden' });
        }else if((document.visibilityState === 'visible')) {
          TrackClickDirective.prototype.onClick.call({ trackClick: 'page_visible' });
        }});
    });
  }

  toggleMenu() {
    this.menuOpen.update(val => !val);
  }

  closeMenu() {
    this.menuOpen.set(false);
  }

}