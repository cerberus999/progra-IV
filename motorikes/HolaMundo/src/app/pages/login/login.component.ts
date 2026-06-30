import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  template: `
    <div class="min-h-screen bg-background pt-28 pb-20 relative overflow-hidden flex items-center justify-center">
      <div class="absolute top-1/4 left-1/3 w-96 h-96 bg-primary/10 rounded-full blur-[150px] pointer-events-none"></div>
      <div class="absolute bottom-1/4 right-1/3 w-96 h-96 bg-secondary-container/5 rounded-full blur-[150px] pointer-events-none"></div>

      <div class="max-w-md w-full px-6 relative z-10">
        <div class="glass-panel p-8 rounded-2xl border border-border-hairline/60 shadow-2xl">
          <div class="text-center mb-8">
            <span class="material-symbols-outlined text-primary text-4xl mb-3 animate-pulse">lock</span>
            <h1 class="font-rajdhani font-bold text-2xl text-on-surface uppercase tracking-wider">
              Iniciar Sesión
            </h1>
            <p class="font-body-md text-xs text-outline mt-1 leading-relaxed">
              Ingresa tus credenciales para acceder a la administración.
            </p>
          </div>

          <form [formGroup]="loginForm" (ngSubmit)="onSubmit()" class="flex flex-col gap-5">
            <div class="flex flex-col gap-1.5">
              <label for="email" class="font-rajdhani font-semibold text-[11px] tracking-widest text-outline uppercase">Correo Electrónico</label>
              <div class="relative flex items-center">
                <span class="material-symbols-outlined absolute left-3.5 text-outline text-lg">mail</span>
                <input type="email" id="email" formControlName="email" placeholder="admin@hirosimabike.com"
                  class="w-full bg-[#08060F]/60 border border-border-hairline/60 rounded-lg py-2.5 pl-11 pr-4 font-body-md text-sm text-on-surface placeholder:text-outline-variant/40 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all duration-300" />
              </div>
              <span *ngIf="isFieldInvalid('email')" class="font-technical text-[10px] text-red-400 mt-1">Ingresa un correo electrónico válido.</span>
            </div>

            <div class="flex flex-col gap-1.5">
              <label for="password" class="font-rajdhani font-semibold text-[11px] tracking-widest text-outline uppercase">Contraseña</label>
              <div class="relative flex items-center">
                <span class="material-symbols-outlined absolute left-3.5 text-outline text-lg">vpn_key</span>
                <input [type]="showPassword ? 'text' : 'password'" id="password" formControlName="password" placeholder="••••••••"
                  class="w-full bg-[#08060F]/60 border border-border-hairline/60 rounded-lg py-2.5 pl-11 pr-11 font-body-md text-sm text-on-surface placeholder:text-outline-variant/40 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all duration-300" />
                <button type="button" (click)="togglePasswordVisibility()" class="absolute right-3.5 text-outline hover:text-on-surface transition-colors duration-300 flex items-center">
                  <span class="material-symbols-outlined text-lg">{{ showPassword ? 'visibility_off' : 'visibility' }}</span>
                </button>
              </div>
              <span *ngIf="isFieldInvalid('password')" class="font-technical text-[10px] text-red-400 mt-1">La contraseña es requerida.</span>
            </div>

            <div *ngIf="errorMessage" class="bg-red-950/40 border border-red-500/20 text-red-400 rounded-lg p-3 text-center text-xs font-technical uppercase tracking-wider">
              {{ errorMessage }}
            </div>

            <button type="submit" [disabled]="loginForm.invalid || isLoading"
              class="btn-primary w-full py-3 tracking-widest text-xs flex items-center justify-center gap-2 mt-2 disabled:opacity-50 disabled:cursor-not-allowed">
              <span *ngIf="isLoading" class="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></span>
              {{ isLoading ? 'PROCESANDO...' : 'INGRESAR' }}
            </button>
          </form>

          <div class="text-center mt-6">
            <a [routerLink]="['/']" class="font-technical text-[10px] text-outline hover:text-primary transition-colors duration-300 uppercase tracking-widest">
              ← REGRESAR AL INICIO
            </a>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class LoginComponent {
  loginForm: FormGroup;
  showPassword = false;
  isLoading = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  isFieldInvalid(field: string): boolean {
    const control = this.loginForm.get(field);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }

  async onSubmit(): Promise<void> {
    if (this.loginForm.invalid) return;

    this.isLoading = true;
    this.errorMessage = '';
    const { email, password } = this.loginForm.value;

    try {
      const result = await this.authService.signIn(email, password);
      this.isLoading = false;

      if (result.success) {
        if (this.authService.isAdmin) {
          this.router.navigate(['/admin']);
        } else {
          this.router.navigate(['/']);
        }
      } else {
        this.errorMessage = result.error || 'Credenciales inválidas.';
      }
    } catch (err: any) {
      this.isLoading = false;
      this.errorMessage = err.message || 'Error de conexión.';
    } finally {
      this.cdr.detectChanges();
    }
  }
}
