import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Funnel } from '../models/funnel.model';
import { catchError, map, Observable, of } from 'rxjs';
import { environment } from '../../enviroments/enviroment';

/**
 * Servicio para gestion del funnel de conversion.
 * Registra rutas de navegacion de visitantes y analiza patrones de comportamiento.
 */
// Service to backup user interactions and funnel paths
@Injectable({ providedIn: 'root' })
export class FunnelPathService {
    funnel: Funnel | null = null;

    base = environment.apiUrl;

    constructor(private http: HttpClient) {    }

    /** Guarda un nuevo funnel con las rutas visitadas */
    postFunnel(f: Partial<Funnel>): Observable<Funnel> {
        if (!f) {
            console.error('Funnel is not initialized');
            return new Observable<Funnel>(subscriber => {
                subscriber.error('Funnel is not initialized');
            }   );
        }
        //this.funnel!.visitorPaths = this.funnelPath;
        
        return this.http.post<Funnel>(`${this.base}/funnel/save`, f);
    }

    /** Obtiene todos los funnels registrados en el sistema */
    getAllFunnel(): Observable<Funnel[]> {
        return this.http.get<any[]>(`${this.base}/funnel/all`).pipe(
                map(data =>
                        data.map(item => ({
                                            id: item.id,
                                            createdAt: item.createdAt,
                                            endAt: item.endAt,
                                            visitorPaths: item.visitorPaths
                                        }) as Funnel)
                ),
                catchError(err => {
                    console.error('[FunnelService] getAll failed', err);
                    return of([]);
                })
            );
    }

    /** Obtiene un funnel especifico por su ID de sesion */
    getFunnelById(id: string): Observable<Funnel> {
        return this.http.get<any>(`${this.base}/funnel/${id}`).pipe(
                map(response => ({
                                    id: response.id,
                                    createdAt: response.createdAt,
                                    endAt: response.endAt,
                                    visitorPaths: response.visitorPaths
                                }) as Funnel),
                catchError(err => {
                                    //console.warn('[FunnelService] get() failed', err);
                                    return new Observable<Funnel>(subscriber => {
                                        subscriber.error(err);
                                    });
                                }) 
            );
    }

}