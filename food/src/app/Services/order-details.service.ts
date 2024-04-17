import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ItemsInRestaurantOrderDTO } from '../models/restaurantOrder';
@Injectable({
  providedIn: 'root'
})
export class OrderDetailsService {
 private apiUrl = 'http://localhost:8083/fooddelivery/orderdetails';

  constructor(private http: HttpClient) {}

  viewOrderOfRestaurant(restaurantId: number): Observable<ItemsInRestaurantOrderDTO[]> {
    return this.http.get<ItemsInRestaurantOrderDTO[]>(`${this.apiUrl}/ordersofarestaurant/${restaurantId}`);
  }
}
