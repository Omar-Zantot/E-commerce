import { Component } from '@angular/core';
import { DataService } from '../services/data.service';
DataService;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  constructor(private _DataService: DataService) {
    this.getCategories();
    this.getProducts();
    this.getBrands();
  }
  catData: any[] = [];
  products: any[] = [];
  brands: any[] = [];

  getCategories() {
    this._DataService.getData('categories').subscribe((response) => {
      this.catData = response.data.slice(0, 4);
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
}
