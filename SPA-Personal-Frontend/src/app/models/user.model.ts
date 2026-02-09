export interface UserAuth {
  email: string;
  password: string;
  username?: string;
}

export interface UserPayload {
  id: string;
  email: string;
  username?: string;
  role: 'user' | 'admin' | 'master';
}

export interface LoginResponse {
  token: string;
  user?: UserPayload;
}

export interface AuthResponse {
  message?: string;
  token?: string;
  user?: UserPayload;
}