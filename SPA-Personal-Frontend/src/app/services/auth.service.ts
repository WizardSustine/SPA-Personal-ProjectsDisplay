import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, firstValueFrom } from 'rxjs';
import { UserAuth, UserPayload, LoginResponse } from '../models/user.model';
import { environment } from '../../enviroments/enviroment';

function authHeader(): Record<string, string> {
  const token = sessionStorage.getItem('auth_token');
  return token ? { Authorization: `Bearer ${token}` } : {};
}

/**
 * Servicio de autenticacion y autorizacion.
 * Gestiona login, registro, tokens JWT y estado del usuario.
 * Utiliza sessionStorage para almacenar tokens y datos de usuario.
 */
@Injectable({ providedIn: 'root' })
export class AuthService {
  /** Signal reactivo que contiene los datos del usuario autenticado */
  public user = signal<UserPayload | null>(null);
  private base = environment.apiUrl;

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

  /** Construye los headers HTTP con token JWT si esta disponible */
  private headers(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      ...authHeader()
    });
  }

  /** Almacena el usuario autenticado en signal y sessionStorage */
  private setUser(payload: UserPayload, token?: string) {
    this.user.set(payload);
    sessionStorage.setItem('auth_user', JSON.stringify(payload));
    if (token) sessionStorage.setItem('auth_token', token);
  }

  // Decode JWT token to extract user info
  /** Decodifica un JWT token para extraer el payload */
  private decodeToken(token: string): any {
    try {
      const payload = token.split('.')[1];
      return JSON.parse(atob(payload));
    } catch (e) {
      console.error('Failed to decode token', e);
      return null;
    }
  }

  /**
   * Autentica un usuario con email y password.
   * Decodifica el JWT retornado y almacena informacion en sessionStorage.
   */
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

  /**
   * Registra un nuevo usuario y realiza login automatico.
   * Si no se proporciona username, usa la parte del email antes de @.
   */
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

  /** Extrae el rol del token decodificado */
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

  /** Limpia el token, datos del usuario y redirecciona a login */
  logout() {
    this.user.set(null);
    sessionStorage.removeItem('auth_user');
    sessionStorage.removeItem('auth_token');
    this.router.navigate(['/login']);
  }

  /** Verifica si existe un usuario autenticado */
  isAuthenticated(): boolean {
    return !!this.user();
  }

  /** Verifica si el usuario tiene un rol especifico */
  hasRole(role: 'master' | 'admin' | 'user'): boolean {
    const u = this.user();
    return !!u && u.role === role;
  }

  /** Verifica si el usuario tiene alguno de los roles proporcionados */
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

  updateUserRole(user:UserPayload): Observable<any> {
    return this.http.put(`${this.base}/manage/users/update/${user.id}`, {
      id: user.id,
    username: user.username,
      email: user.email,
      password: '',
      roles: user.role,
    }, {
      headers: this.headers()
    });
  }

  deleteUser(userId: string): Observable<any> {
    return this.http.post(`${this.base}/manage/users/delete/${userId}`, {}, {
      headers: this.headers()
    });
  }
}