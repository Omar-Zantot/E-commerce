import {
  Component,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { DataService } from '../services/data.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { AuthService } from '../services/auth.service';
import { CartService } from '../services/cart.service';
import Swal from 'sweetalert2';
import { WishListService } from '../services/wish-list.service';
import { Subscription } from 'rxjs/internal/Subscription';
import {
  Product,
  WishlistItem,
  WishlistResponse,
} from '../interfaces/whislist';

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
  selectedProductId: string | null = null;
  favItems: string[] = [];
  private wishListSubscription!: Subscription;
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

  constructor(
    private _DataService: DataService,
    private _Auth: AuthService,
    private _cart: CartService,
    private wishlistService: WishListService
  ) {}

  ngOnInit(): void {
    this.getWishList();
    this.getCategories();
    this.getProducts();
    this.getBrands();
    this.wishListSubscription = this.wishlistService
      .getWishlist()
      .subscribe((wishlist) => {
        this.wishList = wishlist.data;
        // Update the heart icons based on the updated wishlist
        this.getProducts();
        this.updateHeartIcons();
      });
  }

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
      // this.updateHeartIcons();
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
        // Update the heart icons based on the wishlist once it's loaded
        this.updateHeartIcons();
      },
    });
  }

  // Wishlist methods
  // Check if a product is in the wishlist
  isInWishlist(productId: string): boolean {
    return this.wishList.some((product) => product._id === productId);
  }

  // isInWishlist_(productId: string): boolean {
  //   return this.favItems.includes(productId);
  // }

  toggleWishlist(productId: string): void {
    const isInWishlist = this.isInWishlist(productId);

    if (isInWishlist) {
      this.removeFromWishlist(productId);
    } else {
      this.addTowishList(productId);
    }

    this.updateHeartIcon(productId);
  }

  // Remove a product from the wishlist
  removeFromWishlist(productId: string) {
    this.wishlistService.removeFromWishlist(productId).subscribe({
      next: (response: WishlistResponse) => {
        console.log(response);

        if (response.status === 'success') {
          // Find the index of the productId in favItems and remove it
          const index = this.favItems.indexOf(productId);
          if (index !== -1) {
            this.favItems.splice(index, 1);
          }

          localStorage.setItem('wishlist', JSON.stringify(this.favItems));
          this.updateHeartIcon(productId);
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

  // Add a product to the wishlist
  addTowishList(productId: string) {
    this.wishlistService.setWishlist(productId).subscribe({
      next: (response: WishlistResponse) => {
        console.log(response);

        if (response.status === 'success') {
          // Add the productId to favItems if it doesn't already exist
          if (!this.favItems.includes(productId)) {
            this.favItems.push(productId);
          }

          localStorage.setItem('wishlist', JSON.stringify(this.favItems));
          this.updateHeartIcon(productId);

          Swal.fire({
            icon: 'success',
            text: response.message,
          });
          // this.getProducts();
        }
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  // Update the heart icon color based on wishlist status
  updateHeartIcon(productId: string) {
    console.log('will updata');

    const heartIcon = document.querySelector(
      `[data-product-id="${productId}"]`
    );
    if (heartIcon) {
      const isInWishlist = this.isInWishlist(productId);
      heartIcon.classList.toggle('text-danger', isInWishlist);
      heartIcon.classList.toggle('text-dark', !isInWishlist);
    }
  }

  // Update heart icons based on the wishlist
  updateHeartIcons() {
    this.products.forEach((product) => {
      this.updateHeartIcon(product._id);
    });
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
