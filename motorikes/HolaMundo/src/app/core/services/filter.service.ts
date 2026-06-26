import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface FilterState {
  searchTerm: string;
  brands: string[];
  types: string[];
  minCilindrada: number | null;
  maxCilindrada: number | null;
  minPotencia: number | null;
  maxPotencia: number | null;
  minPrice: number | null;
  maxPrice: number | null;
}

const initialFilterState: FilterState = {
  searchTerm: '',
  brands: [],
  types: [],
  minCilindrada: null,
  maxCilindrada: null,
  minPotencia: null,
  maxPotencia: null,
  minPrice: null,
  maxPrice: null
};

@Injectable({
  providedIn: 'root'
})
export class FilterService {
  private filterStateSubject = new BehaviorSubject<FilterState>(initialFilterState);
  
  // Observable of the filter state
  filters$: Observable<FilterState> = this.filterStateSubject.asObservable();

  constructor() { }

  /**
   * Get the current filter state value.
   */
  getSnapshot(): FilterState {
    return this.filterStateSubject.value;
  }

  /**
   * Update the entire filter state.
   */
  updateFilters(newState: Partial<FilterState>): void {
    this.filterStateSubject.next({
      ...this.filterStateSubject.value,
      ...newState
    });
  }

  /**
   * Reset all filters back to initial empty state.
   */
  resetFilters(): void {
    this.filterStateSubject.next(initialFilterState);
  }

  /**
   * Helper to toggle a brand filter.
   */
  toggleBrand(brand: string): void {
    const current = this.filterStateSubject.value.brands;
    const index = current.indexOf(brand);
    let updated: string[];
    
    if (index === -1) {
      updated = [...current, brand];
    } else {
      updated = current.filter(b => b !== brand);
    }
    
    this.updateFilters({ brands: updated });
  }

  /**
   * Helper to toggle a motorcycle type filter.
   */
  toggleType(type: string): void {
    const current = this.filterStateSubject.value.types;
    const index = current.indexOf(type);
    let updated: string[];
    
    if (index === -1) {
      updated = [...current, type];
    } else {
      updated = current.filter(t => t !== type);
    }
    
    this.updateFilters({ types: updated });
  }

  /**
   * Helper to set search term for model name filter.
   */
  setSearchTerm(term: string): void {
    this.updateFilters({ searchTerm: term });
  }
}
