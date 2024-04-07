export interface RegistrationDTO {
    firstName: string
    lastName: string 
    email: string;
    password: string;
    phoneNumber: string
    addressId:number;
    foodCartId:number;
    userid:number;
    address:Address;
  
  }
  
  export interface Address {
    addressId:number;
    buildingName: string;
    streetName: string;
    area: string;
    city: string;
    state: string;
    country: string;
    pinCode: number;
  }
