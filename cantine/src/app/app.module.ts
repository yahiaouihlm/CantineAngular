import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MainFooterComponent } from './globalCompenets/main-footer/main-footer.component';
import { MainNavComponent } from './globalCompenets/main-nav/main-nav.component';
import { SignInComponent } from './Authentification/sign-in/sign-in.component';
import { SignUpComponent } from './Authentification/sign-up/sign-up.component';
import { HomeComponent } from './core-cantine/home/home.component';
import { ProfileComponent } from './Authentification/profile/profile.component';
import {ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MealsComponent } from './core-cantine/meals/meals.component';
import { NewMealComponent } from './core-cantine/meals/new-meal/new-meal.component';
import { EditMealComponent } from './core-cantine/meals/edit-meal/edit-meal.component';
import { MenusComponent } from './core-cantine/menus/menus.component';
import { NewMenuComponent } from './core-cantine/menus/new-menu/new-menu.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { PlatListComponent } from './core-cantine/menus/plat-list/plat-list.component';
import { MatDialogModule}  from '@angular/material/dialog';
import { EditMenuComponent } from './core-cantine/menus/edit-menu/edit-menu.component';
import { ValidatorComponent } from './globalCompenets/validator/validator.component';
import { ExpiredSessionComponent } from './globalCompenets/expired-session/expired-session.component';
import { CommonModule } from '@angular/common';
import { EmailValidationComponent } from './Authentification/sign-up/email-validation/email-validation.component';
import { OrderDialComponent } from './core-cantine/orders/order-dial/order-dial.component';
import { OrdersComponent } from './core-cantine/orders/orders.component';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ForgetPasswordComponent } from './Authentification/forget-password/forget-password.component';


@NgModule({
  declarations: [
    AppComponent,
    MainFooterComponent,
    MainNavComponent,
    SignInComponent,
    SignUpComponent,
    HomeComponent,
    ProfileComponent,
    MealsComponent,
    NewMealComponent,
    EditMealComponent,
    MenusComponent,
    NewMenuComponent,
    PlatListComponent,
    EditMenuComponent,
    ValidatorComponent,
    ExpiredSessionComponent,
    EmailValidationComponent,
    OrderDialComponent,
    OrdersComponent,
    ForgetPasswordComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatDialogModule,
    MatCardModule,
    MatProgressSpinnerModule,
    HttpClientModule,
  ],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
