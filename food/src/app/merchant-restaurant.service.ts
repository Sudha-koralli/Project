import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Restaurant } from './models/restaurant';
import { MerchantRestaurant } from './merchant-restaurant-info/merchant-restaurant-info.component';

@Injectable({
  providedIn: 'root'
})
export class MerchantRestaurantService {
  private apiUrl = 'http://localhost:8082/fooddelivery/restaurant';

  constructor(private http: HttpClient) {}
  getRestaurantByMerchantId(merchantId: any): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/merchant/${merchantId}`).pipe(
      map(response => {
        if (response === null || response === false) {
          return false; 
        } else {
          return response;
        }
      }),
    );
  }
  submitRestaurantData(restaurantData: MerchantRestaurant, merchantId: any): Observable<any> {
    const dataWithMerchantId = { ...restaurantData, merchantId };
    return this.http.post<any>(`${this.apiUrl}/add`, dataWithMerchantId);
  }
  updateRestaurant(restaurantData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/update`, restaurantData);
  }
  updateRestaurantItems(restaurantId: string, itemData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${restaurantId}/items`, itemData);
  }
  viewRestaurant(restaurantId: number): Observable<Restaurant> {
    return this.http.get<Restaurant>(`${this.apiUrl}/${restaurantId}`);
  }
  removeRestaurant(restaurantId: number): Observable<Restaurant> {
    return this.http.delete<Restaurant>(`${this.apiUrl}/${restaurantId}`);
  }
}
