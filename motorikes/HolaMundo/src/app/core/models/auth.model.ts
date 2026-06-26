export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  tipo: string;
  username: string;
  rol: string;
  idUsuario: number;
  idGerente: number | null;
  idCliente: number | null;
}

export interface AuthUser {
  token: string;
  username: string;
  rol: 'admin' | 'cliente';
  idUsuario: number;
  idGerente: number | null;
  idCliente: number | null;
}

export interface RegisterRequest {
  username: string;
  password: string;
  rol: string;
  idCliente?: number;
  idGerente?: number;
}
