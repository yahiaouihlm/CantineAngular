import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { catchError, of } from 'rxjs';
import { Meal } from 'src/app/Models/meal';
import { CantineHandlerService } from 'src/app/services/cantine-handler.service';

@Component({
  selector: 'app-plat-list',
  templateUrl: './plat-list.component.html',
  styles: [
  ],

  providers : [CantineHandlerService]
})
export class PlatListComponent implements  OnInit{
  meals: Meal[] | undefined;  
  clicked =  false  ;   
  selectedmeals : Meal []  =  [];  


constructor  (private cantineHandlerService  : CantineHandlerService, private dialogRef: MatDialogRef<PlatListComponent>   ) {}
  ngOnInit(): void {
    this.getMeals() ;  
  }
   

  getMeals() {
    this.cantineHandlerService.getMeal()
    .pipe(
      catchError((err) => this.handleError(err, null))
    )
        .subscribe({
             next  : next => {
                    if  (next.message  == "LIST" && next.httpStatus == "OK" ) 
                            this.meals =  next.data ;              
                     else{
                         console.log("erreur");
                         
                     }
                    // next.data.forEach((element : Meal) => {
                        //  console.log(element.image.image)    
                      //});
  }});  
    }

    addToList(pmeal :  Meal )   {
      this.selectedmeals.push(pmeal); 
        
    }
    
    checkexistingmeal( meal :  Meal ) :  Boolean {
         const fined  =  this.selectedmeals.find(element   => element.id ===  meal.id ); 
         return  fined ? true  :   false
    }

    restselectedmeals()  {
      this.selectedmeals.splice(0 ,  this.selectedmeals.length);
    }

    closeDialog() {
      this.dialogRef.close(this.selectedmeals); 
    }


    private handleError(error: Error, errorValue: any) {
      console.error(error);
      return of(errorValue);
    } 


}
