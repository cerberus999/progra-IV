import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Subscription, forkJoin } from 'rxjs';
import { MotorcycleService } from '../../core/services/motorcycle.service';
import { Motorcycle } from '../../core/models/motorcycle.model';
import { BrandBadgeComponent } from '../../shared/components/brand-badge/brand-badge.component';
import { SpecPanelComponent } from './spec-panel/spec-panel.component';
import { BottomNavComponent } from './bottom-nav/bottom-nav.component';
import { PriceFormatPipe } from '../../shared/pipes/price-format.pipe';

@Component({
  selector: 'app-model-detail',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    BrandBadgeComponent,
    SpecPanelComponent,
    BottomNavComponent,
    PriceFormatPipe
  ],
  templateUrl: './model-detail.component.html',
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class ModelDetailComponent implements OnInit, OnDestroy {
  motorcycle: Motorcycle | undefined;
  adjacentModels: { prev: Motorcycle | null; next: Motorcycle | null } = { prev: null, next: null };
  currentIndex = 0;
  totalCount = 0;

  private sub = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private motorcycleService: MotorcycleService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    // Subscribe to param changes so navigating prev/next reloads the component data
    this.sub.add(
      this.route.params.subscribe(params => {
        const slug = params['slug'];
        if (slug) {
          this.loadMotorcycle(slug);
        }
      })
    );
  }

  private loadMotorcycle(slug: string): void {
    this.sub.add(
      this.motorcycleService.getBySlug(slug).subscribe(moto => {
        this.motorcycle = moto;
        this.cdr.detectChanges();

        if (moto) {
          this.sub.add(
            forkJoin([
              this.motorcycleService.getAdjacentModels(moto.id),
              this.motorcycleService.getAll()
            ]).subscribe(([adjacent, all]) => {
              this.adjacentModels = adjacent;
              this.totalCount = all.length;
              this.currentIndex = all.findIndex(m => m.id === moto.id);
              this.cdr.detectChanges();
            })
          );
        }

        if (typeof window !== 'undefined') {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
