import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, shareReplay, catchError } from 'rxjs/operators';
import { Motorcycle } from '../models/motorcycle.model';
import { Brand } from '../models/brand.model';
import { CatalogApiService } from './catalog-api.service';
import { adaptMotoResponse } from './moto-adapter';

@Injectable({
  providedIn: 'root'
})
export class MotorcycleService {

  private readonly brands: Brand[] = [
    {
      id: 'brand-kawasaki',
      name: 'Kawasaki',
      slug: 'kawasaki',
      description: 'Ingeniería extrema y sobrealimentación en circuito. El verde característico de la deportividad pura sin compromisos.',
      logoText: 'KAWASAKI',
      colorAccent: '#39FF14',
      bgAccent: 'rgba(57, 255, 20, 0.1)'
    },
    {
      id: 'brand-honda',
      name: 'Honda',
      slug: 'honda',
      description: 'Fiabilidad legendaria, control total y eficiencia tecnológica que lidera la movilidad a nivel global.',
      logoText: 'HONDA',
      colorAccent: '#CC0000',
      bgAccent: 'rgba(204, 0, 0, 0.1)'
    },
    {
      id: 'brand-yamaha',
      name: 'Yamaha',
      slug: 'yamaha',
      description: 'Conexión emocional y revolución de sensaciones mediante motores Crossplane inspirados en MotoGP.',
      logoText: 'YAMAHA',
      colorAccent: '#003087',
      bgAccent: 'rgba(0, 48, 135, 0.1)'
    },
    {
      id: 'brand-suzuki',
      name: 'Suzuki',
      slug: 'suzuki',
      description: 'Poder equilibrado y precisión japonesa de competición concebida para dominar tanto el asfalto como la tierra.',
      logoText: 'SUZUKI',
      colorAccent: '#E8840B',
      bgAccent: 'rgba(232, 132, 11, 0.1)'
    }
  ];

  private allMotorcycles$: Observable<Motorcycle[]>;

  constructor(private api: CatalogApiService) {
    this.allMotorcycles$ = this.api.getAll().pipe(
      map(dtos => dtos.map(adaptMotoResponse)),
      catchError(() => of([] as Motorcycle[])),
      shareReplay(1)
    );
  }

  getAll(): Observable<Motorcycle[]> {
    return this.allMotorcycles$;
  }

  getByBrand(brand: string): Observable<Motorcycle[]> {
    return this.allMotorcycles$.pipe(
      map(motos => motos.filter(
        m => m.brand.toLowerCase() === brand.toLowerCase()
      ))
    );
  }

  getBySlug(slug: string): Observable<Motorcycle | undefined> {
    return this.allMotorcycles$.pipe(
      map(motos => motos.find(m => m.slug === slug))
    );
  }

  getByType(type: string): Observable<Motorcycle[]> {
    return this.allMotorcycles$.pipe(
      map(motos => motos.filter(
        m => m.type.toUpperCase() === type.toUpperCase()
      ))
    );
  }

  getBrands(): Brand[] {
    return this.brands;
  }

  getBrandBySlug(slug: string): Brand | undefined {
    return this.brands.find(b => b.slug === slug);
  }

  getAdjacentModels(currentId: string): Observable<{ prev: Motorcycle | null; next: Motorcycle | null }> {
    return this.allMotorcycles$.pipe(
      map(motos => {
        const index = motos.findIndex(m => m.id === currentId);
        if (index === -1) {
          return { prev: null, next: null };
        }
        const prev = index > 0 ? motos[index - 1] : motos[motos.length - 1];
        const next = index < motos.length - 1 ? motos[index + 1] : motos[0];
        return { prev, next };
      })
    );
  }
}
