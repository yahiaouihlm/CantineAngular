import { Component, OnInit } from '@angular/core';
import { BascketService } from './order-service/bascket.service';
import { Order } from './order-service/Order';
import { Router } from '@angular/router';
@Component({
  selector: 'app-orders',
  templateUrl:"./orders.component.html",
  styleUrls: ['./orders.componenet.scss'],
  providers : [BascketService]
})

export class OrdersComponent implements OnInit {

   order : Order =  new Order(); 

   constructor(private router : Router  ,   private  basket :  BascketService){} 
  ngOnInit(): void {
   let  bascket  = localStorage.getItem("Order"); 
   if (bascket){
     this.order = JSON.parse (bascket); 
   }
 
   
        
  }


  ValidateOrder(){
    console.log("vous  avez  Valider  votre commande ");
    
  }

  canalOrder() : void   {

    //   il   manque un  redirection 
     localStorage.removeItem('Order'); 
  }

  goTomeals() : void {
    this.router.navigate(['cantine/meals'])
  }
      
    goToOrder() : void {
      this.router.navigate(['cantine/menus'])

      }


   
}
