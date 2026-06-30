import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Motorcycle } from '../../../core/models/motorcycle.model';
import { BrandBadgeComponent } from '../brand-badge/brand-badge.component';
import { PriceFormatPipe } from '../../pipes/price-format.pipe';

@Component({
  selector: 'app-motorcycle-card',
  standalone: true,
  imports: [CommonModule, RouterLink, BrandBadgeComponent, PriceFormatPipe],
  template: `
    <div 
      class="glass-panel group rounded-xl border border-border-hairline overflow-hidden flex flex-col justify-between h-[510px]"
      [class.h-[380px]]="compact"
    >
      <!-- Image area -->
      <div class="h-56 bg-[#08060F] relative flex items-center justify-center p-6 overflow-hidden border-b border-border-white-faint">
        <!-- Floating details -->
        <div class="absolute top-3 left-3 z-10 flex flex-col gap-1.5">
          <app-brand-badge [brand]="motorcycle.brand"></app-brand-badge>
          <span class="text-[10px] uppercase font-technical bg-surface-glass border border-outline-variant/30 text-on-surface-variant px-2 py-0.5 rounded-full backdrop-blur-md">
            {{ motorcycle.type }}
          </span>
        </div>
        


        <img 
          [src]="motorcycle.image" 
          [alt]="motorcycle.name"
          class="h-full w-full object-contain transform group-hover:scale-105 transition-transform duration-700 ease-out"
        />
        
        <!-- Hover shadow glow -->
        <div class="absolute inset-0 bg-gradient-to-t from-background/30 to-transparent pointer-events-none"></div>
      </div>

      <!-- Info area -->
      <div class="p-5 flex-1 flex flex-col justify-between">
        <div>
          <!-- Model Name & Year -->
          <div class="flex justify-between items-start gap-2 mb-1.5">
            <h3 class="font-headline-md text-2xl text-on-surface uppercase font-bold group-hover:text-primary transition-colors duration-300 line-clamp-1">
              {{ motorcycle.name }}
            </h3>
            <span class="font-label-sm text-outline text-[11px] mt-1">{{ motorcycle.year_range.split('–')[0] }}</span>
          </div>

          <!-- Price -->
          <div class="text-primary font-rajdhani font-semibold text-lg tracking-wider mb-4">
            {{ motorcycle.price | priceFormat }}
          </div>

          <!-- Key specs grid (hidden in compact) -->
          <div *ngIf="!compact" class="grid grid-cols-2 gap-x-4 gap-y-3.5 mb-6 border-t border-border-hairline/50 pt-4">
            <!-- Cylinder capacity -->
            <div class="flex items-center gap-2">
              <span class="material-symbols-outlined text-outline text-lg">settings_input_component</span>
              <div class="flex flex-col">
                <span class="font-label-sm text-[10px] text-outline uppercase tracking-wider">MOTOR</span>
                <span class="font-body-md text-xs text-on-surface font-semibold">
                  {{ motorcycle.specs.motor.cilindrada_cc }}cc ({{ motorcycle.specs.motor.tipo.includes('4 cilindros') ? '4 cil' : (motorcycle.specs.motor.tipo.includes('Bicilíndrico') ? '2 cil' : '1 cil') }})
                </span>
              </div>
            </div>
            <!-- Power -->
            <div class="flex items-center gap-2">
              <span class="material-symbols-outlined text-outline text-lg">bolt</span>
              <div class="flex flex-col">
                <span class="font-label-sm text-[10px] text-outline uppercase tracking-wider">POTENCIA</span>
                <span class="font-body-md text-xs text-on-surface font-semibold">
                  {{ motorcycle.specs.motor.potencia_cv }} CV
                </span>
              </div>
            </div>
            <!-- Torque -->
            <div class="flex items-center gap-2">
              <span class="material-symbols-outlined text-outline text-lg">swap_driving_apps_wheel</span>
              <div class="flex flex-col">
                <span class="font-label-sm text-[10px] text-outline uppercase tracking-wider">TORQUE</span>
                <span class="font-body-md text-xs text-on-surface font-semibold">
                  {{ motorcycle.specs.motor.torque_nm ? motorcycle.specs.motor.torque_nm + ' Nm' : 'N/D' }}
                </span>
              </div>
            </div>
            <!-- Weight -->
            <div class="flex items-center gap-2">
              <span class="material-symbols-outlined text-outline text-lg">weight</span>
              <div class="flex flex-col">
                <span class="font-label-sm text-[10px] text-outline uppercase tracking-wider">PESO</span>
                <span class="font-body-md text-xs text-on-surface font-semibold">
                  {{ motorcycle.specs.dimensiones.peso_kg || motorcycle.specs.dimensiones.peso_marcha_kg || motorcycle.specs.dimensiones.peso_seco_kg }} kg
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- CTA -->
        <a 
          [routerLink]="['/moto', motorcycle.slug]"
          class="btn-ghost w-full py-2.5 text-center text-xs tracking-widest flex items-center justify-center gap-1.5 group-hover:bg-primary group-hover:text-on-primary group-hover:border-primary transition-all duration-300"
        >
          VER DETALLE
          <span class="material-symbols-outlined text-sm transform group-hover:translate-x-1 transition-transform duration-300">arrow_forward</span>
        </a>
      </div>
    </div>
  `
})
export class MotorcycleCardComponent {
  @Input() motorcycle!: Motorcycle;
  @Input() compact = false;
}
