import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { RegisterService } from '../Services/register.service';
import Swal from 'sweetalert2';
export class reg {
  firstName: string
  lastName: string
  email: string;
  password: string;
  phoneNumber: string;
  addressLine:string;
  city:string;
  state:string;
  country:string;
  pinCode:string;
 
}
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
 
export class RegisterComponent{
  registrationform!: FormGroup;
  user: reg;
  loading = false;
  submitted = false;
  error = '';
  constructor(private router: Router,private registerService: RegisterService) {
    this.user = {} as reg;
  }
 
  ngOnInit(): void {
    this.registrationform = new FormGroup({
      firstName: new FormControl(this.user.firstName, [
        Validators.required,
        Validators.minLength(4),
        Validators.pattern(/^[a-zA-Z]*$/),
      ]),
      lastName: new FormControl(this.user.lastName, [
        Validators.required,
        Validators.minLength(4),
        Validators.pattern(/^[a-zA-Z]*$/),
      ]),
      email: new FormControl(this.user.email, [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(250),
        Validators.pattern(
          /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
        ),
      ]),
      password: new FormControl(this.user.password, [
        Validators.required,
        Validators.minLength(6),
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/),
      ]),
      phoneNumber: new FormControl(this.user.phoneNumber, [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10),
        Validators.pattern(/^\d+$/),
      ]),
      addressLine: new FormControl(this.user.addressLine, [
        Validators.required,
        Validators.minLength(6),
      ]),
      city: new FormControl(this.user.city, [
        Validators.required,
        Validators.minLength(6),
        Validators.pattern(/^[a-zA-Z\s]*$/),
      ]),
      state: new FormControl(this.user.state, [
        Validators.required,
        Validators.minLength(6),
        Validators.pattern(/^[a-zA-Z\s]*$/),
      ]),
      country: new FormControl(this.user.country, [
        Validators.required,
        Validators.minLength(6),
        Validators.pattern(/^[a-zA-Z\s]*$/),
      ]),
      pinCode: new FormControl(this.user.pinCode, [
        Validators.required,
        Validators.minLength(6),
        Validators.pattern(/^\d+$/),
      ])
    });
  }
 
  get email() {
    return this.registrationform.get('email')!;
  }
 
  get password() {
    return this.registrationform.get('password');
  }
  get firstName() {
    return this.registrationform.get('firstName');
  }
  get lastName() {
    return this.registrationform.get('lastName');
  }
 
  get phoneNumber() {
    return this.registrationform.get('phoneNumber');
  }
  get addressLine() {
    return this.registrationform.get('addressLine');
  }
 
  get city() {
    return this.registrationform.get('city');
  }
 
  get state() {
    return this.registrationform.get('state');
  }
 
  get country() {
    return this.registrationform.get('country');
  }
 
  get pinCode() {
    return this.registrationform.get('pinCode');
  }
 
 
 
  registerUser() {
    this.user = this.registrationform.value
    this.registerService.registerUser(this.user).subscribe({
      next: (data) =>{
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Registration successful!'
        }).then
        this.router.navigate(['/login']);
      },
      error: (e) => {
        console.log(e);
        if (e.status === 200 || e.status === 201) {
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'Registration successful!'
          }).then
         
          this.router.navigate(['/login']);
         
}
    else {
          Swal.fire({
            icon: 'error',
            title: 'Oops',
            text: 'Email Id already exists!'
          }).then
          console.log("logged fail");
        }
      }
  });
  }
  // login(){
  //   this.router.navigate(['/login'])
  // }
}