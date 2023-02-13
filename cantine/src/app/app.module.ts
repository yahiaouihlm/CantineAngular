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
import { TestComponent } from './test/test.component';
//import { CoreCantineModule } from './core-cantine/core-cantine.module';




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
    TestComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
