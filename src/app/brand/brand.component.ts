import { Component } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.scss'],
})
export class BrandComponent {
  brands: any[] = [];
  constructor(private _DataService: DataService) {}

  ngOnInit(): void {
    this.getBrands();
  }

  getBrands() {
    this._DataService.getData('brands').subscribe((response) => {
      this.brands = response.data;
    });
  }
}
