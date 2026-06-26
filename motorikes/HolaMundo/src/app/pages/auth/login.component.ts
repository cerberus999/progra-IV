import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <div class="min-h-screen bg-background flex items-center justify-center relative overflow-hidden">
      <div class="absolute top-1/3 left-10 w-96 h-96 bg-primary/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div class="absolute bottom-1/3 right-10 w-96 h-96 bg-secondary-container/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div class="glass-panel w-full max-w-md mx-6 p-8 rounded-xl border border-border-hairline relative z-10">
        <div class="text-center mb-8">
          <h1 class="font-headline-lg text-[28px] text-gradient uppercase font-bold tracking-wide">
            Iniciar Sesión
          </h1>
          <p class="font-body-md text-on-surface-variant mt-2 text-sm">
            Accede al panel de administración
          </p>
        </div>

        <form (ngSubmit)="onSubmit()" class="flex flex-col gap-5">
          <div>
            <label class="font-label-sm text-[11px] text-outline uppercase tracking-wider block mb-1.5">
              Usuario
            </label>
            <input
              type="text"
              [(ngModel)]="username"
              name="username"
              required
              placeholder="Ingresa tu usuario"
              class="w-full bg-surface-container/40 border border-border-hairline rounded-lg px-4 py-2.5 text-sm text-on-surface placeholder:text-outline-variant/60 focus:outline-none focus:border-primary transition-colors font-body-md"
            />
          </div>

          <div>
            <label class="font-label-sm text-[11px] text-outline uppercase tracking-wider block mb-1.5">
              Contraseña
            </label>
            <input
              type="password"
              [(ngModel)]="password"
              name="password"
              required
              placeholder="Ingresa tu contraseña"
              class="w-full bg-surface-container/40 border border-border-hairline rounded-lg px-4 py-2.5 text-sm text-on-surface placeholder:text-outline-variant/60 focus:outline-none focus:border-primary transition-colors font-body-md"
            />
          </div>

          <div *ngIf="error" class="font-body-md text-xs text-red-400 bg-red-400/10 border border-red-400/20 rounded-lg px-4 py-2">
            {{ error }}
          </div>

          <button
            type="submit"
            [disabled]="loading"
            class="btn-primary w-full py-3 tracking-widest text-sm font-technical uppercase disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span *ngIf="loading" class="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></span>
            {{ loading ? 'Ingresando...' : 'INGRESAR' }}
          </button>
        </form>

        <div class="mt-6 text-center">
          <a routerLink="/" class="font-body-md text-xs text-outline-variant hover:text-primary transition-colors">
            ← Volver al inicio
          </a>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host { display: block; }
  `]
})
export class LoginComponent {
  username = '';
  password = '';
  loading = false;
  error = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onSubmit(): void {
    if (!this.username || !this.password) return;

    this.loading = true;
    this.error = '';

    this.authService.login({ username: this.username, password: this.password }).subscribe({
      next: (user) => {
        this.loading = false;
        if (user.rol === 'admin') {
          this.router.navigate(['/catalogo']);
        } else {
          this.router.navigate(['/']);
        }
      },
      error: (err) => {
        this.loading = false;
        this.error = err.status === 401
          ? 'Usuario o contraseña incorrectos'
          : 'Error al iniciar sesión. Intenta de nuevo.';
      }
    });
  }
}
