import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss'],
})
export class WishlistComponent implements OnInit {
  wishListDetails?: any;

  constructor(private _dataService: DataService) {}

  ngOnInit() {
    this.getWishList();
  }

  getWishList() {
    this._dataService.getWishlist().subscribe({
      next: (response) => {
        console.log(response);
      },
    });
  }
}
