import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { RouterModule, Routes } from '@angular/router';
import { MainNavComponent } from '../globalComponents/main-nav/main-nav.component';
import { MainFooterComponent } from '../globalComponents/main-footer/main-footer.component';


const routes :  Routes  =  [
  {path:"cantine" , component:HomeComponent }
]; 



@NgModule({
  declarations: [
    MainNavComponent,
    HomeComponent ,
    MainFooterComponent
  ],
  imports: [
    CommonModule,
   RouterModule.forChild(routes)
  ]
})
export class CoreCantineModule { }
