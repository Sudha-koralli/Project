import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
 
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
 
@Injectable({
  providedIn: 'root'
})
export class PaymentService {
 
  constructor(private http: HttpClient) {
 
  }
 
  createOrder(order): Observable<any> {
    return this.http.post("http://localhost:8089/pg/createOrder", {
    customerName: order.name,
    email: order.email,
    phoneNumber: order.phone,
    amount: order.amount,
    }, httpOptions);
  }
 
}
 