import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MerchantRestaurantService } from '../merchant-restaurant.service'; 
import { ItemService } from '../item.service'; 
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-restaurant-items',
  templateUrl: './update-restaurant-items.component.html',
  styleUrls: ['./update-restaurant-items.component.scss']
})
export class UpdateRestaurantItemsComponent implements OnInit {

  itemForm: FormGroup;
  restaurantId: number; 
  itemId: number;
  item: any;

  constructor(
    private fb: FormBuilder,
    private merchantRestaurantService: MerchantRestaurantService,
    private itemService: ItemService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.restaurantId = +sessionStorage.getItem('restaurantId');
    if (!this.restaurantId) {
      console.error('Restaurant ID not found in session storage');
      return;
    }
    this.itemId = +sessionStorage.getItem('itemId'); // Assuming itemId is stored in sessionStorage
    if (!this.itemId) {
      console.error('Item ID not found in session storage');
      return;
    }
    this.getItemDetails();
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

  getItemDetails(): void {
    this.itemService.getItemById(this.itemId).subscribe({
      next: (item: any) => {
        this.item = item; // Store item data
        // Patch the form with item data
        this.itemForm.patchValue({
          itemName: item.itemName,
          description: item.description,
          itemimageUrl: item.itemimageUrl,
          categoryId: item.categoryId,
          cost: item.cost
        });
      },
      error: (error) => {
        console.error('Error fetching item details:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to fetch item details. Please try again later.'
        });
      }
    });
  }

  updateRestaurantItems(): void {
    if (!this.item) {
      console.error('Item details not available');
      return;
    }
    this.merchantRestaurantService.updateRestaurantItems(this.item).subscribe({
      next: (data: any) => {
        console.log('Items updated successfully:', data);
        Swal.fire({
          icon: 'success',
          title: 'Items Updated',
          text: 'Restaurant items have been updated successfully.'
        });
      },
      error: (error) => {
        console.error('Error updating items:', error);
        Swal.fire({
          icon: 'error',
          title: 'Update Failed',
          text: 'An error occurred while updating restaurant items. Please try again later.'
        });
      }
    });
  }

  onCancel(): void {
    this.router.navigate(['/merchant-dashboard']);
  }
}
