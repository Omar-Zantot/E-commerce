import { Component } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent {
  constructor(private _DataService: DataService) {}

  ngOnInit(): void {
    this.getCategories();
  }

  catData: any[] = [];

  getCategories() {
    this._DataService.getData('categories').subscribe((response) => {
      this.catData = response.data;
    });
  }
}
