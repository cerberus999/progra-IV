import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { UnidadCliente, ServicioMantenimiento, GarantiaPosventa, ReclamoTecnico, SolicitudRepuesto } from '../models/cliente.model';

@Injectable({
  providedIn: 'root'
})
export class ClienteApiService {
  private readonly baseUrl = `${environment.apiBaseUrl}/cliente`;

  constructor(private http: HttpClient) {}

  getUnidadesByCliente(idCliente: number): Observable<UnidadCliente[]> {
    return this.http.get<UnidadCliente[]>(`${this.baseUrl}/unidades/cliente/${idCliente}`);
  }

  getServiciosByUnidad(idUnidad: number): Observable<ServicioMantenimiento[]> {
    return this.http.get<ServicioMantenimiento[]>(`${this.baseUrl}/unidades/${idUnidad}/servicios`);
  }

  getGarantiaByUnidad(idUnidad: number): Observable<GarantiaPosventa> {
    return this.http.get<GarantiaPosventa>(`${this.baseUrl}/unidades/${idUnidad}/garantia`);
  }

  getReclamosByUnidad(idUnidad: number): Observable<ReclamoTecnico[]> {
    return this.http.get<ReclamoTecnico[]>(`${this.baseUrl}/unidades/${idUnidad}/reclamos`);
  }

  getSolicitudesByUnidad(idUnidad: number): Observable<SolicitudRepuesto[]> {
    return this.http.get<SolicitudRepuesto[]>(`${this.baseUrl}/unidades/${idUnidad}/solicitudes-repuesto`);
  }
}
