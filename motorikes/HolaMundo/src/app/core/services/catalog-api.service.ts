import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { MotoResponseDto } from '../models/api-response.model';

@Injectable({
  providedIn: 'root'
})
export class CatalogApiService {
  private readonly baseUrl = `${environment.apiBaseUrl}/catalogo`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<MotoResponseDto[]> {
    return this.http.get<MotoResponseDto[]>(this.baseUrl);
  }

  getById(id: number): Observable<MotoResponseDto> {
    return this.http.get<MotoResponseDto>(`${this.baseUrl}/${id}`);
  }
}
