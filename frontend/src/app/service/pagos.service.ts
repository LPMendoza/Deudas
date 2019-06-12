import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Filtro } from '../models/Filtro';

@Injectable({
  providedIn: 'root'
})
export class PagosService {

  URI_API = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  getPagos() {
    return this.http.get(`${this.URI_API}/admin/pago`);
  }

  getPagosFiltrados(filtro: Filtro) {
    return this.http.post(`${this.URI_API}/admin/filtro/pago`, filtro);
  }
}
