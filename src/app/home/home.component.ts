import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { AuthService } from '../services/auth.service';
import { CartService } from '../services/cart.service';
import Swal from 'sweetalert2';
DataService;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  searchVal: string = '';
  constructor(
    private _DataService: DataService,
    private _Auth: AuthService,
    private _cart: CartService
  ) {}

  ngOnInit(): void {
    this.getCategories();
    this.getProducts();
    this.getBrands();
    console.log(this._Auth.userData.getValue());
  }

  catData: any[] = [];
  products: any[] = [];
  brands: any[] = [];

  getCategories() {
    this._DataService.getData('categories').subscribe((response) => {
      this.catData = response.data;
    });
  }

  getProducts() {
    this._DataService.getData('products').subscribe((response) => {
      this.products = response.data;
    });
  }

  getBrands() {
    this._DataService.getData('brands').subscribe((response) => {
      this.brands = response.data.slice(0, 4);
    });
  }

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    autoplay: true,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 2,
      },
      740: {
        items: 4,
      },
      940: {
        items: 5,
      },
    },
    nav: true,
  };

  // cart

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
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
