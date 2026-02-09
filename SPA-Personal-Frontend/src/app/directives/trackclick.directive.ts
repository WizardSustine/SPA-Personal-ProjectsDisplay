import { Directive, HostListener, Input } from "@angular/core";
import { FunnelPathService } from "../services/funnel-path.service";
import { GraphicService } from "../services/graphic.service";

// handle click events and page hide events to track user interactions and funnel paths
@Directive({ selector: '[trackClick]' })
export class TrackClickDirective {
    @Input() trackClick!: string;

    static graphic: GraphicService;
    constructor(private graphic: GraphicService) {
        TrackClickDirective.graphic = graphic;
    }
    

    @HostListener('click')
    onClick() {
        TrackClickDirective.graphic.track(
        this.trackClick
        );
        console.log(`Current funnel path: ${TrackClickDirective.graphic.funnelPath}`);
    }

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
