export interface Restaurant {
     restaurantId:number;
    restaurantName: string;
    rating: number;
    address: Address; 
    managerName: string;
    contact: string;
    restaurant_image_Url: string; 
    route: string; 
  }
  
  export interface Address {
    buildingName: string;
    streetName: string;
    area: string;
    city: string;
    state: string;
    country: string;
    pinCode: number;
  }

