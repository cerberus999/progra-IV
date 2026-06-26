import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { AuthUser, LoginRequest } from '../models/auth.model';
import { AuthApiService } from './auth-api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly TOKEN_KEY = 'auth_token';
  private readonly USER_KEY = 'auth_user';

  private currentUserSubject = new BehaviorSubject<AuthUser | null>(this.loadUser());
  currentUser$: Observable<AuthUser | null> = this.currentUserSubject.asObservable();

  constructor(private api: AuthApiService) {}

  get currentUser(): AuthUser | null {
    return this.currentUserSubject.value;
  }

  get isLoggedIn(): boolean {
    return this.currentUser !== null;
  }

  get token(): string | null {
    return this.currentUser?.token ?? null;
  }

  login(data: LoginRequest): Observable<AuthUser> {
    return this.api.login(data).pipe(
      map(res => {
        const user: AuthUser = {
          token: res.token,
          username: res.username,
          rol: res.rol as 'admin' | 'cliente',
          idUsuario: res.idUsuario,
          idGerente: res.idGerente,
          idCliente: res.idCliente
        };
        this.saveUser(user);
        this.currentUserSubject.next(user);
        return user;
      })
    );
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
    this.currentUserSubject.next(null);
  }

  private saveUser(user: AuthUser): void {
    localStorage.setItem(this.TOKEN_KEY, user.token);
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
  }

  private loadUser(): AuthUser | null {
    const token = localStorage.getItem(this.TOKEN_KEY);
    const raw = localStorage.getItem(this.USER_KEY);
    if (token && raw) {
      try {
        return JSON.parse(raw) as AuthUser;
      } catch {
        return null;
      }
    }
    return null;
  }
}
