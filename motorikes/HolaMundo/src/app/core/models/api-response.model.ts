export interface MotoSpecsDto {
  refrigeracion: string | null;
  potenciaCv: number | null;
  potenciaRpm: number | null;
  torqueNm: number | null;
  torqueRpm: number | null;
  alimentacion: string | null;
  transmision: string | null;
  velocidadMaxKmh: number | null;
  diametroCarrera: string | null;
  relacionCompresion: string | null;
  potenciaRamAirCv: number | null;
  arranque: string | null;
  chasisTipo: string | null;
  suspensionDelantera: string | null;
  suspensionTrasera: string | null;
  amortiguadorDireccion: string | null;
  frenoDelantero: string | null;
  frenoTrasero: string | null;
  frenoAsistencia: string | null;
  neumaticoDelantero: string | null;
  neumaticoTrasero: string | null;
  pesoKg: number | null;
  pesoSecoKg: number | null;
  pesoMarchaKg: number | null;
  depositoLitros: number | null;
  alturaAsientoMm: number | null;
  distanciaEjesMm: number | null;
  distanciaSueloMm: number | null;
  maleteroLitros: number | null;
  electronica: string | null;
}

export interface MotoResponseDto {
  idMoto: number;
  distribuidorNombre: string;
  idDistribuidor: number;
  marca: string;
  modelo: string;
  año: number;
  tipo: string;
  cilindradaCc: number | null;
  precioImportacion: number;
  precioVenta: number;
  stock: number;
  color: string | null;
  imagenUrl: string | null;
  estado: string;
  especificaciones: MotoSpecsDto | null;
}
