import { Component, OnInit } from '@angular/core';
import { FoodItem } from './food-items';
import { CartService } from '../../cart/cart.service';
import { mocktails,cocktails,liquor } from './food-items';
interface CartItem extends FoodItem {
  quantity: number;
}
@Component({
  selector: 'app-costa',
  templateUrl: './costa.component.html',
  styleUrls: ['./costa.component.scss']
})
export class CostaComponent implements OnInit {
  cartItems: CartItem[] = [];
  selectedFilter: string = '';
  showVeg: boolean = false;
  showNonVeg: boolean = false;
  cocktails:FoodItem[]=cocktails;
  mocktails:FoodItem[]=mocktails;
  liquor:FoodItem[]=liquor;
  menuCategories: any;
  soup: any;
  cartMessage!: string;
  showCart = false;
  searchTerm: string = '';
  cartItemCount: number = 0;

  constructor(private cartService: CartService) {
    this.cartItems = cartService.getCartItems();
  }
  
ngOnInit(): void {
  this.cartItemCount = this.cartService.getCartItems().reduce((total, item) => total + item.quantity, 0);

}
  addItemToCart(item: FoodItem) {
    const cartItem = {...item, quantity: 1};
    this.cartService.addItemToCart(cartItem);
    this.cartMessage = `Adding ${item.name} to cart...`;
    this.showCart = true; 
    setTimeout(() => {
      this.cartMessage = '';
      this.showCart = false;
    }, 2000);
  }

  filterItems(type: string) {
    this.selectedFilter = type;
  }

  getFilteredItems(foodArray: FoodItem[]): FoodItem[] {
    let filteredArray = foodArray.filter(item => {
      if (!this.selectedFilter) {
        return (this.showVeg && item.type === 'veg') || (this.showNonVeg && item.type === 'non-veg') || (!this.showVeg && !this.showNonVeg);
      } else {
        return item.type === this.selectedFilter;
      }
    });

    if (this.searchTerm) {
      filteredArray = filteredArray.filter(item => item.name.toLowerCase().includes(this.searchTerm.toLowerCase()));
    }

    return filteredArray;
  }

  getFilteredMocktails() {
    return this.getFilteredItems(this.mocktails);
  }
  getFilteredCocktails() {
    return this.getFilteredItems(this.cocktails);
  }
  getFilteredLiquor() {
    return this.getFilteredItems(this.liquor);
  }

}


