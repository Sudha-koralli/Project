import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ItemService } from '../item.service';

@Component({
  selector: 'app-category-menu',
  templateUrl: './category-menu.component.html',
  styleUrls: ['./category-menu.component.scss']
})
export class CategoryMenuComponent implements OnInit {

  itemsByCategory: any[] = [];

  constructor(private itemService: ItemService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const categoryId = params['categoryId'];
      if (categoryId) {
        this.viewItemByCategory(parseInt(categoryId));
      }
    });
  }

  viewItemByCategory(categoryId: number): void {
    this.itemService.viewItemByCategory(categoryId).subscribe(
      (data) => {
        console.log('Menu items for category:', data);
        this.itemsByCategory = data;
      },
      (error) => {
        console.error('Error fetching items by category:', error);
      }
    );
  }

  addItemToCart(item: any): void {
    console.log('Adding item to cart:', item);
  }

}
