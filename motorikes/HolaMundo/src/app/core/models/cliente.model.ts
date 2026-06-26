export interface UnidadCliente {
  idUnidad: number;
  idClienteRef: number;
  idVentaRef: number;
  idMotoRef: number;
  numeroSerieMoto: string;
  fechaCompra: string;
  kilometrajeCompra: number;
  kilometrajeActual: number;
  color: string | null;
  placaPatente: string | null;
  activo: boolean;
}

export interface ServicioMantenimiento {
  idServicio: number;
  idUnidad: number;
  idPlan: number | null;
  nombrePlan: string | null;
  fechaServicio: string;
  kilometrajeEntrada: number;
  tipoServicio: string;
  descripcionTrabajos: string;
  aceiteCambiado: boolean;
  tipoAceiteUsado: string | null;
  frenosAjustados: boolean;
  cadenaRevisada: boolean;
  motorRevisado: boolean;
  electricoRevisado: boolean;
  suspensionRevisada: boolean;
  observacionesTecnicas: string | null;
  costoManoObra: number;
  costoRepuestos: number;
  costoTotal: number;
  esGratuito: boolean;
  proximoServicioKm: number | null;
  proximoServicioFecha: string | null;
  tecnicoResponsable: string;
  estadoServicio: string;
}

export interface GarantiaPosventa {
  idGarantiaPos: number;
  idUnidad: number;
  tipoGarantiaNombre: string;
  fechaInicio: string;
  fechaFin: string;
  cubreMotor: boolean;
  cubreTransmision: boolean;
  cubreElectrico: boolean;
  cubreCarroceria: boolean;
  estadoGarantia: string;
  kilometrajeMaximoGarantia: number | null;
  condicionesEspeciales: string | null;
}

export interface SolicitudRepuesto {
  idSolicitud: number;
  idUnidad: number;
  idRepuesto: number | null;
  nombreRepuesto: string | null;
  codigoRepuesto: string | null;
  descripcionLibre: string | null;
  cantidadSolicitada: number;
  fechaSolicitud: string;
  estadoSolicitud: string;
  fechaDisponibilidad: string | null;
  notificadoCliente: boolean;
  precioCotizado: number | null;
  notasTaller: string | null;
}

export interface ReclamoTecnico {
  idReclamoTec: number;
  idUnidad: number;
  idGarantiaPos: number | null;
  kilometrajeReclamo: number;
  fechaIngreso: string;
  descripcionCliente: string;
  componenteAfectado: string | null;
  diagnosticoTecnico: string | null;
  causaProbable: string | null;
  aplicaGarantia: boolean;
  accionTomada: string | null;
  idServicioRealizado: number | null;
  costoReparacion: number;
  costoCubiertoGarantia: number;
  costoCobradoCliente: number;
  fechaResolucion: string | null;
  tecnicoResponsable: string | null;
  estadoReclamo: string;
}
