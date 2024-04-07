import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Item } from './models/item.model';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  private baseUrl = 'http://localhost:8082/fooddelivery/items';

  constructor(private http: HttpClient) { }

  viewItemByRestaurant(restaurantId: number): Observable<Item[]> {
    return this.http.get<Item[]>(`${this.baseUrl}/itembyrestaurant/${restaurantId}`);
  }
  viewItemByCategory(categoryId: number): Observable<Item[]> {
    return this.http.get<Item[]>(`${this.baseUrl}/itembycategory/${categoryId}`);
  }
}
