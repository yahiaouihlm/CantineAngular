import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainNavComponent } from './globalComponents/main-nav/main-nav.component';

const routes: Routes = [
  
  {path : '' ,  redirectTo:'/cantine',  pathMatch: 'full'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
