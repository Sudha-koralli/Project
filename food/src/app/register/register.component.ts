import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterService } from '../Services/register.service';
import { RegistrationDTO } from '../models/register';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent {
  registrationform!: FormGroup;
  user: RegistrationDTO;
  loading = false;
  submitted = false;
  error = '';

  constructor(private router: Router, public registerService: RegisterService) {
    this.user = {} as RegistrationDTO;
  }

  ngOnInit(): void {
    this.registrationform = new FormGroup({
      firstName: new FormControl(this.user.firstName, [
        Validators.required,
        Validators.minLength(4),
        Validators.pattern('[A-Za-z]+')
      ]),
      lastName: new FormControl(this.user.lastName, [
        Validators.required,
        Validators.minLength(4),
        Validators.pattern('[A-Za-z]+')
      ]),
      phoneNumber: new FormControl(this.user.phoneNumber, [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10),
        Validators.pattern(/^\d+$/),
      ]),
      password: new FormControl(this.user.password, [
        Validators.required,
        Validators.minLength(6),
      ]),
      email: new FormControl(this.user.email, [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(250),
        Validators.pattern(
          /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
        ),
      ]),
      buildingName: new FormControl(this.user.address?.buildingName), 
      streetName: new FormControl(this.user.address?.streetName),
      area: new FormControl(this.user.address?.area), 
      city: new FormControl(this.user.address?.city), 
      state: new FormControl(this.user.address?.state), 
      country: new FormControl(this.user.address?.country), 
      pinCode: new FormControl(this.user.address?.pinCode) 
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
  get buildingName() {
    return this.registrationform.get('buildingName');
  }
  
  get streetName() {
    return this.registrationform.get('streetName');
  }
  
  get area() {
    return this.registrationform.get('area');
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
    this.user = this.registrationform.value;
    this.registerService.registerUser(this.user).subscribe(
      () => {
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Registration successful!'
        }).then(() => {
          this.router.navigate(['/login']);
        });
      },
      (error) => {
        let errorMessage = 'Registration failed. Please try again later.';
        if (error.status === 409) {
          errorMessage = 'Email already exists. Please use a different email address or login!';
        }
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: errorMessage
        });
      }
    );
  }
  login() {
    this.router.navigate(['/login']);
  }
}
