import { Injectable, APP_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Admin } from '../models/Admin';
import { Deudor } from '../models/Deudor';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private URI_API = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {

  }

  checkAdmin() {
    return this.http.get(`${this.URI_API}/admins`);
  }
  checkDeudor() {
    return this.http.get(`${this.URI_API}/deudas`);
  }
}
