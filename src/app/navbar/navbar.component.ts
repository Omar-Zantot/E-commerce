import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  isLogin: boolean = false;
  constructor(private _Auth: AuthService) {}
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
