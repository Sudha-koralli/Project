
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private baseUrl = "http://localhost:8080/fooddelivery/user/login";
  private isLoggedInSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLoggedIn$: Observable<boolean> = this.isLoggedInSubject.asObservable();
  isLoggedIn = false;
  constructor(private httpClient: HttpClient,private router: Router, ) { }


  loginUser(register: any): Observable<any> {
    return this.httpClient.post<any>(`${this.baseUrl}`, register)
  }

  logout(): void {
    this.isLoggedInSubject.next(false);
  }
}
