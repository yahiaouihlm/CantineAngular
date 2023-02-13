import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Meal } from 'src/app/Models/meal';
import { CantineHandlerService } from 'src/app/services/cantine-handler.service';

@Component({
  selector: 'app-edit-meal',
  templateUrl: './edit-meal.component.html',
  styles: [
  ]
})



export class EditMealComponent implements OnInit {
 
   idmealtoupdate:string | null | undefined   ;
   submitted =  false ;
   meal!:  Meal ;   
   newmeal: FormGroup = new FormGroup({
    mealname: new FormControl(''),
    mealdescription :  new FormControl(''),
    mealprice  :  new FormControl('' ),
    mealquantity  : new FormControl('' ), 
    mealcategory  : new FormControl(''),
    mealImage  :  new FormControl('')
  });
   /// meal :  Meal | null; 
    constructor  ( private router : ActivatedRoute, private cantineHandlerService  : CantineHandlerService)  {}
 
   ngOnInit(): void {
      const param = this.router.snapshot.paramMap.get('id');
      this.idmealtoupdate =  param ; 
      
      
  }

   

  get f(): { [key: string]: AbstractControl } {
    return this.newmeal.controls;
      }
  

      onChange (event :  Event){

      }

      onSubmit()  { 

      }
   

    getMealToUpdate  ()  {
         this.cantineHandlerService.
    }
}
