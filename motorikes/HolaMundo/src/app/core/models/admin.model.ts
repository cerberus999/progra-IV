export interface ClienteRequest {
  nombre: string;
  apellido: string;
  ci: string;
  telefono?: string;
  email?: string;
  direccion?: string;
}

export interface ClienteResponse {
  idCliente: number;
  nombre: string;
  apellido: string;
  ci: string;
  telefono: string | null;
  email: string | null;
  direccion: string | null;
  fechaRegistro: string;
}

export interface VentaRequest {
  idCliente: number;
  idGerente: number;
  idMoto: number;
  precioFinal: number;
  descuentoAplicado?: number | null;
  metodoPago?: string;
  notas?: string;
}

export interface VentaResponse {
  idVenta: number;
  idCliente: number;
  clienteNombre: string;
  idGerente: number;
  gerenteNombre: string;
  idMoto: number;
  motoMarcaModelo: string;
  fechaVenta: string;
  precioFinal: number;
  descuentoAplicado: number | null;
  metodoPago: string | null;
  notas: string | null;
}
