
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { SearchService } from '../Services/search.service';
import { LoginService } from '../Services/login.service';
export class register {
  email: string;
  password: string;
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isLoggedIn: boolean = false;
  displayName: string = '';
  isAdmin: boolean = false;
  showSearch: boolean = false;
  searchResults: any[] = [];
  restaurants: any[];
  selectedRestaurant: any;
  searchName: string;
  searchId: number;
  query: string = '';
  constructor( private router: Router, public userService:UserService,private searchService: SearchService,
    private loginservice: LoginService) {
     }

  ngOnInit(): void 
  {
   }

     onLogin(){
        this.router.navigate(['/login']).then((next)=>{
          this.isLoggedIn = true        })
     }
    
  onLogOut() {
    this.loginservice.logout();
    this.router.navigate(['/login']);
  }
  
  visitProfile() {
    let _name: string;
    this.router.navigate(['user-profile']);
  
  }
  // onMyCart() {
  //   this.router.navigate(['cart']);
  // }
  onMyOrders() {
    this.router.navigate(['my-orders']);
  }

  toggleSearch(): void {
    this.showSearch = !this.showSearch;
    if (!this.showSearch) {
      this.searchResults = [];
      this.query = '';
    }
  }

  search(): void {
    if (this.query.trim() === '') {
      this.searchResults = []; 
      return;
    }
  }
  //   // Perform search
  //   this.searchService.searchRestaurants(this.query).subscribe(
  //     (results) => {
  //       this.searchResults = results;
  //     },
  //     (error) => {
  //       console.error('Error occurred while searching:', error);
  //     }
  //   );
  // }
  // toggleSearch(): void {
  //   this.showSearch = !this.showSearch;
  //   if (!this.showSearch) {
  //     this.searchResults = [];
  //     this.query = '';
  //   }
  // }

  // search(): void {
  //   if (this.query.trim() === '') {
  //     this.searchResults = []; 
  //     return;
  //   }

  //   // Perform search
  //   this.searchService.searchRestaurants(this.query).subscribe(
  //     (results) => {
  //       this.searchResults = results;
  //     },
  //     (error) => {
  //       console.error('Error occurred while searching:', error);
  //     }
  //   );
  // }

  // searchByName(name: string): void {
  //   this.searchService.searchByName(name).subscribe(restaurants => {
  //     this.restaurants = restaurants;
  //   });
  // }
 
  // getById(id: number): void {
  //   this.searchService.getById(id).subscribe(restaurant => {
  //     this.selectedRestaurant = restaurant;
  //   });
  // }
}
