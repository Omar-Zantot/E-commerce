import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  cartDetails?: any;
  count!: number;
  constructor(private _cart: CartService) {}
  ngOnInit(): void {
    this.getCartItems();
  }

  getCartItems() {
    this._cart.getLoggedUserCart().subscribe({
      next: (response) => {
        console.log(response.data);
        this.cartDetails = response.data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  removeItem(id: string) {
    this._cart.removeCartItem(id).subscribe({
      next: (response) => {
        console.log(response);
        this.cartDetails = response.data;
        this._cart.numOfCartItems.next(response.numOfCartItems);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  updateItem(productId: string, count: number) {
    this._cart.UpdateCartItem(productId, count).subscribe({
      next: (response) => {
        this.count = response.data.products.count;
        this.cartDetails = response.data;
        if (!count) {
          console.log(response);

          this.removeItem(productId);
        }
        console.log(response);
      },

      error: (err) => {
        console.log(err);
      },
    });
  }
}
