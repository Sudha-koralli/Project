import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './user-profile/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private getUserUrl = 'http://localhost:8080/fooddelivery/user';
  private updateUserUrl = 'http://localhost:8080/fooddelivery/user/updateProfile';
  private updateAddressUrl = 'http://localhost:8087/fooddelivery/address';

  constructor(private http: HttpClient) {}

  updateUser(id: number, userData: any): Observable<User> {
    return this.http.put<User>(`${this.updateUserUrl}/${id}`, userData);
  }

  updateAddress(addressId: number, addressData: any): Observable<any> {
    return this.http.put<any>(`${this.updateAddressUrl}/${addressId}`, addressData);
  }

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.getUserUrl}/${id}`);
  }

  getAddressById(addressId: number): Observable<User> {
    return this.http.get<User>(`${this.getUserUrl}/${addressId}`);
  }
}
