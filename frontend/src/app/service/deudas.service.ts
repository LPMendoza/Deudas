import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class DeudasService {

  private URI_API = 'http://localhost:3000/admin';

  constructor(private http: HttpClient) { }

  getDeduas() {
    return this.http.get(`${this.URI_API}/deudas`)
  }

}
