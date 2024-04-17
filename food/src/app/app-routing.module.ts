import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LandingComponent } from './landing/landing.component';
import { RegisterComponent } from './register/register.component';
import { ForgotComponent } from './forgot/forgot.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LogoutComponent } from './logout/logout.component';
import { OfferComponent } from './offer/offer.component';
import { SupportComponent } from './support/support.component';
import { MyOrdersComponent } from './orders/my-orders/my-orders.component';
import { OrderSuccessComponent } from './orders/order-success/order-success.component';
import { PaymentComponent } from './orders/payment/payment.component';
import { ProfileComponent } from './profile/profile.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { CartComponent } from './cart/cart.component';
import { AuthguardService } from './Services/authguard.service';
import { AboutComponent } from './about/about.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { RestaurantMenu } from '@material-ui/icons';
import { RestaurantMenuComponent } from './restaurant-menu/restaurant-menu.component';
import { CategoryMenuComponent } from './category-menu/category-menu.component';
import { MerchantRegComponent } from './merchant-reg/merchant-reg.component';
import { MerchantLoginComponent } from './merchant-login/merchant-login.component';
import { MerchantDashboardComponent } from './merchant-dashboard/merchant-dashboard.component';
import { MerchantRestaurantInfoComponent } from './merchant-restaurant-info/merchant-restaurant-info.component';
import { AddItemsComponent } from './add-items/add-items.component';
import { ViewRestaurantComponent } from './view-restaurant/view-restaurant.component';
import { ViewRestaurantItemsComponent } from './view-restaurant-items/view-restaurant-items.component';
import { UpdateRestaurantItemsComponent } from './update-restaurant-items/update-restaurant-items.component';
import { MerchantHeaderComponent } from './merchant-header/merchant-header.component';
import { UpdateRestaurantComponent } from './update-restaurant/update-restaurant.component';
import { PaymentgatewayComponent } from './paymentgateway/paymentgateway.component';
import { ViewOrdersComponent } from './view-orders/view-orders.component';

const routes: Routes = [
  {path:'add-items',component:AddItemsComponent},
  {path:'update-restaurant-items/:itemId',component:UpdateRestaurantItemsComponent},
  {path:'update-restaurant/:restaurantId',component:UpdateRestaurantComponent},
  {path:'paymentgateway',component:PaymentgatewayComponent},
  {path:'view-orders',component:ViewOrdersComponent},
  {path:'view-restaurant',component:ViewRestaurantComponent},
  {path:'view-restaurant-items',component:ViewRestaurantItemsComponent},
  { path: 'about', component: AboutComponent },
  { path: 'cart', component: CartComponent },
  {path:'login', component:LoginComponent },
  { path:'', component:LandingComponent },
  { path:'register', component:RegisterComponent },
  { path:'merchant-reg', component:MerchantRegComponent },
  { path:'merchant-login', component:MerchantLoginComponent },
  { path:'merchant-dashboard', component:MerchantDashboardComponent },
  { path:'merchant-restaurant-info', component:MerchantRestaurantInfoComponent},
  {path:'merchant-header',component:MerchantHeaderComponent},
  { path:'forgot', component:ForgotComponent },
  { path:'logout', component:LogoutComponent },
  {path:'user-profile',component:UserProfileComponent},
  {path:'profile',component:ProfileComponent},
  { path: '',   redirectTo: '/landing', pathMatch: 'full' },
  { path:'support',component:SupportComponent },
  { path:'dashboard',component:DashboardComponent ,canActivate: [AuthguardService]},
  // { path:'offer',component:OfferComponent },
  { path: 'my-orders', component: MyOrdersComponent },
  { path: 'confirm',component:OrderSuccessComponent},
  { path: 'checkout', component: PaymentComponent },
  { path: 'restaurant-menu/:restaurantId', component: RestaurantMenuComponent },
  {path:'category-menu/:categoryId',component:CategoryMenuComponent},
  { path: 'forgot-password', component: ForgotComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  
  {
    path: 'user-profile/:userId',
    component: UserProfileComponent
  },
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
