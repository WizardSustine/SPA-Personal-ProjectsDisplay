import {  Injectable } from "@angular/core";
import { FunnelPathService } from "./funnel-path.service";
import { Funnel } from "../models/funnel.model";
import { firstValueFrom } from "rxjs/internal/firstValueFrom";

// Service with methods to interact within backend service and client regarding graphic/funnel tracking
@Injectable({ providedIn: 'root' })
export class GraphicService {
    funnel: Funnel;
    idtmp: boolean = false;

    funnelPath: string[] = [];

    constructor( private visitor: FunnelPathService) {
        this.funnel = {
                    id: "",
                    createdAt: Date.now(),
                    endAt: Date.now(),
                    visitorPaths: []
                }
        this.ensureValidId();
        console.log('Initialized funnel for visitor:', this.funnel);
    }

    async ensureValidId(): Promise<void> {
        let isUnique = false;
        let newId = crypto.randomUUID();
        console.log('Generated unique visitor ID:', newId);
        while (!isUnique) {
            try {
                // Convertimos el observable a promesa para "esperar" la respuesta
                const existingFunnel = await firstValueFrom(this.visitor.getFunnelById(newId));
                console.log('error?', !existingFunnel, ' además tenemos este id ' , newId);
                if (!existingFunnel) {
                    // Si el servidor no devuelve nada, el ID está libre
                    isUnique = true;
                }else{
                    newId = crypto.randomUUID();
                }
            } catch (error) {
                // Si el error es un 404, usualmente significa que el ID es único
                isUnique = true;
            }
        }        
        this.funnel.id = newId;
        console.log('Nuevo ID único asignado:', this.funnel.id);
    }

    addPathSegment(segment: string) {
        this.funnelPath.push(segment);
    }

    setFunnelPath() {        
        this.funnel!.visitorPaths = this.funnelPath;
    }

     setEndTime() {
        if (this.funnel) {
            this.funnel.endAt = Date.now();
        }
    }

    track(event: string) {
        this.addPathSegment(event);
    }

    onPageHide(event: Event): void {
        this.setEndTime();
        this.setFunnelPath();
        this.visitor.postFunnel(this.funnel).subscribe({
            next: (response) => {
                console.log('Funnel data sent successfully', response);
            },
            error: (error) => {
                console.error('Failed to send funnel data', error);
            }
        });
    }
}