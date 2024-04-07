
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ItemService } from '../item.service';

@Component({
  selector: 'app-restaurant-menu',
  templateUrl: './restaurant-menu.component.html',
  styleUrls: ['./restaurant-menu.component.scss']
})
export class RestaurantMenuComponent implements OnInit {
  itemsByRestaurant: any[] = [];

  constructor(private itemService: ItemService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const restaurantId = params['restaurantId'];
      if (restaurantId) {
        this.viewItemByRestaurant(parseInt(restaurantId));
      }
    });
  }

  viewItemByRestaurant(restaurantId: number): void {
    this.itemService.viewItemByRestaurant(restaurantId).subscribe(
      (data) => {
        console.log('Menu items for restaurant:', data);
        this.itemsByRestaurant = data;
      },
      (error) => {
        console.error('Error fetching items by restaurant:', error);
      }
    );
  }

  addItemToCart(item: any): void {
    console.log('Adding item to cart:', item);
  }
}
