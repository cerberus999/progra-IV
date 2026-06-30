export interface EngineSpecs {
  tipo: string;
  cilindrada_cc: number;
  refrigeracion: string;
  potencia_cv: number;
  potencia_rpm?: number;
  torque_nm?: number;
  torque_rpm?: number;
  alimentacion: string;
  transmision: string;
  velocidad_max_kmh?: number;
  diametro_carrera?: string;
  relacion_compresion?: string;
  potencia_con_ram_air_cv?: number;
  arranque?: string;
}

export interface ChassisSpecs {
  tipo: string;
  suspension_delantera: string;
  suspension_trasera: string;
  amortiguador_direccion?: string;
}

export interface BrakesSpecs {
  delantero: string;
  trasero: string;
  asistencia?: string;
}

export interface TiresSpecs {
  delantero: string;
  trasero: string;
}

export interface DimensionSpecs {
  peso_kg?: number;
  peso_seco_kg?: number;
  peso_marcha_kg?: number;
  deposito_litros: number;
  altura_asiento_mm: number;
  distancia_ejes_mm: number;
  distancia_suelo_mm?: number;
  maletero_litros?: number;
}

export interface MotorcycleSpecs {
  motor: EngineSpecs;
  chasis: ChassisSpecs;
  frenos: BrakesSpecs;
  neumaticos: TiresSpecs;
  dimensiones: DimensionSpecs;
  electronica?: string[];
}

export interface Motorcycle {
  id: string;
  slug: string;
  name: string;
  year_range: string;
  type: string;
  image: string;
  brand: string; // The brand identifier: kawasaki, honda, yamaha, suzuki
  badge_special?: string;
  specs: MotorcycleSpecs;
  price?: number; // Add price field for filtering and display
  stock?: number;
  visible?: boolean;
}
