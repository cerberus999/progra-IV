import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { ClienteApiService } from '../../core/services/cliente-api.service';
import { UnidadCliente, ServicioMantenimiento, GarantiaPosventa, ReclamoTecnico, SolicitudRepuesto } from '../../core/models/cliente.model';

@Component({
  selector: 'app-cliente-history',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="min-h-screen bg-background pt-28 pb-24">
      <div class="max-w-container-max mx-auto px-6 md:px-margin-desktop">

        <h1 class="font-rajdhani font-bold text-3xl md:text-4xl text-on-surface uppercase tracking-tight mb-2">
          Mis Unidades
        </h1>
        <p class="font-body-md text-outline text-sm mb-10">
          Historial de servicios, garantías y reclamos de tus vehículos
        </p>

        <div *ngIf="loading" class="flex items-center justify-center py-20">
          <div class="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>

        <div *ngIf="error" class="font-body-md text-sm text-red-400 bg-red-400/10 border border-red-400/20 rounded-lg px-4 py-3 mb-6">
          {{ error }}
        </div>

        <div *ngIf="!loading && unidades.length === 0" class="text-center py-20">
          <span class="material-symbols-outlined text-5xl text-outline-variant mb-4">motorcycle</span>
          <p class="font-body-md text-outline text-sm">No tienes unidades registradas</p>
        </div>

        <div class="flex flex-col gap-6">
          <div *ngFor="let u of unidades" class="glass-panel rounded-xl border border-border-hairline overflow-hidden">
            <button
              (click)="toggleUnidad(u.idUnidad)"
              class="w-full flex items-center justify-between p-5 hover:bg-surface-container/30 transition-colors text-left"
            >
              <div class="flex items-center gap-4">
                <span class="material-symbols-outlined text-2xl text-primary">motorcycle</span>
                <div>
                  <p class="font-rajdhani font-bold text-base text-on-surface uppercase">
                    Unidad #{{ u.idUnidad }}
                  </p>
                  <p class="font-technical text-xs text-outline">
                    {{ u.numeroSerieMoto }} · {{ u.placaPatente || 'Sin placa' }}
                  </p>
                </div>
              </div>
              <div class="flex items-center gap-3">
                <span class="font-label-sm text-[11px] text-outline">
                  {{ u.kilometrajeActual }} km
                </span>
                <span class="material-symbols-outlined text-outline transition-transform duration-300"
                  [class.rotate-180]="expandedUnidad === u.idUnidad">
                  expand_more
                </span>
              </div>
            </button>

            <div *ngIf="expandedUnidad === u.idUnidad" class="border-t border-border-hairline/60">
              <div *ngIf="loadingDetalle" class="flex items-center justify-center py-8">
                <div class="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
              </div>

              <div *ngIf="!loadingDetalle" class="p-5 flex flex-col gap-6">
                <!-- Info -->
                <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div class="bg-surface-container/40 rounded-lg p-3">
                    <p class="font-label-sm text-[10px] text-outline uppercase tracking-wider">Compra</p>
                    <p class="font-rajdhani font-semibold text-sm text-on-surface">{{ u.fechaCompra }}</p>
                  </div>
                  <div class="bg-surface-container/40 rounded-lg p-3">
                    <p class="font-label-sm text-[10px] text-outline uppercase tracking-wider">Km compra</p>
                    <p class="font-rajdhani font-semibold text-sm text-on-surface">{{ u.kilometrajeCompra }}</p>
                  </div>
                  <div class="bg-surface-container/40 rounded-lg p-3">
                    <p class="font-label-sm text-[10px] text-outline uppercase tracking-wider">Km actual</p>
                    <p class="font-rajdhani font-semibold text-sm text-on-surface">{{ u.kilometrajeActual }}</p>
                  </div>
                  <div class="bg-surface-container/40 rounded-lg p-3">
                    <p class="font-label-sm text-[10px] text-outline uppercase tracking-wider">Estado</p>
                    <p class="font-rajdhani font-semibold text-sm"
                      [class.text-green-400]="u.activo"
                      [class.text-red-400]="!u.activo">
                      {{ u.activo ? 'Activa' : 'Inactiva' }}
                    </p>
                  </div>
                </div>

                <!-- Servicios -->
                <div>
                  <h3 class="font-rajdhani font-bold text-sm text-on-surface uppercase tracking-wider mb-3 flex items-center gap-2">
                    <span class="material-symbols-outlined text-primary text-base">build</span>
                    Historial de Servicios
                  </h3>
                  <div *ngIf="servicios.length === 0" class="text-xs text-outline py-2">Sin servicios registrados</div>
                  <div *ngFor="let s of servicios" class="border border-border-hairline/40 rounded-lg p-3 mb-2 bg-surface-container/20">
                    <div class="flex items-start justify-between mb-1">
                      <span class="font-rajdhani font-semibold text-sm text-on-surface capitalize">
                        {{ s.tipoServicio }} · {{ s.kilometrajeEntrada }} km
                      </span>
                      <span class="font-label-sm text-[10px] text-outline">{{ s.fechaServicio | date:'shortDate' }}</span>
                    </div>
                    <p class="font-body-md text-xs text-outline mb-1">{{ s.descripcionTrabajos }}</p>
                    <div class="flex items-center gap-3 text-[10px] text-outline">
                      <span *ngIf="s.nombrePlan">Plan: {{ s.nombrePlan }}</span>
                      <span *ngIf="s.costoTotal > 0">Costo: \${{ s.costoTotal }}</span>
                      <span *ngIf="s.esGratuito" class="text-green-400 font-semibold">Gratuito</span>
                      <span>Técnico: {{ s.tecnicoResponsable }}</span>
                    </div>
                    <div *ngIf="s.proximoServicioKm" class="mt-2 text-[10px] text-yellow-400">
                      Próximo servicio: {{ s.proximoServicioKm }} km
                      <span *ngIf="s.proximoServicioFecha">({{ s.proximoServicioFecha }})</span>
                    </div>
                  </div>
                </div>

                <!-- Garantia -->
                <div>
                  <h3 class="font-rajdhani font-bold text-sm text-on-surface uppercase tracking-wider mb-3 flex items-center gap-2">
                    <span class="material-symbols-outlined text-primary text-base">verified</span>
                    Garantía
                  </h3>
                  <div *ngIf="!garantia" class="text-xs text-outline py-2">Sin garantía registrada</div>
                  <div *ngIf="garantia" class="border border-border-hairline/40 rounded-lg p-3 bg-surface-container/20">
                    <div class="flex items-center justify-between mb-2">
                      <span class="font-rajdhani font-semibold text-sm text-on-surface">
                        {{ garantia.tipoGarantiaNombre }}
                      </span>
                      <span class="font-label-sm text-[10px] px-2 py-0.5 rounded-full uppercase"
                        [class.bg-green-400/10]="isWarrantyActive(garantia)"
                        [class.text-green-400]="isWarrantyActive(garantia)"
                        [class.bg-yellow-400/10]="isWarrantyExpiringSoon(garantia)"
                        [class.text-yellow-400]="isWarrantyExpiringSoon(garantia)"
                        [class.bg-red-400/10]="!isWarrantyActive(garantia) && !isWarrantyExpiringSoon(garantia)"
                        [class.text-red-400]="!isWarrantyActive(garantia) && !isWarrantyExpiringSoon(garantia)">
                        {{ getWarrantyStatusLabel(garantia) }}
                      </span>
                    </div>
                    <p class="font-body-md text-xs text-outline mb-2">
                      {{ garantia.fechaInicio }} → {{ garantia.fechaFin }}
                      <span *ngIf="garantia.kilometrajeMaximoGarantia"> · máx {{ garantia.kilometrajeMaximoGarantia }} km</span>
                    </p>
                    <div *ngIf="isWarrantyActive(garantia) && warrantyDaysRemaining(garantia) !== null" class="mb-2">
                      <div class="w-full h-1.5 bg-surface-container rounded-full overflow-hidden">
                        <div class="h-full rounded-full transition-all"
                          [class.bg-green-400]="warrantyDaysRemaining(garantia)! > 30"
                          [class.bg-yellow-400]="warrantyDaysRemaining(garantia)! > 0 && warrantyDaysRemaining(garantia)! <= 30"
                          [style.width.%]="warrantyProgress(garantia)">
                        </div>
                      </div>
                      <p class="text-[10px] text-outline mt-1">
                        {{ warrantyDaysRemaining(garantia) }} días restantes
                      </p>
                    </div>
                    <!-- Coverage -->
                    <div class="flex flex-wrap gap-2 mt-2">
                      <span *ngIf="garantia.cubreMotor" class="text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary">Motor</span>
                      <span *ngIf="garantia.cubreTransmision" class="text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary">Transmisión</span>
                      <span *ngIf="garantia.cubreElectrico" class="text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary">Eléctrico</span>
                      <span *ngIf="garantia.cubreCarroceria" class="text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary">Carrocería</span>
                    </div>
                    <p *ngIf="garantia.condicionesEspeciales" class="text-[10px] text-outline mt-2 border-t border-border-hairline/30 pt-2">
                      {{ garantia.condicionesEspeciales }}
                    </p>
                  </div>
                </div>

                <!-- Solicitudes de Repuesto -->
                <div>
                  <h3 class="font-rajdhani font-bold text-sm text-on-surface uppercase tracking-wider mb-3 flex items-center gap-2">
                    <span class="material-symbols-outlined text-primary text-base">handyman</span>
                    Solicitudes de Repuestos
                  </h3>
                  <div *ngIf="solicitudes.length === 0" class="text-xs text-outline py-2">Sin solicitudes de repuestos</div>
                  <div *ngFor="let s of solicitudes" class="border border-border-hairline/40 rounded-lg p-3 mb-2 bg-surface-container/20">
                    <div class="flex items-start justify-between mb-1">
                      <div>
                        <span class="font-rajdhani font-semibold text-sm text-on-surface">
                          {{ s.nombreRepuesto || 'Repuesto personalizado' }}
                        </span>
                        <span *ngIf="s.codigoRepuesto" class="text-outline text-[10px] ml-2">({{ s.codigoRepuesto }})</span>
                      </div>
                      <span class="font-label-sm text-[10px] px-2 py-0.5 rounded-full uppercase"
                        [class.bg-yellow-400/10]="s.estadoSolicitud === 'pendiente'"
                        [class.text-yellow-400]="s.estadoSolicitud === 'pendiente'"
                        [class.bg-blue-400/10]="s.estadoSolicitud === 'aprobada'"
                        [class.text-blue-400]="s.estadoSolicitud === 'aprobada'"
                        [class.bg-green-400/10]="s.estadoSolicitud === 'disponible'"
                        [class.text-green-400]="s.estadoSolicitud === 'disponible'"
                        [class.bg-red-400/10]="s.estadoSolicitud === 'rechazada'"
                        [class.text-red-400]="s.estadoSolicitud === 'rechazada'">
                        {{ s.estadoSolicitud }}
                      </span>
                    </div>
                    <p class="font-body-md text-xs text-outline">
                      Cant: {{ s.cantidadSolicitada }} · {{ s.fechaSolicitud | date:'shortDate' }}
                      <span *ngIf="s.precioCotizado"> · Cotizado: \${{ s.precioCotizado }}</span>
                    </p>
                    <p *ngIf="s.descripcionLibre" class="text-[10px] text-outline mt-1">{{ s.descripcionLibre }}</p>
                    <div *ngIf="s.estadoSolicitud === 'disponible' && s.fechaDisponibilidad" class="mt-2 text-[10px] text-green-400">
                      Disponible desde {{ s.fechaDisponibilidad }}
                    </div>
                    <div *ngIf="s.notasTaller" class="mt-1 text-[10px] text-outline">
                      Notas: {{ s.notasTaller }}
                    </div>
                  </div>
                </div>

                <!-- Reclamos -->
                <div *ngIf="reclamos.length > 0">
                  <h3 class="font-rajdhani font-bold text-sm text-on-surface uppercase tracking-wider mb-3 flex items-center gap-2">
                    <span class="material-symbols-outlined text-primary text-base">report</span>
                    Reclamos Técnicos
                  </h3>
                  <div *ngFor="let r of reclamos" class="border border-border-hairline/40 rounded-lg p-3 mb-2 bg-surface-container/20">
                    <div class="flex items-start justify-between mb-1">
                      <span class="font-rajdhani font-semibold text-sm text-on-surface">{{ r.descripcionCliente }}</span>
                      <span class="font-label-sm text-[10px] px-2 py-0.5 rounded-full"
                        [class.bg-yellow-400/10]="r.estadoReclamo === 'abierto'"
                        [class.text-yellow-400]="r.estadoReclamo === 'abierto'"
                        [class.bg-blue-400/10]="r.estadoReclamo === 'en_diagnostico' || r.estadoReclamo === 'en_reparacion'"
                        [class.text-blue-400]="r.estadoReclamo === 'en_diagnostico' || r.estadoReclamo === 'en_reparacion'"
                        [class.bg-green-400/10]="r.estadoReclamo === 'resuelto'"
                        [class.text-green-400]="r.estadoReclamo === 'resuelto'">
                        {{ r.estadoReclamo }}
                      </span>
                    </div>
                    <p class="font-body-md text-xs text-outline">
                      {{ r.kilometrajeReclamo }} km · {{ r.fechaIngreso | date:'shortDate' }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class ClienteHistoryComponent implements OnInit {
  unidades: UnidadCliente[] = [];
  expandedUnidad: number | null = null;
  servicios: ServicioMantenimiento[] = [];
  garantia: GarantiaPosventa | null = null;
  reclamos: ReclamoTecnico[] = [];
  solicitudes: SolicitudRepuesto[] = [];
  loading = false;
  loadingDetalle = false;
  error = '';

  constructor(
    public auth: AuthService,
    private api: ClienteApiService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadUnidades();
  }

  private loadUnidades(): void {
    if (!this.auth.currentUser?.idCliente) return;
    this.loading = true;
    this.api.getUnidadesByCliente(this.auth.currentUser.idCliente).subscribe({
      next: (res) => {
        this.unidades = res;
        this.loading = false;
        this.cdr.markForCheck();
      },
      error: () => {
        this.error = 'Error al cargar las unidades';
        this.loading = false;
        this.cdr.markForCheck();
      }
    });
  }

  toggleUnidad(id: number): void {
    if (this.expandedUnidad === id) {
      this.expandedUnidad = null;
      return;
    }
    this.expandedUnidad = id;
    this.loadDetalle(id);
  }

  isWarrantyActive(g: GarantiaPosventa): boolean {
    return g.estadoGarantia === 'activa' && new Date(g.fechaFin) >= new Date();
  }

  isWarrantyExpiringSoon(g: GarantiaPosventa): boolean {
    if (!this.isWarrantyActive(g)) return false;
    const days = this.warrantyDaysRemaining(g);
    return days !== null && days <= 30;
  }

  getWarrantyStatusLabel(g: GarantiaPosventa): string {
    if (this.isWarrantyActive(g)) {
      return this.isWarrantyExpiringSoon(g) ? 'Por vencer' : 'Activa';
    }
    return 'Expirada';
  }

  warrantyDaysRemaining(g: GarantiaPosventa): number | null {
    const now = new Date();
    const end = new Date(g.fechaFin);
    const diff = end.getTime() - now.getTime();
    return diff > 0 ? Math.ceil(diff / (1000 * 60 * 60 * 24)) : null;
  }

  warrantyProgress(g: GarantiaPosventa): number {
    const start = new Date(g.fechaInicio).getTime();
    const end = new Date(g.fechaFin).getTime();
    const now = Date.now();
    if (now >= end) return 100;
    if (now <= start) return 0;
    return Math.round(((now - start) / (end - start)) * 100);
  }

  private loadDetalle(id: number): void {
    this.loadingDetalle = true;
    this.servicios = [];
    this.garantia = null;
    this.reclamos = [];
    this.solicitudes = [];

    this.api.getServiciosByUnidad(id).subscribe({
      next: (res) => { this.servicios = res; this.cdr.markForCheck(); }
    });
    this.api.getGarantiaByUnidad(id).subscribe({
      next: (res) => { this.garantia = res; this.cdr.markForCheck(); },
      error: () => { this.garantia = null; this.cdr.markForCheck(); }
    });
    this.api.getReclamosByUnidad(id).subscribe({
      next: (res) => { this.reclamos = res; this.cdr.markForCheck(); }
    });
    this.api.getSolicitudesByUnidad(id).subscribe({
      next: (res) => { this.solicitudes = res; this.loadingDetalle = false; this.cdr.markForCheck(); },
      error: () => { this.loadingDetalle = false; this.cdr.markForCheck(); }
    });
  }
}
