import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, of, tap } from 'rxjs';
import { Meal, MealAnser } from 'src/app/Models/meal';
import { CantineHandlerService } from 'src/app/services/cantine-handler.service';
import {ValidateUser} from 'src/app/globalCompenets/validator/validator.component';

@Component({
  selector: 'app-meals',
  templateUrl: './meals.component.html',
  styles: [],
  providers : [CantineHandlerService]
})
export class MealsComponent  implements OnInit{
   mealAnser !  :  MealAnser ; 
   meals: Meal[] | undefined   
   image :  File   | undefined; 
    
   user =  {
    token :  localStorage.getItem('Authorization'),
    role  :  localStorage.getItem('rol'),
    username :  localStorage.getItem('user')
}

 messageError = "Un problème est survenu ! Nous vous invitons à vous reconnecter. Si le problème persiste, veuillez contacter l'administration de votre école"
 constructor  (private route : Router ,  private cantineHandlerService  : CantineHandlerService) {}
  
  

  ngOnInit(): void {
    this.getMeals();  
  }
   
  
   
//  lire les plats  lu  depuis le serveru  
  getMeals() {
    this.cantineHandlerService.getMeal()
    .pipe(
      catchError((err) => this.handleError(err, null))
    )
        .subscribe({
             next  : next => {
                    if  (next.message  == "SENDED" && next.httpStatus == "OK" ) 
                            this.meals =  next.data ;              
                     else{
                       localStorage.clear ();
                       this.route.navigate(['cantine'], { queryParams: { reload: 'true' } });            
                      alert(this.messageError);

                     }
                },
                error : error => {
                 
                  if  (error.status == 403 && error.error.message=== "EXPIRED_TOKEN" && error.error.data==="EXPIRED_TOKEN" )                   {                    
                    localStorage.clear(); 
                    this.route.navigate(['cantine/ExpiredSession'], { queryParams: { reload: 'true' } }); 
                    return; 
                  }
                     
                  localStorage.clear ();
                  this.route.navigate(['cantine'], { queryParams: { reload: 'true' } });   
                  alert(this.messageError);
        

                }
});  
    }
  

    //  aller  vers  le  composant  (ajouter unn plat si  admin  souhaite ajouter un plat )

    addMeal() : void {
         this.route.navigate(['cantine/meals/addMeal'])
    }
   
    addToBascket (meal :  Meal){
      const token =  localStorage.getItem('token'); 
      if  (token == undefined || token == null ) {
            alert("Veuillez  Vous  connecter pour    faire une commande  "); 
            this.route.navigate(['cantine/signIn']);  
      }
    }    
    
    //  aller  vers  le composant (editer  le plat si  l'admin )
    editmeal(id:number) :  void  {
          this.route.navigate(['cantine/meals/editMeal',  id ])
    }



    
    private handleError(error: Error, errorValue: any) {
        throw error ; 
        return of(errorValue);
    }
   
}
 