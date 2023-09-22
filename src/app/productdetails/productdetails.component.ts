import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { ActivatedRoute } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-productdetails',
  templateUrl: './productdetails.component.html',
  styleUrls: ['./productdetails.component.scss'],
})
export class ProductdetailsComponent implements OnInit {
  productId: any;
  productDetails: any;

  constructor(
    private _dataService: DataService,
    private _activatedRoute: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this._activatedRoute.paramMap.subscribe((param) => {
      this.productId = param.get('id');
    });
    this.getDetails();
  }

  getDetails() {
    this._dataService
      .getProductsDetails(this.productId)
      .subscribe((product) => {
        this.productDetails = product.data;
        console.log(this.productDetails);
      });
  }
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1,
      },
    },
    nav: true,
  };
}
