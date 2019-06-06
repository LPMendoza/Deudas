import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { UserInterface } from '../models/UserInterface';
import { JwtResponseInterface } from '../models/jwt-response';
import { tap } from 'rxjs/operators';
import {Observable, BehaviorSubject} from 'rxjs';
import { LoginComponent } from '../auth/login/login.component';


@Injectable()
export class AuthService {

  AUTH_SERVE: string = 'http:localhost:3000';
  authSubject = new BehaviorSubject(false);
  private token: string;

  constructor(private httpClient: HttpClient) { 
  }

  login(user: UserInterface): Observable<JwtResponseInterface> {

    return this.httpClient.post<JwtResponseInterface>(`${this.AUTH_SERVE}/login`,
    user).pipe(tap(
      (res: JwtResponseInterface) => { 
        if(res) {
          this.saveToken(res.dataUser.accessToken, res.dataUser.expiresIn);
        }     
      })
    ); 
  }

  logout(): void {
    this.token = '';
    localStorage.removeItem('ACCESS_TOKEN');
    localStorage.removeItem('EXPIRES_IN');
  }

  private saveToken(token: string, expireIn: string): void {
    localStorage.setItem('ACCESS_TOKEN', token);
    localStorage.setItem('EXPIRES_IN', expireIn);
    this.token = token;
  }
  private getToken(): string {
    if(!this.token) {
      this.token = localStorage.getItem('ACCESS_TOKEN');
    }
    return this.token;
  }
}
