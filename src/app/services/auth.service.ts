import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import jwtDecode from 'jwt-decode';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // userData = null;
  //  behaveier subject  ()
  userData = new BehaviorSubject(null);

  constructor(private _HttpClient: HttpClient, private _Router: Router) {
    if (localStorage.getItem('userData') !== null) {
      this.decodedUserData();
    }
  }

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
    this.userData.next(decodedToken);
  }

  logOut() {
    localStorage.removeItem('userToken');
    this.userData.next(null);
    this._Router.navigate(['/signin']);
  }

  forgotPassword(formData: any): Observable<any> {
    return this._HttpClient.post(`${this.baseUrl}/forgotPasswords`, formData);
  }

  verifyResetCode(formData: any): Observable<any> {
    return this._HttpClient.post(`${this.baseUrl}/verifyResetCode`, formData);
  }

  resetPassword(formData: any): Observable<any> {
    return this._HttpClient.put(`${this.baseUrl}/resetPassword`, formData);
  }
}
