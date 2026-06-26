import { Component, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Motorcycle } from '../../../core/models/motorcycle.model';
import { AuthUser, RegisterRequest } from '../../../core/models/auth.model';
import { AdminApiService } from '../../../core/services/admin-api.service';
import { ClienteResponse, ClienteRequest } from '../../../core/models/admin.model';

@Component({
  selector: 'app-sale-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div *ngIf="visible" class="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div class="absolute inset-0 bg-black/60 backdrop-blur-sm" (click)="close()"></div>

      <div class="glass-panel w-full max-w-lg rounded-xl border border-border-hairline relative z-10 max-h-[90vh] overflow-y-auto">
        <div class="p-6">
          <div class="flex items-center justify-between mb-6">
            <h2 class="font-rajdhani font-bold text-xl text-on-surface uppercase tracking-wider">
              Registrar Venta
            </h2>
            <button (click)="close()" class="text-outline hover:text-on-surface transition-colors">
              <span class="material-symbols-outlined">close</span>
            </button>
          </div>

          <div class="mb-6 p-4 bg-surface-container/40 rounded-lg border border-border-hairline/60">
            <p class="font-technical text-xs text-outline tracking-wider uppercase">Modelo</p>
            <p class="font-rajdhani font-bold text-lg text-on-surface">{{ motorcycle?.name }}</p>
            <div class="flex items-center gap-2 mt-2 pt-2 border-t border-border-hairline/30">
              <span class="font-label-sm text-[10px] uppercase tracking-wider text-outline">Stock</span>
              <span class="font-rajdhani font-bold"
                    [class.text-green-400]="(motorcycle?.stock ?? 0) > 3"
                    [class.text-yellow-400]="(motorcycle?.stock ?? 0) > 0 && (motorcycle?.stock ?? 0) <= 3"
                    [class.text-red-400]="(motorcycle?.stock ?? 0) === 0">
                {{ motorcycle?.stock ?? 0 }}
              </span>
              <span *ngIf="(motorcycle?.stock ?? 0) === 0" class="font-body-md text-xs text-red-400 ml-2">
                Sin stock disponible
              </span>
            </div>
          </div>

          <div *ngIf="error && !done" class="font-body-md text-xs text-red-400 bg-red-400/10 border border-red-400/20 rounded-lg px-4 py-2 mb-4">
            {{ error }}
          </div>

          <!-- Success Confirmation -->
          <div *ngIf="done" class="flex flex-col items-center text-center py-6">
            <span class="material-symbols-outlined text-5xl text-green-400 mb-4">check_circle</span>
            <h3 class="font-rajdhani font-bold text-xl text-on-surface mb-2">¡Venta Registrada!</h3>
            <p class="font-body-md text-sm text-outline mb-6">
              Venta registrada exitosamente para <strong class="text-on-surface">{{ selectedCliente?.nombre }} {{ selectedCliente?.apellido }}</strong>
            </p>

            <div *ngIf="clientCredentials" class="w-full p-4 bg-surface-container/40 rounded-lg border border-yellow-500/30 mb-6 text-left">
              <p class="font-label-sm text-[10px] text-yellow-400 uppercase tracking-wider mb-2">Nuevo Usuario Creado — Credenciales del Cliente</p>
              <div class="flex items-center justify-between py-2 border-b border-border-hairline/30">
                <span class="font-body-md text-xs text-outline">Usuario</span>
                <span class="font-rajdhani font-bold text-sm text-on-surface">{{ clientCredentials.username }}</span>
              </div>
              <div class="flex items-center justify-between py-2">
                <span class="font-body-md text-xs text-outline">Contraseña</span>
                <span class="font-rajdhani font-bold text-sm text-on-surface">{{ clientCredentials.password }}</span>
              </div>
              <p class="font-body-md text-xs text-yellow-400/70 mt-2">Anota estas credenciales y entrégaselas al cliente.</p>
            </div>

            <div *ngIf="!clientCredentials" class="w-full p-4 bg-surface-container/40 rounded-lg border border-border-hairline/60 mb-6 text-left">
              <p class="font-body-md text-xs text-outline">
                El cliente ya tiene un usuario registrado. Puede iniciar sesión con sus credenciales existentes en <strong class="text-primary">/mi-historial</strong>.
              </p>
            </div>

            <button (click)="close()" class="btn-primary w-full py-3 text-sm tracking-widest font-technical uppercase">
              CERRAR
            </button>
          </div>

          <!-- Step 1: Client Selection -->
          <div *ngIf="!done" class="mb-6">
            <label class="font-label-sm text-[11px] text-outline uppercase tracking-wider block mb-1.5">
              Cliente
            </label>

            <div class="relative mb-3">
              <input
                type="text"
                [(ngModel)]="searchTerm"
                (input)="onSearch()"
                placeholder="Buscar por nombre, CI o teléfono..."
                class="w-full bg-surface-container/40 border border-border-hairline rounded-lg px-4 py-2.5 pl-9 text-sm text-on-surface placeholder:text-outline-variant/60 focus:outline-none focus:border-primary transition-colors font-body-md"
              />
              <span class="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-outline-variant text-base">search</span>
            </div>

            <!-- Loading -->
            <div *ngIf="loadingClientes" class="flex items-center gap-2 py-3">
              <span class="inline-block w-4 h-4 border-2 border-primary/30 border-t-primary rounded-full animate-spin"></span>
              <span class="font-body-md text-xs text-outline">Cargando clientes...</span>
            </div>

            <!-- Client list (all when empty search, filtered when typing) -->
            <div *ngIf="!loadingClientes && !selectedCliente && !showCreateForm" class="max-h-48 overflow-y-auto mb-2">
              <div *ngIf="filteredClientes.length > 0" class="space-y-1">
                <button
                  *ngFor="let c of filteredClientes"
                  (click)="selectCliente(c)"
                  class="w-full text-left px-4 py-2.5 text-sm text-on-surface hover:bg-surface-container/60 transition-colors rounded-lg border border-border-hairline/30 hover:border-primary/30"
                >
                  <span class="font-rajdhani font-semibold">{{ c.nombre }} {{ c.apellido }}</span>
                  <span class="text-outline text-xs ml-2">({{ c.ci }})</span>
                  <span *ngIf="c.telefono" class="text-outline-variant text-xs ml-2">{{ c.telefono }}</span>
                </button>
              </div>
              <div *ngIf="filteredClientes.length === 0 && searchTerm" class="text-center py-4">
                <p class="text-xs text-outline mb-2">Cliente no encontrado</p>
                <button
                  (click)="showCreateForm = true"
                  class="text-xs text-primary hover:underline"
                >
                  + Crear nuevo cliente
                </button>
              </div>
              <div *ngIf="filteredClientes.length === 0 && !searchTerm" class="text-center py-4">
                <p class="text-xs text-outline">No hay clientes registrados</p>
              </div>
            </div>

            <div *ngIf="selectedCliente && !showCreateForm" class="p-3 bg-primary/5 rounded-lg border border-primary/20">
              <p class="font-rajdhani font-semibold text-sm text-on-surface">
                {{ selectedCliente.nombre }} {{ selectedCliente.apellido }}
              </p>
              <p class="font-technical text-xs text-outline">{{ selectedCliente.ci }} | {{ selectedCliente.telefono || 'Sin teléfono' }}</p>
              <button (click)="selectedCliente = null; searchTerm = ''; onSearch()" class="text-xs text-primary hover:underline mt-1 inline-block">
                Cambiar cliente
              </button>
            </div>

            <!-- Create Client Form -->
            <div *ngIf="showCreateForm" class="flex flex-col gap-3 p-4 bg-surface-container/40 rounded-lg border border-border-hairline/60 mt-2">
              <div class="grid grid-cols-2 gap-3">
                <div>
                  <label class="font-label-sm text-[10px] text-outline uppercase tracking-wider block mb-1">Nombre</label>
                  <input type="text" [(ngModel)]="newCliente.nombre" name="cliNombre" required
                    class="w-full bg-surface/60 border border-border-hairline rounded-lg px-3 py-2 text-xs text-on-surface placeholder:text-outline-variant/60 focus:outline-none focus:border-primary transition-colors font-body-md" />
                </div>
                <div>
                  <label class="font-label-sm text-[10px] text-outline uppercase tracking-wider block mb-1">Apellido</label>
                  <input type="text" [(ngModel)]="newCliente.apellido" name="cliApellido" required
                    class="w-full bg-surface/60 border border-border-hairline rounded-lg px-3 py-2 text-xs text-on-surface placeholder:text-outline-variant/60 focus:outline-none focus:border-primary transition-colors font-body-md" />
                </div>
              </div>
              <div class="grid grid-cols-2 gap-3">
                <div>
                  <label class="font-label-sm text-[10px] text-outline uppercase tracking-wider block mb-1">CI</label>
                  <input type="text" [(ngModel)]="newCliente.ci" name="cliCi" required
                    class="w-full bg-surface/60 border border-border-hairline rounded-lg px-3 py-2 text-xs text-on-surface placeholder:text-outline-variant/60 focus:outline-none focus:border-primary transition-colors font-body-md" />
                </div>
                <div>
                  <label class="font-label-sm text-[10px] text-outline uppercase tracking-wider block mb-1">Teléfono</label>
                  <input type="text" [(ngModel)]="newCliente.telefono" name="cliTelefono"
                    class="w-full bg-surface/60 border border-border-hairline rounded-lg px-3 py-2 text-xs text-on-surface placeholder:text-outline-variant/60 focus:outline-none focus:border-primary transition-colors font-body-md" />
                </div>
              </div>
              <div class="grid grid-cols-2 gap-3">
                <div>
                  <label class="font-label-sm text-[10px] text-outline uppercase tracking-wider block mb-1">Email</label>
                  <input type="email" [(ngModel)]="newCliente.email" name="cliEmail"
                    class="w-full bg-surface/60 border border-border-hairline rounded-lg px-3 py-2 text-xs text-on-surface placeholder:text-outline-variant/60 focus:outline-none focus:border-primary transition-colors font-body-md" />
                </div>
                <div>
                  <label class="font-label-sm text-[10px] text-outline uppercase tracking-wider block mb-1">Dirección</label>
                  <input type="text" [(ngModel)]="newCliente.direccion" name="cliDireccion"
                    class="w-full bg-surface/60 border border-border-hairline rounded-lg px-3 py-2 text-xs text-on-surface placeholder:text-outline-variant/60 focus:outline-none focus:border-primary transition-colors font-body-md" />
                </div>
              </div>
              <button
                (click)="onCreateCliente()"
                [disabled]="creatingCliente || !newCliente.nombre || !newCliente.apellido || !newCliente.ci"
                class="btn-primary py-2 text-xs tracking-widest disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span *ngIf="creatingCliente" class="inline-block w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></span>
                {{ creatingCliente ? 'CREANDO...' : 'CREAR CLIENTE' }}
              </button>
            </div>
          </div>

          <div *ngIf="!done">
            <!-- Step 2: Sale Details -->
            <div class="flex flex-col gap-4 mb-6">
              <div class="grid grid-cols-2 gap-3">
                <div>
                  <label class="font-label-sm text-[11px] text-outline uppercase tracking-wider block mb-1.5">
                    Precio Final (USD)
                  </label>
                  <input
                    type="number"
                    [(ngModel)]="precioFinal"
                    name="precioFinal"
                    required
                    class="w-full bg-surface-container/40 border border-border-hairline rounded-lg px-4 py-2.5 text-sm text-on-surface placeholder:text-outline-variant/60 focus:outline-none focus:border-primary transition-colors font-body-md"
                  />
                </div>
                <div>
                  <label class="font-label-sm text-[11px] text-outline uppercase tracking-wider block mb-1.5">
                    Descuento (USD)
                  </label>
                  <input
                    type="number"
                    [(ngModel)]="descuentoAplicado"
                    name="descuentoAplicado"
                    class="w-full bg-surface-container/40 border border-border-hairline rounded-lg px-4 py-2.5 text-sm text-on-surface placeholder:text-outline-variant/60 focus:outline-none focus:border-primary transition-colors font-body-md"
                  />
                </div>
              </div>
              <div class="grid grid-cols-2 gap-3">
                <div>
                  <label class="font-label-sm text-[11px] text-outline uppercase tracking-wider block mb-1.5">
                    Método de Pago
                  </label>
                  <select
                    [(ngModel)]="metodoPago"
                    name="metodoPago"
                    class="w-full bg-surface-container/40 border border-border-hairline rounded-lg px-4 py-2.5 text-sm text-on-surface focus:outline-none focus:border-primary transition-colors font-body-md"
                  >
                    <option value="">Seleccionar...</option>
                    <option value="efectivo">Efectivo</option>
                    <option value="tarjeta">Tarjeta</option>
                    <option value="transferencia">Transferencia</option>
                    <option value="credito">Crédito</option>
                  </select>
                </div>
                <div>
                  <label class="font-label-sm text-[11px] text-outline uppercase tracking-wider block mb-1.5">
                    Notas
                  </label>
                  <input
                    type="text"
                    [(ngModel)]="notas"
                    name="notas"
                    placeholder="Opcional"
                    class="w-full bg-surface-container/40 border border-border-hairline rounded-lg px-4 py-2.5 text-sm text-on-surface placeholder:text-outline-variant/60 focus:outline-none focus:border-primary transition-colors font-body-md"
                  />
                </div>
              </div>
            </div>

            <button
              (click)="onSubmit()"
              [disabled]="submitting || !canSubmit"
              class="btn-primary w-full py-3 text-sm tracking-widest font-technical uppercase disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span *ngIf="submitting" class="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></span>
              {{ submitting ? 'REGISTRANDO...' : 'REGISTRAR VENTA' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  `
})
export class SaleModalComponent {
  @Input() motorcycle: Motorcycle | undefined;
  @Input() authUser: AuthUser | null = null;
  @Output() visibleChange = new EventEmitter<boolean>();
  private _visible = false;

  @Input() set visible(v: boolean) {
    this._visible = v;
    if (v) {
      this.precioFinal = this.motorcycle?.price ?? 0;
      this.done = false;
      this.clientCredentials = null;
      this.loadClientes();
    }
  }

  get visible(): boolean { return this._visible; }

  searchTerm = '';
  clientes: ClienteResponse[] = [];
  filteredClientes: ClienteResponse[] = [];
  selectedCliente: ClienteResponse | null = null;
  showCreateForm = false;
  loadingClientes = false;
  creatingCliente = false;
  submitting = false;
  error = '';
  done = false;
  clientCredentials: { username: string; password: string } | null = null;

  newCliente: ClienteRequest = { nombre: '', apellido: '', ci: '', telefono: '', email: '', direccion: '' };
  precioFinal = 0;
  descuentoAplicado: number | null = null;
  metodoPago = '';
  notas = '';

  constructor(
    private adminApi: AdminApiService,
    private cdr: ChangeDetectorRef
  ) {}

  private loadClientes(): void {
    this.loadingClientes = true;
    this.clientes = [];
    this.filteredClientes = [];
    this.adminApi.getClientes().subscribe({
      next: (res) => {
        this.clientes = res;
        this.filteredClientes = res;
        this.loadingClientes = false;
        this.cdr.markForCheck();
      },
      error: () => {
        this.loadingClientes = false;
        this.cdr.markForCheck();
      }
    });
  }

  get canSubmit(): boolean {
    return !!this.selectedCliente && this.precioFinal > 0 && !this.showCreateForm
      && (this.motorcycle?.stock ?? 0) > 0;
  }

  onSearch(): void {
    const term = this.searchTerm.toLowerCase().trim();
    if (!term) {
      this.filteredClientes = [...this.clientes];
      return;
    }
    this.filteredClientes = this.clientes.filter(c =>
      `${c.nombre} ${c.apellido}`.toLowerCase().includes(term)
      || c.ci.toLowerCase().includes(term)
      || (c.telefono && c.telefono.includes(term))
    );
  }

  selectCliente(c: ClienteResponse): void {
    this.selectedCliente = c;
    this.showCreateForm = false;
    this.searchTerm = `${c.nombre} ${c.apellido}`;
    this.filteredClientes = [];
  }

  close(): void {
    this.visible = false;
    this.visibleChange.emit(false);
    this.reset();
  }

  private reset(): void {
    this.searchTerm = '';
    this.filteredClientes = [...this.clientes];
    this.selectedCliente = null;
    this.showCreateForm = false;
    this.error = '';
    this.done = false;
    this.clientCredentials = null;
    this.newCliente = { nombre: '', apellido: '', ci: '', telefono: '', email: '', direccion: '' };
    this.metodoPago = '';
    this.notas = '';
    this.descuentoAplicado = null;
  }

  onCreateCliente(): void {
    if (!this.newCliente.nombre || !this.newCliente.apellido || !this.newCliente.ci) return;
    this.creatingCliente = true;
    this.error = '';

    this.adminApi.createCliente(this.newCliente).subscribe({
      next: (cliente) => {
        this.selectedCliente = cliente;
        this.clientes.push(cliente);
        this.filteredClientes = [...this.clientes];
        this.searchTerm = `${cliente.nombre} ${cliente.apellido}`;
        this.showCreateForm = false;
        this.creatingCliente = false;
        this.cdr.markForCheck();
      },
      error: () => {
        this.error = 'Error al crear cliente';
        this.creatingCliente = false;
        this.cdr.markForCheck();
      }
    });
  }

  private generatePassword(): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let pwd = '';
    for (let i = 0; i < 8; i++) {
      pwd += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return pwd;
  }

  onSubmit(): void {
    if (!this.canSubmit || !this.motorcycle || !this.authUser || !this.selectedCliente) return;

    if (!this.authUser.idGerente) {
      this.error = 'Tu usuario no tiene un gerente asociado. Contacta al administrador.';
      return;
    }

    if ((this.motorcycle?.stock ?? 0) <= 0) {
      this.error = 'No hay stock disponible para esta motocicleta. No se puede registrar la venta.';
      return;
    }

    this.submitting = true;
    this.error = '';

    const motoId = parseInt(this.motorcycle.id.replace('moto-', ''), 10);

    this.adminApi.createVenta({
      idCliente: this.selectedCliente.idCliente,
      idGerente: this.authUser.idGerente,
      idMoto: motoId,
      precioFinal: this.precioFinal,
      descuentoAplicado: this.descuentoAplicado,
      metodoPago: this.metodoPago || undefined,
      notas: this.notas || undefined
    }).subscribe({
      next: (res: any) => {
        const username = `cli_${this.selectedCliente!.ci}`;
        const password = this.generatePassword();

        this.adminApi.registerUser({
          username,
          password,
          rol: 'cliente',
          idCliente: this.selectedCliente!.idCliente
        }).subscribe({
          next: (regRes) => {
            if (regRes.status === 201) {
              this.clientCredentials = { username, password };
            }
            this.done = true;
            this.submitting = false;
            this.cdr.markForCheck();
          },
          error: () => {
            this.done = true;
            this.submitting = false;
            this.cdr.markForCheck();
          }
        });
      },
      error: () => {
        this.error = 'Error al registrar la venta';
        this.submitting = false;
        this.cdr.markForCheck();
      }
    });
  }
}
