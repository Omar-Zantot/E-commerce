import { Component } from '@angular/core';
import { DataService } from '../services/data.service';
import { CartService } from '../services/cart.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent {
  products: any[] = [];
  searchVal: string = '';

  constructor(private _DataService: DataService, private _cart: CartService) {}

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this._DataService.getData('products').subscribe((response) => {
      this.products = response.data;
    });
  }

  addToCart(productId: string) {
    this._cart.addProductToCart(productId).subscribe({
      next: (response) => {
        this._cart.numOfCartItems.next(response.numOfCartItems);
        if (response.status == 'success') {
          Swal.fire({
            icon: 'success',
            text: response.message,
          });
        }
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
