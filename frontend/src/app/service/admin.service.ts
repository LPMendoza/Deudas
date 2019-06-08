import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Deudor} from '../models/Deudor';
 
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
    return this.http.post(`${this.URI_API}/admin/deudores`, deudor);
  }
}
