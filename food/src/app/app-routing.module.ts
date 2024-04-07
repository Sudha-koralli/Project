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

const routes: Routes = [
  { path: 'about', component: AboutComponent },
  { path: 'cart', component: CartComponent },
  {path:'login', component:LoginComponent },
  { path:'', component:LandingComponent },
  { path:'register', component:RegisterComponent },
  { path:'forgot', component:ForgotComponent },
  { path:'logout', component:LogoutComponent },
  {path:'user-profile',component:UserProfileComponent},
  {path:'profile',component:ProfileComponent},
  { path: '',   redirectTo: '/landing', pathMatch: 'full' },
  { path:'support',component:SupportComponent },
  { path:'dashboard',component:DashboardComponent,   },
  // canActivate: [AuthguardService],
  { path:'offer',component:OfferComponent },
  { path: 'my-orders', component: MyOrdersComponent },
  { path: 'confirm',component:OrderSuccessComponent},
  { path: 'checkout', component: PaymentComponent },
  { path: 'restaurant-menu/:restaurantId', component: RestaurantMenuComponent },
  {path:'category-menu/:categoryId',component:CategoryMenuComponent},
  { path: 'forgot-password', component: ForgotComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  // { path: '', redirectTo: '/forgot-password', pathMatch: 'full' }, 
  // { path: '**', redirectTo: '/forgot-password' }, 
  // { path: '', redirectTo: '/login', pathMatch: 'full' }, 
  // { path: '**', redirectTo: '/login' } ,
  {
    path: 'user-profile/:id',
    component: UserProfileComponent
  },
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
