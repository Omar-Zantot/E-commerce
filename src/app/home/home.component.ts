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
  favorites: boolean = false;
  constructor(
    private _DataService: DataService,

    private _cart: CartService
  ) {}

  ngOnInit(): void {
    this.getCategories();
    this.getProducts();
    this.getBrands();
  }

  catData: any[] = [];
  products: any[] = [];
  brands: any[] = [];
  whishList: any[] = [];

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
        this._cart.numOfCartItems.next(response.numOfCartItems);
        if (response.status == 'success') {
          Swal.fire({
            icon: 'success',
            text: response.message,
          });
          document.querySelector('.forgotPassword')?.classList.add('d-none');
        }
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  addTowishList(productId: string) {
    this._DataService.addToWishlist(productId).subscribe({
      next: (response) => {
        console.log(response);
        if (response.status == 'success') {
          this.whishList = response.data;

          Swal.fire({
            icon: 'success',
            text: response.message,
          });
          console.log('add');
        }
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  removeFromWishlist(productId: string) {
    this._DataService.removeWishlist(productId).subscribe({
      next: (response) => {
        if (response.status == 'success') {
          this.whishList = response.data;

          Swal.fire({
            icon: 'success',
            text: response.message,
          });
        }
      },
      error: (error) => {},
    });
  }
}

/**
 * "status": "success",
    "message": "Product removed successfully to your wishlist",
    "data": [
        "6428cbd5dc1175abc65ca037",
        "6428cd70dc1175abc65ca03d",
        "6428e997dc1175abc65ca0a1",
        "6428dfa0dc1175abc65ca067",
        "6428ebc6dc1175abc65ca0b9"
    ]
 *
 */
