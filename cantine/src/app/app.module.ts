import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './core-cantine/home/home.component';
import { MainFooterComponent } from './globalCompenets/main-footer/main-footer.component';
import { MainNavComponent } from './globalCompenets/main-nav/main-nav.component';
import { SignInComponent } from './Authentification/sign-in/sign-in.component';
import { SignUpComponent } from './Authentification/sign-up/sign-up.component';
import { FormsModule } from '@angular/forms';
import {HttpClientModule}  from '@angular/common/http'; 
import { ReactiveFormsModule } from '@angular/forms';
@NgModule({
    declarations: [
        AppComponent,
        SignInComponent,
        MainNavComponent,
        MainFooterComponent,
        HomeComponent,
        SignUpComponent,
    ],
    providers: [],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule, 
        AppRoutingModule,
        ReactiveFormsModule

    ]
})
export class AppModule { }
