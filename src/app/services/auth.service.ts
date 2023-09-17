import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import jwtDecode from 'jwt-decode';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userData = null;
  constructor(private _HttpClient: HttpClient) {}

  private baseUrl = 'https://ecommerce.routemisr.com/api/v1/auth';

  signUp(formData: any): Observable<any> {
    return this._HttpClient.post(`${this.baseUrl}/signup`, formData);
  }

  signIn(formData: any): Observable<any> {
    return this._HttpClient.post(`${this.baseUrl}/signin`, formData);
  }

  decodedUserData() {
    let encodedToken = JSON.stringify(localStorage.getItem('userToken'));
    let decodedToken: any = jwtDecode(encodedToken);

    this.userData = decodedToken;
  }
}
