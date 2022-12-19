import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SignInComponent } from './sign-in/sign-in.component';


const routes: Routes = [
  {path :'cantine/signIn',  component : SignInComponent}, 
  {path :'cantine' ,  component:HomeComponent },
  {path : '' ,  redirectTo:'/cantine',  pathMatch: 'full'}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
