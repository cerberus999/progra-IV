import { Injectable } from '@angular/core';
import { Observable, of, lastValueFrom } from 'rxjs';
import { map, shareReplay, catchError } from 'rxjs/operators';
import { Motorcycle } from '../models/motorcycle.model';
import { Brand } from '../models/brand.model';
import { CatalogApiService } from './catalog-api.service';
import { AdminApiService } from './admin-api.service';
import { adaptMotoResponse } from './moto-adapter';
import { MotoResponseDto, MotoRequestDto } from '../models/api-response.model';

function extractNumericId(id: string): number {
  return parseInt(id.replace('moto-', ''), 10);
}

function motoToRequestDto(bike: Partial<Motorcycle> & { name?: string; brand?: string }): Partial<MotoRequestDto> {
  const s = bike.specs;
  return {
    idDistribuidor: 1,
    marca: bike.brand ?? '',
    modelo: bike.name ?? '',
    año: bike.year_range ? parseInt(bike.year_range, 10) : new Date().getFullYear(),
    tipo: bike.type ?? '',
    cilindradaCc: s?.motor?.cilindrada_cc ?? null,
    precioImportacion: bike.price ?? 0,
    precioVenta: bike.price ?? 0,
    stock: bike.stock ?? 0,
    color: null,
    imagenUrl: bike.image ?? null,
    estado: bike.visible === false ? 'oculto' : 'disponible',
    refrigeracion: s?.motor?.refrigeracion ?? null,
    potenciaCv: s?.motor?.potencia_cv ?? null,
    potenciaRpm: s?.motor?.potencia_rpm ?? null,
    torqueNm: s?.motor?.torque_nm ?? null,
    torqueRpm: s?.motor?.torque_rpm ?? null,
    alimentacion: s?.motor?.alimentacion ?? null,
    transmision: s?.motor?.transmision ?? null,
    velocidadMaxKmh: s?.motor?.velocidad_max_kmh ?? null,
    diametroCarrera: s?.motor?.diametro_carrera ?? null,
    relacionCompresion: s?.motor?.relacion_compresion ?? null,
    potenciaRamAirCv: s?.motor?.potencia_con_ram_air_cv ?? null,
    arranque: s?.motor?.arranque ?? null,
    chasisTipo: s?.chasis?.tipo ?? null,
    suspensionDelantera: s?.chasis?.suspension_delantera ?? null,
    suspensionTrasera: s?.chasis?.suspension_trasera ?? null,
    amortiguadorDireccion: s?.chasis?.amortiguador_direccion ?? null,
    frenoDelantero: s?.frenos?.delantero ?? null,
    frenoTrasero: s?.frenos?.trasero ?? null,
    frenoAsistencia: s?.frenos?.asistencia ?? null,
    neumaticoDelantero: s?.neumaticos?.delantero ?? null,
    neumaticoTrasero: s?.neumaticos?.trasero ?? null,
    pesoKg: s?.dimensiones?.peso_kg ?? null,
    pesoSecoKg: s?.dimensiones?.peso_seco_kg ?? null,
    pesoMarchaKg: s?.dimensiones?.peso_marcha_kg ?? null,
    depositoLitros: s?.dimensiones?.deposito_litros ?? null,
    alturaAsientoMm: s?.dimensiones?.altura_asiento_mm ?? null,
    distanciaEjesMm: s?.dimensiones?.distancia_ejes_mm ?? null,
    distanciaSueloMm: s?.dimensiones?.distancia_suelo_mm ?? null,
    maleteroLitros: s?.dimensiones?.maletero_litros ?? null,
    electronica: s?.electronica?.join(',') ?? null
  };
}

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
  private allAdminMotorcycles$: Observable<Motorcycle[]>;

  constructor(
    private api: CatalogApiService,
    private adminApi: AdminApiService
  ) {
    this.allMotorcycles$ = this.api.getAll().pipe(
      map(dtos => dtos.map(adaptMotoResponse)),
      catchError(() => of([] as Motorcycle[])),
      shareReplay(1)
    );

    this.allAdminMotorcycles$ = this.adminApi.getAllMotos().pipe(
      map(dtos => dtos.map(adaptMotoResponse)),
      catchError(() => of([] as Motorcycle[])),
      shareReplay(1)
    );
  }

  getAll(): Observable<Motorcycle[]> {
    return this.allMotorcycles$;
  }

  getAllAdmin(): Observable<Motorcycle[]> {
    return this.allAdminMotorcycles$;
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

  // =========================================================
  // ADMIN CRUD OPERATIONS
  // =========================================================

  async uploadProductImage(file: File, _filename: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = () => reject(new Error('Error al leer la imagen'));
      reader.readAsDataURL(file);
    });
  }

  async create(bike: Partial<Motorcycle> & { name: string; brand: string }): Promise<{ success: boolean; error?: string }> {
    try {
      const dto = motoToRequestDto(bike) as MotoRequestDto;
      await lastValueFrom(this.adminApi.createMoto(dto));
      this.refreshCache();
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.error?.message || err.message || 'Error al crear' };
    }
  }

  async update(id: string, updates: Partial<Motorcycle>): Promise<{ success: boolean; error?: string }> {
    try {
      const numericId = extractNumericId(id);
      const current = await lastValueFrom(this.adminApi.getMotoById(numericId));
      const merged = { ...motoToRequestDto(updates), idDistribuidor: current.idDistribuidor, marca: current.marca, modelo: current.modelo, año: current.año } as MotoRequestDto;
      const dto: MotoRequestDto = {
        ...merged,
        marca: updates.brand ?? current.marca,
        modelo: (updates as any).name ?? current.modelo,
        año: updates.year_range ? parseInt(updates.year_range, 10) : current.año,
        precioVenta: updates.price ?? current.precioVenta,
        stock: updates.stock ?? current.stock,
        imagenUrl: updates.image ?? current.imagenUrl,
        estado: updates.visible === false ? 'oculto' : updates.visible === true ? 'disponible' : current.estado
      };
      await lastValueFrom(this.adminApi.updateMoto(numericId, dto));
      this.refreshCache();
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.error?.message || err.message || 'Error al actualizar' };
    }
  }

  async delete(id: string): Promise<{ success: boolean; error?: string }> {
    try {
      const numericId = extractNumericId(id);
      const current = await lastValueFrom(this.adminApi.getMotoById(numericId));
      const dto = motoToRequestDto(current) as MotoRequestDto;
      dto.stock = 0;
      dto.estado = 'oculto';
      await lastValueFrom(this.adminApi.updateMoto(numericId, dto));
      this.refreshCache();
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.error?.message || err.message || 'Error al eliminar' };
    }
  }

  private refreshCache(): void {
    this.allMotorcycles$ = this.api.getAll().pipe(
      map(dtos => dtos.map(adaptMotoResponse)),
      catchError(() => of([] as Motorcycle[])),
      shareReplay(1)
    );
    this.allAdminMotorcycles$ = this.adminApi.getAllMotos().pipe(
      map(dtos => dtos.map(adaptMotoResponse)),
      catchError(() => of([] as Motorcycle[])),
      shareReplay(1)
    );
  }
}
