import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable } from 'rxjs';
import { UserAuth } from '../models/user.model';

interface UserPayload {
  id: string;
  email: string;
  role: 'user' | 'admin' | 'master';
}

function authHeader(): Record<string, string> {
  const token = sessionStorage.getItem('auth_token');
  return token ? { Authorization: `Bearer ${token}` } : {};
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  public user = signal<UserPayload | null>(null);
  base: string = '/api';

  constructor(private router: Router, private http: HttpClient) {
    const raw = sessionStorage.getItem('auth_user');
    if (raw) this.user.set(JSON.parse(raw));
  }

  // Helpers
    private headers(): HttpHeaders {
        return new HttpHeaders({
        'Content-Type': 'application/json',
        ...authHeader()
        });
    }

    searchFor(emails: string, passwords: string): Observable<String> {
        const userCredentials: UserAuth = {
            email: emails,
            password: passwords
        };
        
        return this.http.post<String>(
                        `${this.base}/auth/login`,
                        userCredentials, { headers: this.headers() }
                    ).pipe(
                        catchError(err => {
                        console.warn('[AuthService] failed', err);
                        return 'Auth failed';
                    })
                );              
    }

  private setUser(payload: UserPayload, token?: string) {
    this.user.set(payload);
    sessionStorage.setItem('auth_user', JSON.stringify(payload));
    if (token) sessionStorage.setItem('auth_token', token);
  }

  async login(email: string, password: string) {
    // Mock: cualquier email/password funciona
    const attempt = 
    console.log('[AuthService] Login attempt:', email);

    
    this.setUser( , this.searchFor(email, password);


    const isAdmin = email.includes('admin');
    const isMaster = email.includes('master');
    const mockUser: UserPayload = {
      id: Math.random().toString(),
      email,
      role: isMaster ? 'master' : isAdmin ? 'admin' : 'user'
    };
    const mockToken = 'mock_token_' + Date.now();
    this.setUser(mockUser, mockToken);
    console.log('[AuthService] Login successful:', mockUser);
    return mockUser;
  }

  async register(email: string, password: string) {
    // Mock: similar a login
    return this.login(email, password);
  }

  logout() {
    this.user.set(null);
    sessionStorage.removeItem('auth_user');
    sessionStorage.removeItem('auth_token');
    this.router.navigate(['/login']);
  }

  isAuthenticated() {
    return !!this.user();
  }

  hasRole(role: 'master' | 'admin' | 'user') {
    const u = this.user();
    return !!u && u.role === role;
  }
}
