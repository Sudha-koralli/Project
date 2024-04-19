// import { Component, OnInit } from '@angular/core';
// import { AddressService } from '../address.service';
// import { Address } from '../models/address';
// import { Router, ActivatedRoute } from '@angular/router';
// @Component({
//   selector: 'app-address-info',
//   templateUrl: './address-info.component.html',
//   styleUrls: ['./address-info.component.scss']
// })
// export class AddressInfoComponent implements OnInit {
//   userId: number;
//   addresses: Address[];
//   totalAmount: number;

//   constructor(private addressService: AddressService,private router: Router,private route: ActivatedRoute) { }

//   ngOnInit(): void {
//     // Get userId from session storage
//     const user = JSON.parse(sessionStorage.getItem('userId'));
//     if (user) {
//       this.userId = user.userId;
//       this.getAddressByUserId(this.userId);
//     }
//     this.route.queryParams.subscribe(params => {
//       this.totalAmount = params['totalAmount'];
//     });
//   }

//   getAddressByUserId(userId: number): void {
//     this.addressService.getAddressById(userId)
//       .subscribe(addresses => {
//         this.addresses = addresses;
//       });
//   }
 
//   selectAddress(address: Address): void {
//     // Implement functionality to handle the selection of the address
//     console.log('Address selected:', address);
//     // Navigate to the payment gateway route
//     this.router.navigate(['/paymentgateway'], { queryParams: { totalAmount: this.totalAmount } });
//   }
  
//   navigateToAddAddress(): void {
//     // Navigate to the '/address' page
//     this.router.navigate(['/adress']);
//   }
// }
import { Component, OnInit,ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AddressService } from '../address.service';
import { Address } from '../models/address';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-address-info',
  templateUrl: './address-info.component.html',
  styleUrls: ['./address-info.component.scss']
})
export class AddressInfoComponent implements OnInit {
  // @ViewChild('addressForm') addressFormRef!: ElementRef;
  userId: number;
  addresses: Address[];
  totalAmount: number;
  addressForm: FormGroup;
 addressId: number;

  constructor(
    private fb: FormBuilder,
    private addressService: AddressService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Get userId from session storage
    const user = JSON.parse(sessionStorage.getItem('userId'));
    if (user) {
      this.userId = user.userId;
      this.getAddressByUserId(this.userId);
    }
    this.route.queryParams.subscribe(params => {
      this.totalAmount = params['totalAmount'];
    });

    // Initialize the address form
    this.addressForm = this.fb.group({
      buildingName: ['', Validators.required,  Validators.pattern(/^[a-zA-Z]*$/),],
      streetName: ['', Validators.required],
      area: ['', Validators.required,  Validators.pattern(/^[a-zA-Z]*$/),],
      city: ['', Validators.required,  Validators.pattern(/^[a-zA-Z]*$/),],
      state: ['', Validators.required,  Validators.pattern(/^[a-zA-Z]*$/),],
      country: ['', Validators.required,  Validators.pattern(/^[a-zA-Z]*$/),],
      pinCode: ['', [Validators.required, Validators.pattern(/^\d{6}$/)]]
    });
  }

  getAddressByUserId(userId: number): void {
    this.addressService.getAddressById(userId).subscribe(addresses => {
      this.addresses = addresses;
      
    });
  }

  selectAddress(address: Address): void {
    console.log('Address selected:', address);
    this.router.navigate(['/paymentgateway'], {
      queryParams: { totalAmount: this.totalAmount }
    });
  }
  deleteAddress(address: any): void {
    const addressId = address.addressId; 
    this.addressService.deleteAddress(addressId)
      .subscribe(() => {
        Swal.fire('Success', 'Address deleted successfully', 'success').then(() => {
          this.getAddressByUserId(this.userId);
        });
      });
  }
  
  



  scrollToForm() {
    const addressForm = document.getElementById('addressForm');
    if (addressForm) {
      addressForm.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
  onSubmit(): void {
    if (this.addressForm.valid) {
      const userDataString = sessionStorage.getItem('userId');
      if (!userDataString) {
        console.error('userData not found in session storage');
        return;
      }

      const userData = JSON.parse(userDataString);
      const userId = userData.userId;

      if (!userId) {
        console.error('Invalid userId:', userId);
        return;
      }

      const addressData = { ...this.addressForm.value, userId };
      this.addressService.registerAddress(addressData).subscribe(() => {
        this.getAddressByUserId(this.userId);
        Swal.fire('Success', 'Address saved successfully', 'success').then(
          () => {
            this.router.navigate(['/payment-gateway']);
          }
        );
      });
    } else {
      this.markAllAsTouched();
    }
  }

  private markAllAsTouched(): void {
    Object.values(this.addressForm.controls).forEach(control => {
      control.markAsTouched();
    });
  }
}
