import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ForgotService {
  sendEmail(email: string, arg1: string, arg2: string) {
    throw new Error('Method not implemented.');
  }
  constructor(private http: HttpClient) {}

  forgotPassword(email: string): Observable<any> {
    const apiUrl = 'http://localhost:8080/api/v/forgot-password{emai}';
    return this.http.put(apiUrl, { email });
  }
}