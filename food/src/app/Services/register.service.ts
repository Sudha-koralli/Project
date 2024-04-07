import { Injectable } from '@angular/core';
import { RegistrationDTO } from '../models/register';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  private baseURL = "http://localhost:8080/fooddelivery/user/register";

  constructor(private httpClient: HttpClient) { }
 
  registerUser(registrationDTO: RegistrationDTO) {
    return this.httpClient.post(this.baseURL, registrationDTO);
  }
}
