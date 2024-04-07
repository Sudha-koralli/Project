import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LandingComponent } from './landing/landing.component';
import { LogoutComponent } from './logout/logout.component';
import { OfferComponent } from './offer/offer.component';
import { SupportComponent } from './support/support.component';
import { ProfileComponent } from './profile/profile.component';
import { ForgotComponent } from './forgot/forgot.component';
import { CartComponent } from './cart/cart.component';
import { FooterComponent } from './footer/footer.component';
import { MyOrdersComponent } from './orders/my-orders/my-orders.component';
import { OrderSuccessComponent } from './orders/order-success/order-success.component';
import { PaymentComponent } from './orders/payment/payment.component';
import { HeaderComponent } from './header/header.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { AboutComponent } from './about/about.component';
import { RestaurantMenuComponent } from './restaurant-menu/restaurant-menu.component';
import { CategoryMenuComponent } from './category-menu/category-menu.component';
import { MerchantRegComponent } from './merchant-reg/merchant-reg.component';

@NgModule({
  declarations: [
    AppComponent,
    MyOrdersComponent,
    OrderSuccessComponent,
    PaymentComponent,
    FooterComponent,
    CartComponent,
    LoginComponent,
    LandingComponent,
    RegisterComponent,
    ForgotComponent,
    DashboardComponent,
    LogoutComponent,
    OfferComponent,
    SupportComponent,
    ProfileComponent,
    FooterComponent,
    HeaderComponent,
    UserProfileComponent,
    ResetPasswordComponent,
    AboutComponent,
    RestaurantMenuComponent,
    CategoryMenuComponent,
    MerchantRegComponent,
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FontAwesomeModule,
    FormsModule,
 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
