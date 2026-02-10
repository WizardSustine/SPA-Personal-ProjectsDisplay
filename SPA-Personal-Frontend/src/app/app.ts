import { Component, NgZone, OnInit, signal  } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from './services/auth.service';
import { bannerMock } from './data/mock-banner';
import { TrackClickDirective } from './directives/trackclick.directive';

/**
 * Componente raiz de la aplicacion.
 * Proporciona navegacion principal y gestiona estado global del menu.
 * Detecta cambios de visibilidad de pagina para tracking.
 */
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, CommonModule, TrackClickDirective],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App implements OnInit {
  /** Datos de banner predefinidos */
  public banner = bannerMock;
  /** Signal para controlar si el menu esta abierto */
  public menuOpen = signal(false);

  constructor(public auth: AuthService, private ngZone: NgZone) {}

  /** Inicializa listeners para detectar cuando la pagina se oculta/muestra */
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

  /** Abre/cierra el menu de navegacion */
  toggleMenu() {
    this.menuOpen.update(val => !val);
  }

  /** Cierra el menu de navegacion */
  closeMenu() {
    this.menuOpen.set(false);
  }

}