import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './core-cantine/home/home.component';
import { SignInComponent } from './Authentification/sign-in/sign-in.component';
import { SignUpComponent } from './Authentification/sign-up/sign-up.component';
import { ProfileComponent } from './Authentification/profile/profile.component';
import { MealsComponent } from './core-cantine/meals/meals.component';
import { NewMealComponent } from './core-cantine/meals/new-meal/new-meal.component';
import { EditMealComponent } from './core-cantine/meals/edit-meal/edit-meal.component';
import { MenusComponent } from './core-cantine/menus/menus.component';
import { NewMenuComponent } from './core-cantine/menus/new-menu/new-menu.component';
import { EditMenuComponent } from './core-cantine/menus/edit-menu/edit-menu.component';
import { ExpiredSessionComponent } from './globalCompenets/expired-session/expired-session.component';
import { EmailValidationComponent } from './Authentification/sign-up/email-validation/email-validation.component';
import { OrdersComponent } from './core-cantine/orders/orders.component';
import { ForgetPasswordComponent } from './Authentification/forget-password/forget-password.component';
import { BasketAdminComponent } from './Admin/basket-admin/basket-admin.component';


const routes: Routes = [
  {path :'cantine/signIn',  component : SignInComponent}, 
  {path: 'cantine/signUp', component :  SignUpComponent},
  {path : 'cantine/meals' , component :  MealsComponent},
  {path :  'cantine/meals/addMeal', component :  NewMealComponent},
  {path : 'cantine/meals/editMeal/:id' , component :  EditMealComponent}, 
  {path : 'cantine/menus',  component : MenusComponent},
  {path : 'cantine/menus/addMenu',  component : NewMenuComponent},
  {path : 'cantine/menus/editMenu/:id' , component : EditMenuComponent},
  {path: 'cantine/user/myprofile', component : ProfileComponent},
  {path :  'cantine/user/panier',  component :  OrdersComponent},
  {path :'cantine' ,  component:HomeComponent },
  {path :  'cantine/ExpiredSession' , component : ExpiredSessionComponent},
  {path : 'cantine/users/forgetpassword',  component :  ForgetPasswordComponent},
  {path :  'cantine/user/ActivatiedAcount/:useremail',  component :  EmailValidationComponent}, 
  {path :  'cantine/admin/baskets',  component :  BasketAdminComponent},
  {path : '' ,  redirectTo:'/cantine',  pathMatch: 'full'}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
