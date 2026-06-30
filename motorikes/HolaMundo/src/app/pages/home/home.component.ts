import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroSectionComponent } from './hero-section/hero-section.component';
import { BrandsSectionComponent } from './brands-section/brands-section.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    HeroSectionComponent,
    BrandsSectionComponent
  ],
  template: `
    <div class="relative w-full">
      <!-- Landing Page sections -->
      <app-hero-section></app-hero-section>
      <app-brands-section></app-brands-section>
    </div>
  `
})
export class HomeComponent { }
