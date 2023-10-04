import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private baseUrl = 'https://ecommerce.routemisr.com/api/v1';
  numOfCartItems = new BehaviorSubject(0);
  constructor(private _HttpClient: HttpClient) {
    this.getLoggedUserCart().subscribe({
      next: (response) => {
        this.numOfCartItems.next(response.numOfCartItems);
      },
      error: (err) => {},
    });
  }
  header: any = {
    token: localStorage.getItem('userToken'),
  };

  addProductToCart(id: string): Observable<any> {
    return this._HttpClient.post(
      `${this.baseUrl}/cart`,
      // body
      {
        productId: id,
      }
      // headers
    );
  }

  getLoggedUserCart(): Observable<any> {
    return this._HttpClient.get(
      `${this.baseUrl}/cart`
      // headers
    );
  }

  removeCartItem(id: string): Observable<any> {
    return this._HttpClient.delete(
      `${this.baseUrl}/cart/${id}`
      // headers
    );
  }
  UpdateCartItem(productId: string, count: number): Observable<any> {
    return this._HttpClient.put(
      `${this.baseUrl}/cart/${productId}`,
      // body
      {
        count: count,
      },
      // headers
      {
        headers: this.header,
      }
    );
  }

  handelPayment(productId: string, shippingAddress: any): Observable<any> {
    return this._HttpClient.post(
      `${this.baseUrl}/orders/checkout-session/${productId}?url=http://localhost:4200`,
      // body
      {
        shippingAddress: shippingAddress,
      }
      // headers
    );
  }
}
