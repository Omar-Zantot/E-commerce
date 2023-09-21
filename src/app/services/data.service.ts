import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private _HttpClient: HttpClient) {}

  private baseUrl = 'https://ecommerce.routemisr.com';

  /** `dataType` brands , categories or  products ? */
  getData(dataType: string): Observable<any> {
    return this._HttpClient.get(`${this.baseUrl}/api/v1/${dataType}`);
  }

  getProductsDetails(id: string): Observable<any> {
    return this._HttpClient.get(`${this.baseUrl}/api/v1/products/${id}`);
  }
}
