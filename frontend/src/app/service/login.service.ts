import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Admin } from '../models/Admin';
import { Deudor } from '../models/Deudor';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private URI_API = 'http://localhost:300/api';

  constructor(private http: HttpClient) {

  }

  checkUser(user): void {
    this.http.get(`${this.URI_API}/admin`);
  }
}
