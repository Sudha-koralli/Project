import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MerchantRestaurantService } from '../merchant-restaurant.service'; // Assuming you have a service for managing restaurant data
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-restaurant',
  templateUrl: './update-restaurant.component.html',
  styleUrls: ['./update-restaurant.component.scss']
})
export class UpdateRestaurantComponent implements OnInit {
  restaurantForm: FormGroup;
  restaurantData: any; // This will hold the restaurant data retrieved from session storage

  constructor(
    private fb: FormBuilder,
    private merchantrestaurantService: MerchantRestaurantService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.restaurantForm = this.fb.group({
      merchantId: [{ value: '', disabled: true }],
      restaurantId: [{ value: '', disabled: true }],
      restaurantName: ['', Validators.required],
      managerName: ['', Validators.required],
      contact: ['', Validators.required],
      addressLine: ['',Validators.required],
      city: [''],
      state: [''],
      country: [''],
      pinCode: [''],
      restaurant_image_Url: ['']
    });
  }

  updateRestaurant(): void {
    const updatedRestaurantData = { ...this.restaurantForm.value };
    updatedRestaurantData.restaurantId = this.restaurantData.restaurantId;
    updatedRestaurantData.merchantId = this.restaurantData.merchantId;
  
    this.merchantrestaurantService.updateRestaurant(updatedRestaurantData).subscribe({
      next: (data: any) => {
        console.log('Restaurant updated successfully:', data);
        Swal.fire({
          icon: 'success',
          title: 'Restaurant Updated',
          text: 'Restaurant details have been updated successfully.'
        });
  
        
        this.merchantrestaurantService.getRestaurantByMerchantId(this.restaurantData.merchantId).subscribe({
          next: (updatedData: any) => {
            console.log('Updated restaurant data:', updatedData);
            this.restaurantForm.patchValue(updatedData);

            this.restaurantData = updatedData;
          },
          error: (error) => {
            console.error('Error fetching updated restaurant data:', error);
          
          }
        });
      },
      error: (error) => {
        console.error('Error updating restaurant:', error);
        Swal.fire({
          icon: 'error',
          title: 'Update Failed',
          text: 'An error occurred while updating restaurant details. Please try again later.'
        });
      }
    });
  }
  

  onCancel(): void {
    this.router.navigate(['/merchant-dashboard']);
  }

}
