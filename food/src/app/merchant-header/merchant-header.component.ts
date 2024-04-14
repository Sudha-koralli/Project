import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-merchant-header',
  templateUrl: './merchant-header.component.html',
  styleUrls: ['./merchant-header.component.scss']
})
export class MerchantHeaderComponent implements OnInit {

  isLoggedIn: boolean = false;

  constructor() { }

  ngOnInit(): void {
    // Check if the merchant is logged in (you can implement this logic)
    this.isLoggedIn = true; // Example logic
  }

  onLogout() {
    // Implement logout logic
    this.isLoggedIn = false;
  }

  visitProfile() {
    // Implement logic to navigate to merchant profile
  }
}
