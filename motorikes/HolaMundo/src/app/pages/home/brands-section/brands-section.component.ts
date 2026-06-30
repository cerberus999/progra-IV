import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { MotorcycleService } from '../../../core/services/motorcycle.service';
import { Brand } from '../../../core/models/brand.model';
import { SectionHeaderComponent } from '../../../shared/components/section-header/section-header.component';
import { ScrollRevealDirective } from '../../../core/directives/scroll-reveal.directive';

@Component({
  selector: 'app-brands-section',
  standalone: true,
  imports: [CommonModule, RouterModule, SectionHeaderComponent, ScrollRevealDirective],
  templateUrl: './brands-section.component.html',
  styles: []
})
export class BrandsSectionComponent implements OnInit {
  brands: Brand[] = [];
  selectedBrandSlug: string | null = null;
  isExiting = false;

  constructor(
    private motorcycleService: MotorcycleService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.brands = this.motorcycleService.getBrands();
  }

  navigateToBrand(slug: string): void {
    if (this.isExiting) return;
    this.selectedBrandSlug = slug;
    this.isExiting = true;

    // Staggered exit animation: wait 400ms before navigating
    setTimeout(() => {
      this.router.navigate(['/catalogo'], { queryParams: { marca: slug } });
    }, 400);
  }
}
