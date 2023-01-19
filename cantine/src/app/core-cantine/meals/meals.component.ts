import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, of, tap } from 'rxjs';
import { Meal, MealAnser } from 'src/app/Models/meal';
import { CantineHandlerService } from 'src/app/services/cantine-handler.service';

@Component({
  selector: 'app-meals',
  templateUrl: './meals.component.html',
  styles: [],
  providers : [CantineHandlerService]
})

export class MealsComponent  implements OnInit{
   mealAnser !  :  MealAnser ; 
   meals: Meal[] | undefined
   role :  string ='';
   image :  File   | undefined;  
  constructor  (private route : Router ,  private cantineHandlerService  : CantineHandlerService) {}
 
 
  ngOnInit(): void {
    this.getMeals();  
    let local =  localStorage.getItem("role")
    if (local !=undefined)
      this.role =  local;   
    
  }

  
  getMeals() {
    this.cantineHandlerService.getMeal()
    .pipe(
      catchError((err) => this.handleError(err, null))
    )
        .subscribe({
             next  : next => {
                     this.meals =  next.data ;  
                   next.data.forEach((element : Meal) => {
                       // console.log(element.image)    
                   });
  }});  
    }

  
    private handleError(error: Error, errorValue: any) {
      console.error(error);
      return of(errorValue);
    }
   
}
