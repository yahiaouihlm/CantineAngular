import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, of } from 'rxjs';
import { Menu } from 'src/app/Models/menu';
import { CantineHandlerService } from 'src/app/services/cantine-handler.service';
import { Order } from '../orders/order-service/Order';
import { MatDialog } from '@angular/material/dialog';
import { OrderDialComponent } from '../orders/order-dial/order-dial.component';

@Component({
  selector: 'app-menus',
  templateUrl:'./menus.component.html',
  styles: [
  ]
})
export class MenusComponent  implements OnInit{
  isLoading =  true  ;  
  meuns: Menu[] = [];
  private  order :  Order =  new Order(); 
  user = {
       role  :   localStorage.getItem('rol'),
       token :  localStorage.getItem('Authorization')
  }
  constructor (private route :  Router,  private cantineHandlerService :  CantineHandlerService, private dialog: MatDialog) {}
 
  ngOnInit(): void {

   
     this.getmenus(); 
     
    
     

  }
 

    

  getmenus()  {
      
    this.cantineHandlerService.getmenus ().pipe(
      catchError((err) => this.handleError(err, null))
    ).subscribe({
       next : next => {
        console.log(next);
        
       if  (next.httpStatus == "OK" && next.message == "SENDED" &&  next.data != undefined ){
                this.meuns =  next.data ; 
                this.isLoading = false ;                 
         }    

         else {
           alert("Nous  avons  rencontrer  un probléme de chargment de page  Sil vous plait ressayer ");
           localStorage.clear ();
            this.route.navigate(['cantine'], { queryParams: { reload: 'true' } });   
         }
        },

       error :  error => {  
        alert("Nous  avons  rencontrer  un probléme de chargment de page  Sil vous plait ressayer  si  le  probléme persiste  veuillez contacter  l'administeration  de votre ecole "); 
        console.log("hello ");
        
        localStorage.clear ();
        this.route.navigate(['cantine'], { queryParams: { reload: 'true' } });   
                 
       }
    }

    )
  }

     
  private handleError(error: Error, errorValue: any) {
     if (error) {
       throw "ERROR"
        
   }
    return of(errorValue);
  }
 

  editmenu ( idmenu : number ) {
       this.route.navigate(['cantine/menus/editMenu/',  idmenu ])
  }

  goToNewMenu () {
      this.route.navigate (['cantine/menus/addMenu']);
  }




  addToBascket (menu:  Menu){
 
    if  (this.user.token != null  && this.user.token != undefined && this.user.role === 'user' ){
        this.order.menus.push(menu);
        let bascket = localStorage.getItem('Order');
       if (!bascket){
            localStorage.setItem('Order' ,   JSON.stringify( this.order  ))
            sessionStorage.setItem('Order',  JSON.stringify(this.order))
       }else{  
             let smallbasket :  Order =  JSON.parse(bascket);   
             smallbasket.menus.push(menu);                  
          } 
                 
       this.dialog.open (OrderDialComponent, {
        data: { message: " Vous  avez Ajoute " + menu.label +"  à "+ menu.prixht + " £ " + "  A votre Panier " }
      });
       
  }
  else {
     alert( " Vous  dervriez  se connecter  pour  ajouter  au  panier  ")
     this.route.navigate(['cantine/signIn'] );   
  }


  
}    
}
