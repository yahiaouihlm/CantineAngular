import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, of, tap } from 'rxjs';
import { Meal, MealAnser } from 'src/app/Models/meal';
import { CantineHandlerService } from 'src/app/services/cantine-handler.service';
import {ValidateUser} from 'src/app/globalCompenets/validator/validator.component';
import { Order } from '../orders/order-service/Order';
import { MatDialog } from '@angular/material/dialog';
import { OrderDialComponent } from '../orders/order-dial/order-dial.component';
import { BascketService } from '../orders/order-service/bascket.service';


@Component({
  selector: 'app-meals',
  templateUrl: './meals.component.html',
  styles: [],
  providers : [CantineHandlerService ,  BascketService ]
})
export class MealsComponent  implements OnInit{
   mealAnser !  :  MealAnser ; 
   meals: Meal[] | undefined   
   image :  File   | undefined; 
   order : Order= new Order();
   user =  {
    token :  localStorage.getItem('Authorization'),
    role  :  localStorage.getItem('rol'),
    username :  localStorage.getItem('user')
}

 messageError = "Un problème est survenu ! Nous vous invitons à vous reconnecter. Si le problème persiste, veuillez contacter l'administration de votre école"
 constructor  (private route : Router ,  private cantineHandlerService  : CantineHandlerService , private  basket :  BascketService,  private dialog: MatDialog ) {}
  
  

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
   
  
    //  aller  vers  le composant (editer  le plat si  l'admin )
    editmeal(id:number) :  void  {
          this.route.navigate(['cantine/meals/editMeal',  id ])
    }



    
    private handleError(error: Error, errorValue: any) {
        throw error ; 
        return of(errorValue);
    }





    addToBascket (meal :  Meal){
 
        if  (this.user.token != null  && this.user.token != undefined && this.user.role === 'user' ){
            this.order.meals.push(meal);
            let bascket = localStorage.getItem('Order');            
           if (!bascket){                
               localStorage.setItem('Order' ,   JSON.stringify( this.order  ))
           }else{  
             let smallbasket :  Order =  JSON.parse(bascket);   
             smallbasket.meals.push(meal);                  
                localStorage.setItem('Order' ,   JSON.stringify( smallbasket ))
              } 
                     
           this.dialog.open (OrderDialComponent, {
            data: { message: " Vous  avez Ajoute " + meal.label +"  à "+ meal.prixht + " £ " + "  A votre Panier " }
          });
           
      }
      else {
         alert( " Vous  dervriez  se connecter  pour  ajouter  au  panier  ")
         this.route.navigate(['cantine/signIn'] );   
      }


      
    }    
    

    
   
}
 
