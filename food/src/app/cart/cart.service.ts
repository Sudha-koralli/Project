import { Injectable } from '@angular/core';

export interface CartItem {
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  
}
