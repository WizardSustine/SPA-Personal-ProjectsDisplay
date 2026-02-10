import { Directive, HostListener, Input } from "@angular/core";
import { FunnelPathService } from "../services/funnel-path.service";
import { GraphicService } from "../services/graphic.service";

/**
 * Directiva personalizada que registra clicks y eventos de navegacion.
 * Envia datos a GraphicService para análisis de comportamiento de usuarios.
 */
// handle click events and page hide events to track user interactions and funnel paths
@Directive({ selector: '[trackClick]' })
export class TrackClickDirective {
    /** Input que especifica que evento trackear */
    @Input() trackClick!: string;

    static graphic: GraphicService;
    constructor(private graphic: GraphicService) {
        TrackClickDirective.graphic = graphic;
    }
    

    /** Registra un evento de click en el servicio de graficos */
    @HostListener('click')
    onClick() {
        TrackClickDirective.graphic.track(
        this.trackClick
        );
        console.log(`Current funnel path: ${TrackClickDirective.graphic.funnelPath}`);
    }

    /** Registra cuando una pagina se oculta (usuario navega fuera) */
    @HostListener('window:pagehide', ['$event'])
    onPageClosed(event: Event): void {
        this.graphic.track('page_closed');
        this.graphic.onPageHide(event);
    }

    // onPageHide(event: Event): void {
    //     console.log('event: works?');
    //     this.graphic.track('page_hide');
    //     //this.tracking.onPageHide(event);
    // }
}
