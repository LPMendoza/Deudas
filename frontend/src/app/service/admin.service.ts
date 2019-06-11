import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Deudor} from '../models/Deudor';
import { Deuda } from '../models/Deuda';
import { Pago } from '../models/pago';
 
@Injectable({
  providedIn: 'root'
})
export class AdminService {

  URI_API = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  getDeudores() {
    return this.http.get(`${this.URI_API}/admin/deudores`);
  }

  createDeudor(deudor: Deudor) {
    return this.http.post(`${this.URI_API}/admin/deudores/`, deudor);
  }
  getDeudas() {
    return this.http.get(`${this.URI_API}/admin/deudas`)
  }
  addDeuda(deuda: Deuda) {
    return this.http.post(`${this.URI_API}/admin/deudas`, deuda);
  }

  verConceptos() {
    return this.http.get(`${this.URI_API}/admin/conceptos/${localStorage.getItem("KEY_ACCESS")}`);
  }

  addPago(pago: Pago) {
    return this.http.post(`${this.URI_API}/admin/pago/${localStorage.getItem("KEY_ACCESS")}`, pago);
  }
}
