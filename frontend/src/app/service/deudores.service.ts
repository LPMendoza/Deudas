import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 

@Injectable({
  providedIn: 'root'
})
export class DeudoresService {

  URI_API = 'http://localhost:3000/api/deudas'
  constructor(private http: HttpClient) { }

  getDeudas() {
    return this.http.get(`${this.URI_API}/deudas/${localStorage.getItem("KEY_ACCESS")}`);
  }

  getPagos() {
    return this.http.get(`${this.URI_API}/pagos/${localStorage.getItem("KEY_ACCESS")}`);
  }

  getAdeudo() {
    return this.http.get(`${this.URI_API}/${localStorage.getItem("KEY_ACCESS")}`);
  }

}
