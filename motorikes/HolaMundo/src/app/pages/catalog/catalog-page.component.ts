import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MotorcycleService } from '../../core/services/motorcycle.service';
import { FilterService, FilterState } from '../../core/services/filter.service';
import { Motorcycle } from '../../core/models/motorcycle.model';
import { CatalogFilterComponent } from './catalog-filter/catalog-filter.component';
import { MotorcycleCardComponent } from '../../shared/components/motorcycle-card/motorcycle-card.component';
import { LoadingSkeletonComponent } from '../../shared/components/loading-skeleton/loading-skeleton.component';
import { ScrollRevealDirective } from '../../core/directives/scroll-reveal.directive';

@Component({
  selector: 'app-catalog-page',
  standalone: true,
  imports: [
    CommonModule, 
    CatalogFilterComponent, 
    MotorcycleCardComponent, 
    LoadingSkeletonComponent,
    ScrollRevealDirective
  ],
  templateUrl: './catalog-page.component.html',
  styles: []
})
export class CatalogPageComponent implements OnInit, OnDestroy {
  allMotorcycles: Motorcycle[] = [];
  filteredMotorcycles: Motorcycle[] = [];
  isLoading = false;

  activeFilters: FilterState = {
    brands: [],
    types: [],
    minCilindrada: null,
    maxCilindrada: null,
    minPotencia: null,
    maxPotencia: null,
    minPrice: null,
    maxPrice: null
  };
  hasActiveFilters = false;
  debugLogs: string[] = [];

  private sub = new Subscription();
  private isFirstFilter = true;

  constructor(
    private motorcycleService: MotorcycleService,
    private filterService: FilterService,
    private route: ActivatedRoute,
    private router: Router,
    private cdr: ChangeDetectorRef,
  ) { }

  log(msg: string): void {
    const timestamp = new Date().toISOString().substring(11, 19);
    this.debugLogs.push(`[${timestamp}] ${msg}`);
    console.log(`[${timestamp}] ${msg}`);
  }

  ngOnInit(): void {
    this.motorcycleService.getAll().subscribe(motos => {
      this.allMotorcycles = motos;
      this.log(`Loaded ${motos.length} motorcycles from service`);
      this.initFiltersFromUrlAndSubscribe();
      this.cdr.markForCheck();
    });
  }

  private initFiltersFromUrlAndSubscribe(): void {
    const queryParams = this.route.snapshot.queryParams;
    const initialSearch = queryParams['search'] ?? '';
    const initialBrands = queryParams['marca'] ? queryParams['marca'].split(',') : [];
    const initialTypes = queryParams['tipo'] ? queryParams['tipo'].split(',') : [];
    const initialMaxCc = queryParams['max_cc'] ? parseInt(queryParams['max_cc'], 10) : null;
    const initialMaxCv = queryParams['max_cv'] ? parseInt(queryParams['max_cv'], 10) : null;
    const initialMinPrice = queryParams['min_price'] ? parseInt(queryParams['min_price'], 10) : null;
    const initialMaxPrice = queryParams['max_price'] ? parseInt(queryParams['max_price'], 10) : null;

    const initial: FilterState = {
      searchTerm: initialSearch,
      brands: initialBrands,
      types: initialTypes,
      maxCilindrada: initialMaxCc,
      maxPotencia: initialMaxCv,
      minCilindrada: null,
      minPotencia: null,
      minPrice: initialMinPrice,
      maxPrice: initialMaxPrice
    };

    this.executeFilterLogic(initial);
    this.activeFilters = initial;
    this.hasActiveFilters = this.computeHasActiveFilters(initial);

    this.filterService.updateFilters(initial);

    this.sub.add(
      this.filterService.filters$.subscribe(state => {
        if (this.isFirstFilter) {
          this.isFirstFilter = false;
          return;
        }

        this.activeFilters = state;
        this.hasActiveFilters = this.computeHasActiveFilters(state);

        this.executeFilterLogic(state);
        this.syncFiltersToUrl(state);
        this.cdr.markForCheck();
      })
    );
  }

  private computeHasActiveFilters(state: FilterState): boolean {
    return (
      state.searchTerm !== '' ||
      state.brands.length > 0 ||
      state.types.length > 0 ||
      state.maxCilindrada !== null ||
      state.maxPotencia !== null ||
      state.minPrice !== null ||
      state.maxPrice !== null
    );
  }

  private executeFilterLogic(state: FilterState): void {
    const searchLower = state.searchTerm.toLowerCase().trim();
    this.filteredMotorcycles = this.allMotorcycles.filter(moto => {
      // Model name search (case-insensitive)
      if (searchLower !== '' && !moto.name.toLowerCase().includes(searchLower)) {
        return false;
      }

      // Brand filter
      if (state.brands && state.brands.length > 0 && !state.brands.includes(moto.brand)) {
        return false;
      }
      
      // Type filter
      if (state.types && state.types.length > 0 && !state.types.includes(moto.type.toUpperCase())) {
        return false;
      }

      // Displacement filter
      if (state.maxCilindrada !== null && state.maxCilindrada < 1100 && moto.specs.motor.cilindrada_cc > state.maxCilindrada) {
        return false;
      }

      // Horsepower filter
      if (state.maxPotencia !== null && state.maxPotencia < 320 && moto.specs.motor.potencia_cv > state.maxPotencia) {
        return false;
      }

      // Price range
      const price = moto.price ?? 0;
      if (state.minPrice !== null && price < state.minPrice) {
        return false;
      }
      if (state.maxPrice !== null && price > state.maxPrice) {
        return false;
      }

      return true;
    });
  }

  private syncFiltersToUrl(state: FilterState): void {
    const queryParams: any = {};

    if (state.searchTerm) {
      queryParams.search = state.searchTerm;
    }
    if (state.brands.length > 0) {
      queryParams.marca = state.brands.join(',');
    }
    if (state.types && state.types.length > 0) {
      queryParams.tipo = state.types.join(',');
    }
    if (state.maxCilindrada !== null && state.maxCilindrada < 1100) {
      queryParams.max_cc = state.maxCilindrada;
    }
    if (state.maxPotencia !== null && state.maxPotencia < 320) {
      queryParams.max_cv = state.maxPotencia;
    }
    if (state.minPrice !== null) {
      queryParams.min_price = state.minPrice;
    }
    if (state.maxPrice !== null) {
      queryParams.max_price = state.maxPrice;
    }

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams,
      replaceUrl: true
    });
  }

  removeSearch(): void {
    this.filterService.setSearchTerm('');
  }

  removeBrand(brand: string): void {
    this.filterService.toggleBrand(brand);
  }

  removeType(type: string): void {
    this.filterService.toggleType(type);
  }

  removeCilindrada(): void {
    this.filterService.updateFilters({ maxCilindrada: null });
  }

  removePotencia(): void {
    this.filterService.updateFilters({ maxPotencia: null });
  }

  removeMinPrice(): void {
    this.filterService.updateFilters({ minPrice: null });
  }

  removeMaxPrice(): void {
    this.filterService.updateFilters({ maxPrice: null });
  }

  clearFilters(): void {
    this.filterService.resetFilters();
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
