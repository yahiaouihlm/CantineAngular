import { Component, OnInit } from '@angular/core';
import { BascketService } from './order-service/bascket.service';
import { Order } from './order-service/Order';
import { Router } from '@angular/router';
import { Meal } from 'src/app/Models/meal';
import { Menu } from 'src/app/Models/menu';
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
   console.log(this.order);
   
   
        
  }


  ValidateOrder(){
    console.log("vous  avez  Valider  votre commande ");
    
  }

  canalOrder() : void   {

    //   il   manque un  redirection 
     localStorage.removeItem('Order');
     location.reload(); 
  }

  goTomeals() : void {
    this.router.navigate(['cantine/meals'])
  }
      
    goToOrder() : void {
      this.router.navigate(['cantine/menus'])

      }
 
  removeMealFromOrder (meal :  Meal ) {
    let  bascket  = localStorage.getItem("Order"); 
    if (bascket != undefined || bascket !=null ){
      this.order = JSON.parse (bascket); 
      let  index = this.order.meals.indexOf(meal); 
      this.order.meals.splice(index, 1);
      localStorage.setItem('Order', JSON.stringify (this.order) )
    }
  }


  removeMenuFromOrder(menu: Menu ){
    let  bascket  = localStorage.getItem("Order"); 
    if (bascket != undefined || bascket !=null ){
      this.order = JSON.parse (bascket); 
      let  index = this.order.menus.indexOf(menu); 
      this.order.menus.splice(index, 1);
      localStorage.setItem('Order', JSON.stringify (this.order) )
    }
  }

   
}
