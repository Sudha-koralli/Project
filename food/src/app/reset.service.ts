import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ResetService {

  private baseURL = "http://localhost:8080/api/v/set-password";

  constructor(private httpClient: HttpClient) { }

  setPassword(email: string, newPassword: string, confirmPassword: string) {
    return this.httpClient.put(`${this.baseURL}`, { email, newPassword, confirmPassword });
  }
}