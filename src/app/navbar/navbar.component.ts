import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  isLogin: boolean = false;
  cartNumber: number = 0;
  constructor(private _Auth: AuthService, private _cart: CartService) {
    _cart.numOfCartItems.subscribe({
      next: (res) => {
        this.cartNumber = res;
      },
    });
  }
  ngOnInit(): void {
    this._Auth.userData.subscribe({
      next: () => {
        this.isLogin = this._Auth.userData.getValue() !== null ? true : false;
      },
    });
  }
  logOut() {
    this._Auth.logOut();
  }
}
