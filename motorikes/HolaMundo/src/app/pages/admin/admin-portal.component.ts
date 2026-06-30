import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MotorcycleService } from '../../core/services/motorcycle.service';
import { AuthService } from '../../core/services/auth.service';
import { Motorcycle } from '../../core/models/motorcycle.model';
import { Brand } from '../../core/models/brand.model';

@Component({
  selector: 'app-admin-portal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="min-h-screen bg-background pt-28 pb-20 relative overflow-hidden">
      <!-- Glow background details -->
      <div class="absolute top-1/4 left-10 w-96 h-96 bg-primary/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div class="absolute bottom-1/4 right-10 w-96 h-96 bg-secondary-container/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div class="max-w-container-max mx-auto px-6 md:px-margin-desktop relative z-10">
        <!-- Header -->
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <span class="font-label-sm text-primary uppercase tracking-[0.25em] mb-2 block">Panel de Control</span>
            <h1 class="font-headline-lg text-gradient uppercase font-bold tracking-wide">
              Gestión de Inventario
            </h1>
            <p class="font-body-md text-on-surface-variant text-sm mt-1">
              Administra el catálogo de motocicletas, controla existencias, visibilidad y agrega nuevos modelos.
            </p>
          </div>
          <div>
            <button 
              (click)="openModal(null)"
              class="btn-primary py-3 px-6 text-xs tracking-widest flex items-center gap-2"
            >
              <span class="material-symbols-outlined text-sm font-bold">add</span>
              NUEVO PRODUCTO
            </button>
          </div>
        </div>

        <!-- Inventory List -->
        <div class="glass-panel rounded-xl border border-border-hairline/60 overflow-hidden shadow-xl">
          <div class="overflow-x-auto">
            <table class="w-full text-left border-collapse">
              <thead>
                <tr class="border-b border-border-hairline/40 bg-[#0c0a18]/60 font-rajdhani font-semibold text-xs tracking-wider text-outline uppercase">
                  <th class="p-5">Detalle</th>
                  <th class="p-5">Marca</th>
                  <th class="p-5">Categoría</th>
                  <th class="p-5 text-right">Precio</th>
                  <th class="p-5 text-center">Stock</th>
                  <th class="p-5 text-center">Visibilidad</th>
                  <th class="p-5 text-center">Acciones</th>
                </tr>
              </thead>
              <tbody class="font-body-md text-sm text-on-surface-variant divide-y divide-border-hairline/30">
                <tr *ngFor="let bike of motorcycles; let idx = index" class="hover:bg-white/[0.02] transition-colors duration-200">
                  <!-- Image + Name -->
                  <td class="p-5 flex items-center gap-4 min-w-[280px]">
                    <div class="w-16 h-12 bg-[#08060F] border border-border-hairline/40 rounded overflow-hidden flex items-center justify-center p-1.5">
                      <img [src]="bike.image" [alt]="bike.name" class="h-full w-full object-contain" />
                    </div>
                    <div>
                      <div class="font-rajdhani font-bold text-on-surface text-base uppercase leading-tight">{{ bike.name }}</div>
                      <div class="text-[10px] text-outline font-technical uppercase mt-0.5">{{ bike.year_range }}</div>
                    </div>
                  </td>

                  <!-- Brand -->
                  <td class="p-5 font-technical text-xs uppercase tracking-wider">
                    <span 
                      class="px-2 py-0.5 rounded-full text-[10px] font-semibold"
                      [ngClass]="{
                        'bg-[#39FF14]/10 text-[#39FF14] border border-[#39FF14]/20': bike.brand === 'kawasaki',
                        'bg-[#CC0000]/10 text-[#CC0000] border border-[#CC0000]/20': bike.brand === 'honda',
                        'bg-[#003087]/10 text-[#003087] border border-[#003087]/20': bike.brand === 'yamaha',
                        'bg-[#E8840B]/10 text-[#E8840B] border border-[#E8840B]/20': bike.brand === 'suzuki'
                      }"
                    >
                      {{ bike.brand }}
                    </span>
                  </td>

                  <!-- Type -->
                  <td class="p-5 text-xs font-technical uppercase">{{ bike.type }}</td>

                  <!-- Price -->
                  <td class="p-5 text-right font-rajdhani font-bold text-base text-primary">
                    \${{ bike.price | number }}
                  </td>

                  <!-- Stock controller -->
                  <td class="p-5 text-center min-w-[120px]">
                    <div class="inline-flex items-center gap-2 bg-[#08060F]/60 border border-border-hairline/60 rounded-md p-1">
                      <button 
                        (click)="adjustStock(bike, -1)"
                        [disabled]="(bike.stock || 0) <= 0"
                        class="w-6 h-6 rounded flex items-center justify-center text-outline hover:text-on-surface hover:bg-white/5 transition-colors disabled:opacity-30"
                      >
                        <span class="material-symbols-outlined text-xs">remove</span>
                      </button>
                      <span class="font-rajdhani font-bold text-on-surface w-8 text-center text-sm">{{ bike.stock }}</span>
                      <button 
                        (click)="adjustStock(bike, 1)"
                        class="w-6 h-6 rounded flex items-center justify-center text-outline hover:text-on-surface hover:bg-white/5 transition-colors"
                      >
                        <span class="material-symbols-outlined text-xs">add</span>
                      </button>
                    </div>
                  </td>

                  <!-- Visibility toggle -->
                  <td class="p-5 text-center">
                    <button 
                      (click)="toggleVisibility(bike)"
                      class="px-3 py-1 rounded-full text-[10px] font-technical uppercase tracking-wider border transition-all duration-300"
                      [ngClass]="bike.visible ? 'bg-primary/10 border-primary/20 text-primary hover:bg-primary/20' : 'bg-outline-variant/10 border-outline-variant/20 text-outline hover:bg-outline-variant/20'"
                    >
                      {{ bike.visible ? 'Público' : 'Oculto' }}
                    </button>
                  </td>

                  <!-- CRUD Actions -->
                  <td class="p-5 text-center">
                    <div class="flex items-center justify-center gap-2">
                      <button 
                        (click)="openModal(bike)"
                        class="w-8 h-8 rounded border border-border-hairline/60 flex items-center justify-center text-outline hover:text-primary hover:border-primary transition-all duration-300"
                        title="Editar"
                      >
                        <span class="material-symbols-outlined text-base">edit</span>
                      </button>
                      <button 
                        (click)="softDelete(bike)"
                        class="w-8 h-8 rounded border border-border-hairline/60 flex items-center justify-center text-outline hover:text-red-400 hover:border-red-400/30 transition-all duration-300"
                        title="Desactivar / Ocultar"
                      >
                        <span class="material-symbols-outlined text-base">delete</span>
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Empty State -->
          <div *ngIf="motorcycles.length === 0" class="p-16 text-center">
            <span class="material-symbols-outlined text-outline text-6xl mb-4 animate-pulse">database</span>
            <h3 class="font-rajdhani font-bold text-lg text-on-surface uppercase tracking-wider mb-1">Inventario Vacío</h3>
            <p class="font-body-md text-xs text-outline max-w-sm mx-auto">
              No hay motocicletas registradas en Supabase. Utiliza el botón "Nuevo Producto" para añadir la primera moto.
            </p>
          </div>
        </div>
      </div>

      <!-- MODAL FORM -->
      <div 
        *ngIf="isModalOpen"
        class="fixed inset-0 z-50 overflow-y-auto bg-black/80 flex items-center justify-center p-6 backdrop-blur-sm"
      >
        <div class="glass-panel w-full max-w-3xl rounded-2xl border border-border-hairline shadow-2xl overflow-hidden my-8 animate-fade-in">
          <!-- Modal Header -->
          <div class="flex justify-between items-center p-6 border-b border-border-hairline/40 bg-[#0c0a18]/60">
            <h2 class="font-rajdhani font-bold text-lg text-on-surface uppercase tracking-wider flex items-center gap-2">
              <span class="material-symbols-outlined text-primary">sports_motorsports</span>
              {{ isEditMode ? 'Editar Motocicleta' : 'Agregar Nueva Motocicleta' }}
            </h2>
            <button (click)="closeModal()" class="text-outline hover:text-on-surface transition-colors">
              <span class="material-symbols-outlined">close</span>
            </button>
          </div>

          <!-- Modal Body / Form -->
          <form [formGroup]="productForm" (ngSubmit)="saveProduct()" class="p-6 max-h-[70vh] overflow-y-auto flex flex-col gap-6">
            <!-- 1. GENERAL INFORMATION -->
            <div>
              <h3 class="font-rajdhani font-bold text-xs text-primary uppercase tracking-widest border-b border-border-hairline/30 pb-2 mb-4">Información General</h3>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="flex flex-col gap-1.5">
                  <label class="font-rajdhani font-semibold text-[10px] tracking-widest text-outline uppercase">Nombre del Modelo</label>
                  <input type="text" formControlName="name" placeholder="Ej. Ninja 400" class="admin-input" />
                </div>
                <div class="flex flex-col gap-1.5">
                  <label class="font-rajdhani font-semibold text-[10px] tracking-widest text-outline uppercase">Marca</label>
                  <select formControlName="brand" class="admin-input">
                    <option value="">Selecciona Marca</option>
                    <option *ngFor="let b of brands" [value]="b.slug">{{ b.name }}</option>
                  </select>
                </div>
                <div class="grid grid-cols-2 gap-4">
                  <div class="flex flex-col gap-1.5">
                    <label class="font-rajdhani font-semibold text-[10px] tracking-widest text-outline uppercase">Año Rango</label>
                    <input type="text" formControlName="year_range" placeholder="Ej. 2018-2023" class="admin-input" />
                  </div>
                  <div class="flex flex-col gap-1.5">
                    <label class="font-rajdhani font-semibold text-[10px] tracking-widest text-outline uppercase">Categoría</label>
                    <select formControlName="type" class="admin-input">
                      <option value="">Selecciona</option>
                      <option *ngFor="let t of types" [value]="t">{{ t }}</option>
                    </select>
                  </div>
                </div>
                <div class="grid grid-cols-2 gap-4">
                  <div class="flex flex-col gap-1.5">
                    <label class="font-rajdhani font-semibold text-[10px] tracking-widest text-outline uppercase">Precio (USD)</label>
                    <input type="number" formControlName="price" placeholder="Ej. 5500" class="admin-input" />
                  </div>
                  <div class="flex flex-col gap-1.5">
                    <label class="font-rajdhani font-semibold text-[10px] tracking-widest text-outline uppercase">Etiqueta Especial (Opcional)</label>
                    <input type="text" formControlName="badge_special" placeholder="Ej. EDICIÓN ESPECIAL" class="admin-input" />
                  </div>
                </div>
              </div>
            </div>

            <!-- 2. IMAGE UPLOAD -->
            <div>
              <h3 class="font-rajdhani font-bold text-xs text-primary uppercase tracking-widest border-b border-border-hairline/30 pb-2 mb-4">Imagen del Producto (PNG)</h3>
              <div class="flex flex-col gap-3">
                <div class="flex items-center gap-4">
                  <!-- Image preview -->
                  <div class="w-24 h-20 bg-[#08060F] border border-border-hairline/60 rounded flex items-center justify-center p-2 relative overflow-hidden">
                    <img *ngIf="imagePreviewUrl" [src]="imagePreviewUrl" class="h-full w-full object-contain" />
                    <span *ngIf="!imagePreviewUrl" class="material-symbols-outlined text-outline/40 text-4xl">image</span>
                  </div>
                  <div class="flex-1 flex flex-col gap-2">
                    <label class="font-technical text-[10px] text-outline">
                      Sube una imagen con fondo transparente en formato PNG. Se almacenará de manera segura en Supabase Storage.
                    </label>
                    <input 
                      type="file" 
                      accept="image/png"
                      (change)="onFileSelected($event)"
                      class="text-xs text-outline file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20 file:cursor-pointer"
                    />
                  </div>
                </div>
              </div>
            </div>

            <!-- 3. TECHNICAL SPECIFICATIONS -->
            <div>
              <h3 class="font-rajdhani font-bold text-xs text-primary uppercase tracking-widest border-b border-border-hairline/30 pb-2 mb-4">Especificaciones Técnicas</h3>
              
              <!-- Sub-specs: Motor -->
              <h4 class="font-rajdhani font-semibold text-[11px] text-outline-variant uppercase tracking-wider mb-3">Motor y Rendimiento</h4>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div class="flex flex-col gap-1.5">
                  <label class="font-rajdhani font-semibold text-[9px] tracking-widest text-outline uppercase">Tipo de Motor</label>
                  <input type="text" formControlName="motor_tipo" placeholder="Ej. Bicilíndrico en paralelo, 4T, DOHC" class="admin-input" />
                </div>
                <div class="grid grid-cols-2 gap-4">
                  <div class="flex flex-col gap-1.5">
                    <label class="font-rajdhani font-semibold text-[9px] tracking-widest text-outline uppercase">Cilindrada (cc)</label>
                    <input type="number" formControlName="motor_cilindrada" placeholder="399" class="admin-input" />
                  </div>
                  <div class="flex flex-col gap-1.5">
                    <label class="font-rajdhani font-semibold text-[9px] tracking-widest text-outline uppercase">Potencia (CV)</label>
                    <input type="number" formControlName="motor_potencia" placeholder="45" class="admin-input" />
                  </div>
                </div>
                <div class="flex flex-col gap-1.5">
                  <label class="font-rajdhani font-semibold text-[9px] tracking-widest text-outline uppercase">Refrigeración</label>
                  <input type="text" formControlName="motor_refrigeracion" placeholder="Ej. Líquida" class="admin-input" />
                </div>
                <div class="grid grid-cols-2 gap-4">
                  <div class="flex flex-col gap-1.5">
                    <label class="font-rajdhani font-semibold text-[9px] tracking-widest text-outline uppercase">Alimentación</label>
                    <input type="text" formControlName="motor_alimentacion" placeholder="Ej. Inyección electrónica" class="admin-input" />
                  </div>
                  <div class="flex flex-col gap-1.5">
                    <label class="font-rajdhani font-semibold text-[9px] tracking-widest text-outline uppercase">Transmisión</label>
                    <input type="text" formControlName="motor_transmision" placeholder="Ej. 6 velocidades" class="admin-input" />
                  </div>
                </div>
              </div>

              <!-- Sub-specs: Chasis, Frenos, Neumáticos -->
              <h4 class="font-rajdhani font-semibold text-[11px] text-outline-variant uppercase tracking-wider mb-3">Chasis, Frenos y Ruedas</h4>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div class="flex flex-col gap-1.5">
                  <label class="font-rajdhani font-semibold text-[9px] tracking-widest text-outline uppercase">Tipo de Chasis</label>
                  <input type="text" formControlName="chasis_tipo" placeholder="Ej. Multitubular Trellis" class="admin-input" />
                </div>
                <div class="flex flex-col gap-1.5">
                  <label class="font-rajdhani font-semibold text-[9px] tracking-widest text-outline uppercase">Suspensión Delantera</label>
                  <input type="text" formControlName="chasis_delantera" placeholder="Ej. Horquilla telescópica 41mm" class="admin-input" />
                </div>
                <div class="flex flex-col gap-1.5">
                  <label class="font-rajdhani font-semibold text-[9px] tracking-widest text-outline uppercase">Suspensión Trasera</label>
                  <input type="text" formControlName="chasis_trasera" placeholder="Ej. Basculante con amortiguador" class="admin-input" />
                </div>
                <div class="grid grid-cols-2 gap-4">
                  <div class="flex flex-col gap-1.5">
                    <label class="font-rajdhani font-semibold text-[9px] tracking-widest text-outline uppercase">Freno Delantero</label>
                    <input type="text" formControlName="frenos_delantero" placeholder="Ej. Disco 310mm" class="admin-input" />
                  </div>
                  <div class="flex flex-col gap-1.5">
                    <label class="font-rajdhani font-semibold text-[9px] tracking-widest text-outline uppercase">Freno Trasero</label>
                    <input type="text" formControlName="frenos_trasero" placeholder="Ej. Disco 220mm" class="admin-input" />
                  </div>
                </div>
                <div class="grid grid-cols-2 gap-4">
                  <div class="flex flex-col gap-1.5">
                    <label class="font-rajdhani font-semibold text-[9px] tracking-widest text-outline uppercase">Neumático Delantero</label>
                    <input type="text" formControlName="neumaticos_delantero" placeholder="Ej. 110/70-17" class="admin-input" />
                  </div>
                  <div class="flex flex-col gap-1.5">
                    <label class="font-rajdhani font-semibold text-[9px] tracking-widest text-outline uppercase">Neumático Trasero</label>
                    <input type="text" formControlName="neumaticos_trasero" placeholder="Ej. 150/60-17" class="admin-input" />
                  </div>
                </div>
              </div>

              <!-- Sub-specs: Dimensiones -->
              <h4 class="font-rajdhani font-semibold text-[11px] text-outline-variant uppercase tracking-wider mb-3">Dimensiones y Peso</h4>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="grid grid-cols-2 gap-4">
                  <div class="flex flex-col gap-1.5">
                    <label class="font-rajdhani font-semibold text-[9px] tracking-widest text-outline uppercase">Peso (kg)</label>
                    <input type="number" formControlName="dim_peso" placeholder="168" class="admin-input" />
                  </div>
                  <div class="flex flex-col gap-1.5">
                    <label class="font-rajdhani font-semibold text-[9px] tracking-widest text-outline uppercase">Depósito (Litros)</label>
                    <input type="number" formControlName="dim_deposito" placeholder="14" class="admin-input" />
                  </div>
                </div>
                <div class="grid grid-cols-2 gap-4">
                  <div class="flex flex-col gap-1.5">
                    <label class="font-rajdhani font-semibold text-[9px] tracking-widest text-outline uppercase">Altura Asiento (mm)</label>
                    <input type="number" formControlName="dim_altura_asiento" placeholder="785" class="admin-input" />
                  </div>
                  <div class="flex flex-col gap-1.5">
                    <label class="font-rajdhani font-semibold text-[9px] tracking-widest text-outline uppercase">Distancia Ejes (mm)</label>
                    <input type="number" formControlName="dim_ejes" placeholder="1370" class="admin-input" />
                  </div>
                </div>
              </div>
            </div>

            <!-- Error banner -->
            <div *ngIf="modalError" class="bg-red-950/40 border border-red-500/20 text-red-400 rounded-lg p-3 text-center text-xs font-technical uppercase">
              {{ modalError }}
            </div>
          </form>

          <!-- Modal Footer -->
          <div class="flex justify-end gap-3 p-6 border-t border-border-hairline/40 bg-[#0c0a18]/60">
            <button 
              type="button" 
              (click)="closeModal()" 
              [disabled]="isSaving"
              class="btn-ghost py-2.5 px-5 text-xs tracking-widest"
            >
              CANCELAR
            </button>
            <button 
              type="button" 
              (click)="saveProduct()"
              [disabled]="productForm.invalid || isSaving"
              class="btn-primary py-2.5 px-6 text-xs tracking-widest flex items-center gap-2"
            >
              <span *ngIf="isSaving" class="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></span>
              {{ isSaving ? 'GUARDANDO...' : 'GUARDAR CAMBIOS' }}
            </button>
          </div>
        </div>
      </div>

    </div>
  `,
  styles: [`
    .admin-input {
      width: 100%;
      background-color: rgba(8, 6, 15, 0.6);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 6px;
      padding: 8px 12px;
      font-size: 13px;
      color: #E8DFEE;
    }
    .admin-input:focus {
      outline: none;
      border-color: #7C3AED;
      box-shadow: 0 0 0 1px #7C3AED;
    }
    select.admin-input {
      appearance: none;
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23ffffff'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E");
      background-repeat: no-repeat;
      background-position: right 12px center;
      background-size: 16px;
      padding-right: 36px;
    }
  `]
})
export class AdminPortalComponent implements OnInit {
  motorcycles: Motorcycle[] = [];
  brands: Brand[] = [];
  types = ['SPORT', 'NAKED', 'TRACK', 'SCOOTER', 'COMMUTER', 'OFF-ROAD'];

  productForm: FormGroup;
  isModalOpen = false;
  isEditMode = false;
  editingBikeId: string | null = null;
  
  selectedFile: File | null = null;
  imagePreviewUrl: string | null = null;
  
  isSaving = false;
  modalError = '';

  constructor(
    private fb: FormBuilder,
    private motorcycleService: MotorcycleService,
    private authService: AuthService,
    private router: Router
  ) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      brand: ['', Validators.required],
      year_range: ['', Validators.required],
      type: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
      badge_special: [''],
      
      // Spec: Motor
      motor_tipo: ['', Validators.required],
      motor_cilindrada: [0, [Validators.required, Validators.min(0)]],
      motor_refrigeracion: ['', Validators.required],
      motor_potencia: [0, [Validators.required, Validators.min(0)]],
      motor_alimentacion: ['', Validators.required],
      motor_transmision: ['', Validators.required],

      // Spec: Chasis
      chasis_tipo: ['', Validators.required],
      chasis_delantera: ['', Validators.required],
      chasis_trasera: ['', Validators.required],

      // Spec: Frenos
      frenos_delantero: ['', Validators.required],
      frenos_trasero: ['', Validators.required],

      // Spec: Neumáticos
      neumaticos_delantero: ['', Validators.required],
      neumaticos_trasero: ['', Validators.required],

      // Spec: Dimensiones
      dim_peso: [0, [Validators.required, Validators.min(0)]],
      dim_deposito: [0, [Validators.required, Validators.min(0)]],
      dim_altura_asiento: [0, [Validators.required, Validators.min(0)]],
      dim_ejes: [0, [Validators.required, Validators.min(0)]]
    });
  }

  ngOnInit(): void {
    this.loadInventory();
    this.brands = this.motorcycleService.getBrands();
  }

  loadInventory(): void {
    this.motorcycleService.getAllAdmin().subscribe(motos => {
      this.motorcycles = motos;
    });
  }

  async adjustStock(bike: Motorcycle, change: number): Promise<void> {
    const newStock = Math.max(0, (bike.stock || 0) + change);
    // If stock reaches 0, we can soft-ocultar it as well, or just change stock
    const updates: Partial<Motorcycle> = { stock: newStock };
    const res = await this.motorcycleService.update(bike.id, updates);
    if (res.success) {
      bike.stock = newStock;
    } else {
      alert('Error actualizando stock: ' + res.error);
    }
  }

  async toggleVisibility(bike: Motorcycle): Promise<void> {
    const newVisibility = !bike.visible;
    const updates: Partial<Motorcycle> = { visible: newVisibility };
    const res = await this.motorcycleService.update(bike.id, updates);
    if (res.success) {
      bike.visible = newVisibility;
    } else {
      alert('Error cambiando visibilidad: ' + res.error);
    }
  }

  async softDelete(bike: Motorcycle): Promise<void> {
    if (confirm(`¿Estás seguro de desactivar/ocultar el modelo ${bike.name}? Se marcará con stock = 0 y no será visible para los clientes.`)) {
      const res = await this.motorcycleService.delete(bike.id);
      if (res.success) {
        bike.visible = false;
        bike.stock = 0;
      } else {
        alert('Error al desactivar el modelo: ' + res.error);
      }
    }
  }

  openModal(bike: Motorcycle | null): void {
    this.modalError = '';
    this.selectedFile = null;
    
    if (bike) {
      this.isEditMode = true;
      this.editingBikeId = bike.id;
      this.imagePreviewUrl = bike.image;
      
      this.productForm.patchValue({
        name: bike.name,
        brand: bike.brand,
        year_range: bike.year_range,
        type: bike.type,
        price: bike.price,
        badge_special: bike.badge_special || '',
        
        motor_tipo: bike.specs.motor.tipo,
        motor_cilindrada: bike.specs.motor.cilindrada_cc,
        motor_refrigeracion: bike.specs.motor.refrigeracion,
        motor_potencia: bike.specs.motor.potencia_cv,
        motor_alimentacion: bike.specs.motor.alimentacion,
        motor_transmision: bike.specs.motor.transmision,

        chasis_tipo: bike.specs.chasis.tipo,
        chasis_delantera: bike.specs.chasis.suspension_delantera,
        chasis_trasera: bike.specs.chasis.suspension_trasera,

        frenos_delantero: bike.specs.frenos.delantero,
        frenos_trasero: bike.specs.frenos.trasero,

        neumaticos_delantero: bike.specs.neumaticos.delantero,
        neumaticos_trasero: bike.specs.neumaticos.trasero,

        dim_peso: bike.specs.dimensiones.peso_kg || bike.specs.dimensiones.peso_marcha_kg || bike.specs.dimensiones.peso_seco_kg || 0,
        dim_deposito: bike.specs.dimensiones.deposito_litros,
        dim_altura_asiento: bike.specs.dimensiones.altura_asiento_mm,
        dim_ejes: bike.specs.dimensiones.distancia_ejes_mm
      });
    } else {
      this.isEditMode = false;
      this.editingBikeId = null;
      this.imagePreviewUrl = null;
      this.productForm.reset({
        price: 0,
        motor_cilindrada: 0,
        motor_potencia: 0,
        dim_peso: 0,
        dim_deposito: 0,
        dim_altura_asiento: 0,
        dim_ejes: 0
      });
    }

    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreviewUrl = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  async saveProduct(): Promise<void> {
    if (this.productForm.invalid) return;

    this.isSaving = true;
    this.modalError = '';

    try {
      const formVal = this.productForm.value;
      
      // Determine image URL
      let imageUrl = this.imagePreviewUrl || '';
      
      if (this.selectedFile) {
        // Upload new image to storage
        const cleanName = `${formVal.brand}-${formVal.name}`.toLowerCase().replace(/[^a-z0-9]/g, '-');
        imageUrl = await this.motorcycleService.uploadProductImage(this.selectedFile, cleanName);
      }

      if (!imageUrl) {
        this.modalError = 'Debes subir una imagen para el producto.';
        this.isSaving = false;
        return;
      }

      // Structure specs JSONB
      const specs = {
        motor: {
          tipo: formVal.motor_tipo,
          cilindrada_cc: formVal.motor_cilindrada,
          refrigeracion: formVal.motor_refrigeracion,
          potencia_cv: formVal.motor_potencia,
          alimentacion: formVal.motor_alimentacion,
          transmision: formVal.motor_transmision
        },
        chasis: {
          tipo: formVal.chasis_tipo,
          suspension_delantera: formVal.chasis_delantera,
          suspension_trasera: formVal.chasis_trasera
        },
        frenos: {
          delantero: formVal.frenos_delantero,
          trasero: formVal.frenos_trasero
        },
        neumaticos: {
          delantero: formVal.neumaticos_delantero,
          trasero: formVal.neumaticos_trasero
        },
        dimensiones: {
          peso_kg: formVal.dim_peso,
          deposito_litros: formVal.dim_deposito,
          altura_asiento_mm: formVal.dim_altura_asiento,
          distancia_ejes_mm: formVal.dim_ejes
        }
      };

      const bikeData: any = {
        name: formVal.name,
        brand: formVal.brand,
        year_range: formVal.year_range,
        type: formVal.type,
        price: formVal.price,
        badge_special: formVal.badge_special || null,
        image: imageUrl,
        specs: specs
      };

      if (this.isEditMode && this.editingBikeId) {
        const res = await this.motorcycleService.update(this.editingBikeId, bikeData);
        if (res.success) {
          this.loadInventory();
          this.closeModal();
        } else {
          this.modalError = res.error || 'Error al actualizar.';
        }
      } else {
        // Create mode defaults
        bikeData.stock = 1;
        bikeData.visible = true;
        
        const res = await this.motorcycleService.create(bikeData);
        if (res.success) {
          this.loadInventory();
          this.closeModal();
        } else {
          this.modalError = res.error || 'Error al guardar.';
        }
      }
    } catch (err: any) {
      this.modalError = err.message || 'Error inesperado.';
    } finally {
      this.isSaving = false;
    }
  }
}
