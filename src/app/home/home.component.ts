import { Component, OnDestroy, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { AuthService } from '../services/auth.service';
import { CartService } from '../services/cart.service';
import Swal from 'sweetalert2';
import { WishListService } from '../services/wish-list.service';
import { Subscription } from 'rxjs/internal/Subscription';
import { Product, WishlistItem } from '../interfaces/whislist';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  searchVal: string = '';
  catData: any[] = [];
  products: any[] = [];
  brands: any[] = [];
  wishList: Product[] = [];
  wishListDetails?: any;

  constructor(
    private _DataService: DataService,
    private _Auth: AuthService,
    private _cart: CartService,
    private wishlistService: WishListService
  ) {}
  private wishListSubscription!: Subscription;

  ngOnInit(): void {
    this.getWishList();
    this.getCategories();
    this.getProducts();
    this.getBrands();
    this.wishListSubscription = this.wishlistService
      .getWishlist()
      .subscribe((wishlist) => {
        this.wishList = wishlist.data;
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
      0: { items: 1 },
      400: { items: 2 },
      740: { items: 4 },
      940: { items: 5 },
    },
    nav: true,
  };

  ngOnDestroy(): void {
    // Unsubscribe to prevent memory leaks
    this.wishListSubscription.unsubscribe();
  }

  // Fetch data methods

  getCategories() {
    this._DataService.getData('categories').subscribe((response) => {
      this.catData = response.data;
    });
  }

  getProducts() {
    this._DataService.getData('products').subscribe((response) => {
      this.products = response.data;
      // Update heart icons based on wishlist once products are loaded
      this.updateHeartIcons();
    });
  }

  getBrands() {
    this._DataService.getData('brands').subscribe((response) => {
      this.brands = response.data.slice(0, 4);
    });
  }

  // Wishlist methods

  getWishList() {
    this._DataService.getWishlist().subscribe({
      next: (response) => {
        this.wishList = response.data;
      },
    });
  }

  // Wishlist methods
  isInWishlist(itemId: string): boolean {
    return this.wishList.some((product) => product._id === itemId);
  }

  toggleWishlist(itemId: string): void {
    const isInWishlist = this.isInWishlist(itemId);

    if (isInWishlist) {
      this.removeFromWishlist(itemId);
    } else {
      this.addTowishList(itemId);
    }
    this.wishlistService.getWishlist().subscribe({
      next: (response) => {
        if (response.status === 'success') {
          this.wishList = response.data;
          localStorage.setItem('wishlist', JSON.stringify(this.wishList));
          // Update the heart icons based on the updated wishlist
          this.updateHeartIcons();
        }
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  // isInWishlist(itemId: string): boolean {
  //   return this.whishList.includes(itemId);
  // }

  // toggleWishlist(itemId: string): void {
  //   const isInWishlist = this.isInWishlist(itemId);

  //   if (isInWishlist) {
  //     this.removeFromWishlist(itemId);
  //   } else {
  //     this.addTowishList(itemId);
  //   }
  // }

  removeFromWishlist(productId: string) {
    this._DataService.removeWishlist(productId).subscribe({
      next: (response) => {
        if (response.status == 'success') {
          this.wishList = response.data;
          localStorage.setItem('wishlist', JSON.stringify(this.wishList));
          this.updateHeartIcon(productId);
        }
      },
      error: (error) => {},
    });
  }

  addTowishList(productId: string) {
    this._DataService.addToWishlist(productId).subscribe({
      next: (response) => {
        if (response.status == 'success') {
          this.wishList = response.data;
          localStorage.setItem('wishlist', JSON.stringify(this.wishList));
          this.updateHeartIcon(productId);
        }
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  // Update heart icon based on wishlist status

  updateHeartIcon(productId: string) {
    // const heartIcon = document.querySelector('.fa-heart');
    // if (heartIcon) {
    //   if (!this.whishList.includes(productId)) {
    //     heartIcon.classList.remove('text-dark');
    //     heartIcon.classList.add('text-danger');
    //   } else {
    //     heartIcon.classList.remove('text-danger');
    //     heartIcon.classList.add('text-dark');
    //   }
    // }
  }

  // Update heart icons based on the wishlist
  updateHeartIcons() {
    const heartIcons = document.querySelectorAll('.fa-heart');
    if (heartIcons) {
      heartIcons.forEach((heartIcon) => {
        const productId = heartIcon.getAttribute('data-product-id');
        if (productId) {
          const isInWishlist = this.isInWishlist(productId);
          heartIcon.classList.toggle('text-danger', isInWishlist);
          heartIcon.classList.toggle('text-dark', !isInWishlist);
        }
      });
    }
  }

  // Cart methods

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
