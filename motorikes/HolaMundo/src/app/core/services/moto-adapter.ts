import { Motorcycle, MotorcycleSpecs } from '../models/motorcycle.model';
import { MotoResponseDto } from '../models/api-response.model';

export function adaptMotoResponse(dto: MotoResponseDto): Motorcycle {
  const s = dto.especificaciones;
  const name = `${dto.marca} ${dto.modelo}`;
  const slug = name
    .toLowerCase()
    .replace(/[/,]/g, '')
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '');

  const specs: MotorcycleSpecs = {
    motor: {
      tipo: s?.alimentacion
        ? `${dto.tipo ?? ''}, ${s.alimentacion ?? ''}`.replace(/^, /, '')
        : (dto.tipo ?? ''),
      cilindrada_cc: dto.cilindradaCc ?? 0,
      refrigeracion: s?.refrigeracion ?? '',
      potencia_cv: s?.potenciaCv ?? 0,
      potencia_rpm: s?.potenciaRpm ?? undefined,
      torque_nm: s?.torqueNm ?? undefined,
      torque_rpm: s?.torqueRpm ?? undefined,
      alimentacion: s?.alimentacion ?? '',
      transmision: s?.transmision ?? '',
      velocidad_max_kmh: s?.velocidadMaxKmh ?? undefined,
      diametro_carrera: s?.diametroCarrera ?? undefined,
      relacion_compresion: s?.relacionCompresion ?? undefined,
      potencia_con_ram_air_cv: s?.potenciaRamAirCv ?? undefined,
      arranque: s?.arranque ?? undefined
    },
    chasis: {
      tipo: s?.chasisTipo ?? '',
      suspension_delantera: s?.suspensionDelantera ?? '',
      suspension_trasera: s?.suspensionTrasera ?? '',
      amortiguador_direccion: s?.amortiguadorDireccion ?? undefined
    },
    frenos: {
      delantero: s?.frenoDelantero ?? '',
      trasero: s?.frenoTrasero ?? '',
      asistencia: s?.frenoAsistencia ?? undefined
    },
    neumaticos: {
      delantero: s?.neumaticoDelantero ?? '',
      trasero: s?.neumaticoTrasero ?? ''
    },
    dimensiones: {
      peso_kg: s?.pesoKg ?? undefined,
      peso_seco_kg: s?.pesoSecoKg ?? undefined,
      peso_marcha_kg: s?.pesoMarchaKg ?? undefined,
      deposito_litros: s?.depositoLitros ?? 0,
      altura_asiento_mm: s?.alturaAsientoMm ?? 0,
      distancia_ejes_mm: s?.distanciaEjesMm ?? 0,
      distancia_suelo_mm: s?.distanciaSueloMm ?? undefined,
      maletero_litros: s?.maleteroLitros ?? undefined
    },
    electronica: s?.electronica
      ? s.electronica.split(',').map(e => e.trim())
      : undefined
  };

  return {
    id: `moto-${dto.idMoto}`,
    slug,
    name,
    year_range: String(dto.año),
    type: dto.tipo ?? '',
    image: dto.imagenUrl ?? '',
    brand: dto.distribuidorNombre.toLowerCase(),
    visible: dto.estado !== 'oculto',
    specs,
    price: dto.precioVenta,
    stock: dto.stock
  };
}
