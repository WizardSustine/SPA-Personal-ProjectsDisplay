import { Attribute, Injectable, signal } from '@angular/core';
import { Project } from '../models/project.model';
import { mockProjects } from '../data/mock-projects';
import { apiUrl } from '../app.routes'
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, firstValueFrom, map, of } from 'rxjs';


function authHeader(): Record<string, string> {
  const token = sessionStorage.getItem('auth_token');
  return token ? { Authorization: `Bearer ${token}` } : {};
}

@Injectable({ providedIn: 'root' })
export class ProjectService {
    private base = "/api";//apiUrl;
    
    constructor(private http: HttpClient) {}

    // Helpers
    private headers(): HttpHeaders {
        return new HttpHeaders({
        'Content-Type': 'application/json',
        ...authHeader()
        });
    }

    // GET ALL
    getAll(): Observable<Project[]> {
        console.log('[ProjectService] getAll()');

        return this.http.get<any[]>(`${this.base}/projects/all`).pipe(
        map(data =>
            data.map(item => ({
            id: item.id,
            title: item.title,
            description: item.description,
            imageUrl: item.imageUrl,
            isPublic: item.isPublic,
            technology: item.technology,
            argument: item.argument,
            attributes: Object.entries(item.attributes ?? {}).map(
                ([key, value]) => ({
                url: key,
                caption: value
                })
            ),
            docsUrl: item.docsUrl,
            readmeUrl: item.readmeUrl,
            repoUrl: item.repoUrl
            }) as Project)
        ),
        catchError(err => {
            console.error('[ProjectService] getAll failed, using mock', err);
            return of(mockProjects);
        })
        );
    }

    // GET BY ID
    get(id: string): Observable<Project | null> {
        return this.http.get<any>(`${this.base}/projects/${id}`).pipe(
            map(item => ({
                id: item.id,
                title: item.title,
                description: item.description,
                imageUrl: item.imageUrl,
                isPublic: item.isPublic,
                technology: item.technology,
                argument: item.argument,
                attributes: Object.entries(item.attributes ?? {}).map(
                    ([key, value]) => ({
                    url: key,
                    caption: value
                    })
                ),
                docsUrl: item.docsUrl,
                readmeUrl: item.readmeUrl,
                repoUrl: item.repoUrl
                }) as Project
            ),
        catchError(err => {
            console.warn('[ProjectService] get() failed, fallback to mock', err);
            const mock = mockProjects.find(p => p.id === id) ?? null;
            return of(mock);
        }) 
        );
    }

    // CREATE
    create(p: Partial<Project>): Observable<Project> {
        console.log("this is the authHeader of create" + authHeader);
        return this.http.post<Project>(
        `${this.base}/project/save`,
        p,
        { headers: this.headers() }
        ).pipe(
        catchError(err => {
            console.warn('[ProjectService] create failed, mock insert', err);
            const newP: Project = {
            ...(p as Project),
            id: Date.now().toString()
            };
            mockProjects.push(newP);
            return of(newP);
        })
        );
    }

    // UPDATE
    update(id: string, p: Partial<Project>): Observable<Project> {      
        
        console.log("this is the authHeader of update" + JSON.stringify(this.headers()));
        return this.http.put<Project>(
        `${this.base}/project/update/${id}`,
        p,
        { headers: this.headers() }
        ).pipe(    
        catchError(err => {
            console.warn('[ProjectService] update failed, mock update', err);
            const idx = mockProjects.findIndex(x => x.id === id);
            if (idx >= 0) {
            mockProjects[idx] = { ...mockProjects[idx], ...(p as Project) };
            return of(mockProjects[idx]);
            }
            throw err;
        })
        );  
    }

    // DELETE
    delete(id: string): Observable<boolean> {
        return this.http.delete<void>(
            `${this.base}/project/delete/${id}`,
            { headers: this.headers() }
        ).pipe(
            map(() => true),
                catchError(err => {
                    console.warn('[ProjectService] delete failed, mock delete', err);
                    const idx = mockProjects.findIndex(x => x.id === id);
                    if (idx >= 0) {
                    mockProjects.splice(idx, 1);
                    return of(true);
                    }
                    throw err;
            })
        );
    }
}
