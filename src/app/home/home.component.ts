import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
DataService;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(private _DataService: DataService) {}

  ngOnInit(): void {
    this.getCategories();
    this.getProducts();
    this.getBrands();
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
}
