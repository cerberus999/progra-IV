import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ClienteRequest, ClienteResponse, VentaRequest, VentaResponse } from '../models/admin.model';
import { RegisterRequest } from '../models/auth.model';

@Injectable({
  providedIn: 'root'
})
export class AdminApiService {
  private readonly baseUrl = `${environment.apiBaseUrl}/admin`;

  constructor(private http: HttpClient) {}

  getClientes(): Observable<ClienteResponse[]> {
    return this.http.get<ClienteResponse[]>(`${this.baseUrl}/clientes`);
  }

  createCliente(data: ClienteRequest): Observable<ClienteResponse> {
    return this.http.post<ClienteResponse>(`${this.baseUrl}/clientes`, data);
  }

  createVenta(data: VentaRequest): Observable<VentaResponse> {
    return this.http.post<VentaResponse>(`${this.baseUrl}/ventas`, data);
  }

  registerUser(data: RegisterRequest): Observable<HttpResponse<void>> {
    return this.http.post<void>(`${this.baseUrl}/usuarios`, data, { observe: 'response' });
  }
}
