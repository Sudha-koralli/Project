import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MerchantRestaurantService } from '../merchant-restaurant.service'; 
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-restaurant-items',
  templateUrl: './update-restaurant-items.component.html',
  styleUrls: ['./update-restaurant-items.component.scss']
})
export class UpdateRestaurantItemsComponent implements OnInit {

  itemForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private merchantRestaurantService: MerchantRestaurantService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.itemForm = this.fb.group({
      itemName: ['', Validators.required],
      description: ['', Validators.required],
      itemimageUrl: ['', Validators.required],
      categoryId: ['', Validators.required],
      cost: ['', Validators.required],
    });
  }

  updateRestaurantItems(): void {
    const restaurantId = sessionStorage.getItem('restaurantId'); // Retrieve restaurant ID from session storage
    if (!restaurantId) {
      console.error('Restaurant ID not found in session storage');
      return;
    }

    const itemData = this.itemForm.value;
    this.merchantRestaurantService.updateRestaurantItems(restaurantId, itemData).subscribe({
      next: (data: any) => {
        console.log('Item added successfully:', data);
        Swal.fire({
          icon: 'success',
          title: 'Item Added',
          text: 'Item has been added successfully.'
        });
      },
      error: (error) => {
        console.error('Error adding item:', error);
        Swal.fire({
          icon: 'error',
          title: 'Add Item Failed',
          text: 'An error occurred while adding item. Please try again later.'
        });
      }
    });
  }

  onCancel(): void {
    this.router.navigate(['/merchant-dashboard']);
  }
}
