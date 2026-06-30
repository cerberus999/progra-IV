import { TestBed } from '@angular/core/testing';
import { CatalogPageComponent } from './catalog-page.component';
import { provideRouter, ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { MotorcycleService } from '../../core/services/motorcycle.service';
import { FilterService } from '../../core/services/filter.service';

describe('CatalogPageComponent', () => {
  let motorcycleServiceMock: any;
  let filterServiceMock: any;
  let routeMock: any;

  beforeEach(async () => {
    motorcycleServiceMock = {
      getAll: () => of([
        {
          id: 'test-01',
          slug: 'test-slug-1',
          name: 'Test Bike 1',
          brand: 'kawasaki',
          type: 'NAKED',
          year_range: '2020–2021',
          price: 5000,
          specs: {
            motor: {
              tipo: '4 cilindros',
              cilindrada_cc: 750,
              potencia_cv: 100
            },
            dimensiones: {
              peso_kg: 200
            }
          }
        }
      ]),
      getBrands: () => [
        { id: '1', name: 'Kawasaki', slug: 'kawasaki' }
      ]
    };

    routeMock = {
      snapshot: {
        queryParams: {}
      }
    };

    await TestBed.configureTestingModule({
      imports: [CatalogPageComponent],
      providers: [
        { provide: MotorcycleService, useValue: motorcycleServiceMock },
        { provide: ActivatedRoute, useValue: routeMock },
        provideRouter([])
      ]
    }).compileComponents();
  });

  it('should create and load all motorcycles', () => new Promise<void>(resolve => {
    const fixture = TestBed.createComponent(CatalogPageComponent);
    const component = fixture.componentInstance;
    
    // Trigger ngOnInit
    fixture.detectChanges();
    
    setTimeout(() => {
      try {
        fixture.detectChanges();
        expect(component.allMotorcycles.length).toBe(1);
        expect(component.filteredMotorcycles.length).toBe(1);
        expect(component.isLoading).toBe(false);
        resolve();
      } catch (err) {
        console.error('Test assertion failed:', err);
        throw err;
      }
    }, 350);
  }));
});
