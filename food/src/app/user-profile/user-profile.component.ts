import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  userProfileForm: FormGroup;
  userid: number;
  user: any = {};
  successMessage: string = '';
  errorMessage: string = '';
  addressId: number; 

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.userid = JSON.parse(sessionStorage.getItem('userid')).userid; 
    this.addressId = JSON.parse(sessionStorage.getItem('addressId'));
    this.getUserDetails();
  }

  initForm(): void {
    this.userProfileForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.email],
      phoneNumber: ['', [Validators.required, Validators.pattern('[0-9]{10}')]],
      buildingName: [''],
      streetName: [''],
      area: [''],
      city: [''],
      state: [''],
      country: [''],
      pinCode: ['']
    });
  }

  getUserDetails(): void {
    this.userService.getUserById(this.userid).subscribe({
      next: (data: any) => {
        this.user = data;
        this.userProfileForm.patchValue({
          firstName: this.user.firstName,
          lastName: this.user.lastName,
          email: this.user.email,
          phoneNumber: this.user.phoneNumber,
          buildingName: this.user.address.buildingName,
          streetName: this.user.address.streetName,
          area: this.user.address.area,
          city: this.user.address.city,
          state: this.user.address.state,
          country: this.user.address.country,
          pinCode: this.user.address.pinCode
        });
      },
      error: (error: any) => {
        console.error('Error fetching user details:', error);
      }
    });
  }
  

  updateUser(): void {
    const userData = this.userProfileForm.value;
    this.userService.updateUser(this.userid, userData).subscribe({
      next: (data: any) => {
        console.log('User updated successfully:', data);
        Swal.fire({
          icon: 'success',
          title: 'Profile Updated',
          text: 'Your profile has been updated successfully.'
        });
      },
      error: (error) => {
        console.log('Error updating user:', error);
        Swal.fire({
          icon: 'error',
          title: 'Profile Update Failed',
          text: 'An error occurred while updating your profile. Please try again later.'
        });
      }
    });
  }

  updateAddress(): void {
    const addressData = this.userProfileForm.value;
    this.userService.updateAddress(this.addressId, addressData).subscribe({
      next: () => {
        Swal.fire('Success', 'Address updated successfully', 'success');
      },
      error: () => {
        Swal.fire('Error', 'Failed to update address', 'error');
      }
    });
  }


  onCancel(): void {
    this.router.navigate(['/dashboard']);
  }
}
