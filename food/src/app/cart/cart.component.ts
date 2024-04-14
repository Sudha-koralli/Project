import { Component } from '@angular/core';
import { CartService } from './cart.service';
import { FoodCart } from '../models/cart';
import { faTrash, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {
  constructor(private cartService: CartService) {}

  cart: FoodCart; // Update the type to CartResponse
  faTrash = faTrash;
  faPlus = faPlus;
  faMinus = faMinus;

  ngOnInit(): void {
    const userIdString = sessionStorage.getItem('userId');
    if (!userIdString) {
      console.error('User ID not found in session storage');
      return;
    }

    const userId = JSON.parse(userIdString);
    if (!userId || !userId.userId) {
      console.error('User ID not found in session storage');
      return;
    }

    const userIdValue = userId.userId;
    this.viewCartOfUser(userIdValue);
  }

  viewCartOfUser(userId: number): void {
    this.cartService.viewCartOfUser(userId).subscribe(
      cart => {
        this.cart = cart;
      },
      error => {
        console.error('Error fetching cart:', error);
      }
    );
  }
  
  increaseOrReduceQuantityOfItem(itemId: number, quantity: number): void {
    const userIdString = sessionStorage.getItem('userId');
    if (!userIdString) {
      console.error('User ID not found in session storage');
      return;
    }

    const userId = JSON.parse(userIdString);
    if (!userId || !userId.foodCartId) {
      console.error('Food Cart ID not found in session storage');
      return;
    }

    const cartId = userId.foodCartId;

    this.cartService.increaseOrReduceQuantityOfItem(cartId, itemId, quantity)
      .subscribe(updatedCart => {
        this.cart = updatedCart;
      }, error => {
        console.error('Error updating quantity:', error);
      });
  }
  
  removeItemFromCart(cartItemId: number): void {
    this.cartService.removeItemFromCart(cartItemId)
      .subscribe(
        updatedCart => {
          this.cart = updatedCart;
        },
        error => {
          console.error('Error removing item from cart:', error);
        }
      );
    }
  }