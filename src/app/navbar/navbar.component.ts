import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  isLogin: boolean = false;
  constructor(private _Auth: AuthService) {
    this._Auth.userData.subscribe({
      next: () => {
        this.isLogin = _Auth.userData.getValue() !== null ? true : false;
      },
    });
  }
  logOut() {
    this._Auth.logOut();
  }
}
