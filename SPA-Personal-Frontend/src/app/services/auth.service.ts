import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, firstValueFrom } from 'rxjs';
import { UserAuth, UserPayload, LoginResponse } from '../models/user.model';

function authHeader(): Record<string, string> {
  const token = sessionStorage.getItem('auth_token');
  return token ? { Authorization: `Bearer ${token}` } : {};
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  public user = signal<UserPayload | null>(null);
  private base = '/api';

  constructor(private router: Router, private http: HttpClient) {
    const raw = sessionStorage.getItem('auth_user');
    if (raw) {
      try {
        this.user.set(JSON.parse(raw));
      } catch (e) {
        console.error('Failed to parse user from storage', e);
      }
    }
  }

  private headers(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      ...authHeader()
    });
  }

  private setUser(payload: UserPayload, token?: string) {
    this.user.set(payload);
    sessionStorage.setItem('auth_user', JSON.stringify(payload));
    if (token) sessionStorage.setItem('auth_token', token);
  }

  // Decode JWT token to extract user info
  private decodeToken(token: string): any {
    try {
      const payload = token.split('.')[1];
      return JSON.parse(atob(payload));
    } catch (e) {
      console.error('Failed to decode token', e);
      return null;
    }
  }

  async login(email: string, password: string): Promise<UserPayload> {
    const credentials: UserAuth = { email, password };
    
    try {
      const response = await firstValueFrom(
        this.http.post<LoginResponse>(`${this.base}/auth/login`, credentials, {
          headers: this.headers()
        })
      );

      if (!response.token) {
        throw new Error('No token in response');
      }

      // Decode token to get user info
      const decoded = this.decodeToken(response.token);
      
      const user: UserPayload = {
        id: decoded.sub || Math.random().toString(),
        email: email,
        role: this.extractRoleFromToken(decoded) || 'user'
      };

      this.setUser(user, response.token);
      return user;
    } catch (err: any) {
      console.error('[AuthService] Login failed:', err);
      throw new Error(err?.error?.message || 'Login failed');
    }
  }

  async register(email: string, password: string, username?: string): Promise<UserPayload> {
    const credentials = {
      email,
      password,
      username: username || email.split('@')[0]
    };

    try {
      const response = await firstValueFrom(
        this.http.post<any>(`${this.base}/auth/register`, credentials, {
          headers: this.headers()
        })
      );

      // After successful registration, log in automatically
      return this.login(email, password);
    } catch (err: any) {
      console.error('[AuthService] Register failed:', err);
      throw new Error(err?.error || 'Registration failed');
    }
  }

  private extractRoleFromToken(decoded: any): 'user' | 'admin' | 'master' | undefined {
    if (!decoded) return undefined;
    
    // Check for roles in different possible locations in JWT
    const roles = decoded.roles || decoded.authorities || [];
    
    if (Array.isArray(roles)) {
      const roleStr = roles[0];
      if (typeof roleStr === 'string') {
        const role = roleStr.toLowerCase().replace('role_', '');
        if (role === 'master' || role === 'admin' || role === 'user') {
          return role as 'user' | 'admin' | 'master';
        }
      }
    }
    
    return undefined;
  }

  logout() {
    this.user.set(null);
    sessionStorage.removeItem('auth_user');
    sessionStorage.removeItem('auth_token');
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return !!this.user();
  }

  hasRole(role: 'master' | 'admin' | 'user'): boolean {
    const u = this.user();
    return !!u && u.role === role;
  }

  hasAnyRole(roles: Array<'master' | 'admin' | 'user'>): boolean {
    const u = this.user();
    return !!u && roles.includes(u.role);
  }

  // User management methods (for admin/master)
  getAllUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.base}/manage/users/all`, {
      headers: this.headers()
    });
  }

  updateUserRole(userId: string, role: 'user' | 'admin' | 'master'): Observable<any> {
    return this.http.put(`${this.base}/manage/users/update/${userId}`, { roles: role.toUpperCase() }, {
      headers: this.headers()
    });
  }

  deleteUser(userId: string): Observable<any> {
    return this.http.post(`${this.base}/manage/users/delete/${userId}`, {}, {
      headers: this.headers()
    });
  }
}