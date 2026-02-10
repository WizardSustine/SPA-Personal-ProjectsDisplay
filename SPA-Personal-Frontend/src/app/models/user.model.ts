/** Credenciales de autenticacion enviadas en login */
export interface UserAuth {
  email: string;
  password: string;
  username?: string;
}

/** Informacion del usuario autenticado almacenada en sesion */
export interface UserPayload {
  id: string;
  email: string;
  username?: string;
  role: 'user' | 'admin' | 'master';
}

/** Respuesta del servidor al login con JWT token */
export interface LoginResponse {
  token: string;
  user?: UserPayload;
}

/** Respuesta generica de autenticacion */
export interface AuthResponse {
  message?: string;
  token?: string;
  user?: UserPayload;
}