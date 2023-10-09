import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import {
  ProductResponse,
  WishlistItem,
  WishlistResponse,
} from '../interfaces/whislist';

@Injectable({
  providedIn: 'root',
})
export class WishListService {
  constructor(private _HttpClient: HttpClient) {}
  private wishlistItems: WishlistItem[] = []; // Keep track of wishlist items
  private wishlistSubject: BehaviorSubject<WishlistItem[]> =
    new BehaviorSubject<WishlistItem[]>(this.wishlistItems);

  private baseUrl = 'https://ecommerce.routemisr.com';

  setWishlist(id: string): Observable<WishlistResponse> {
    return this._HttpClient.post<WishlistResponse>(
      `${this.baseUrl}/api/v1/wishlist`,
      {
        productId: id,
      }
    );
  }

  removeFromWishlist(productId: string): Observable<WishlistResponse> {
    return this._HttpClient.delete<WishlistResponse>(
      `${this.baseUrl}/api/v1/wishlist/${productId}`
    );
  }

  getWishlist(): Observable<ProductResponse> {
    return this._HttpClient.get<ProductResponse>(
      `${this.baseUrl}/api/v1/wishlist`
    );
  }

  isInWishlist(productId: string): boolean {
    return this.wishlistItems.some((item) => item._id === productId);
  }

  // // Add or remove items from the wishlist and update wishlistItems accordingly
  // toggleWishlist(productId: string): Observable<WishlistResponse> {
  //   if (this.isInWishlist(productId)) {
  //     return this.removeWishlist(productId);
  //   } else {
  //     return this.setWishlist(productId);
  //   }
  // }
}
