import { Component } from '@angular/core';
import { DataService } from '../services/data.service';
import { CartService } from '../services/cart.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss'],
})
export class WishlistComponent {
  wishListDetails?: any;

  constructor(private _dataService: DataService, private _cart: CartService) {}

  ngOnInit() {
    this.getWishList();
  }

  getWishList() {
    this._dataService.getWishlist().subscribe({
      next: (response) => {
        console.log(response);
        this.wishListDetails = response.data;
        console.log(this.wishListDetails);
      },
    });
  }

  addToCart(productId: string) {
    this._cart.addProductToCart(productId).subscribe({
      next: (response) => {
        console.log(response);
        this._cart.numOfCartItems.next(response.numOfCartItems);
        if (response.status == 'success') {
          Swal.fire({
            icon: 'success',
            text: response.message,
          });
        }
        this.removeFromWishlist(productId);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
  removeFromWishlist(productId: string) {
    this._dataService.removeWishlist(productId).subscribe({
      next: (response) => {
        console.log(response);
        this.getWishList();
      },
    });
  }
}

/**
 * {status: 'success', count: 9, data: Array(9)}
 *
 * */
