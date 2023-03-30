import { Component, OnInit } from '@angular/core';
import { BascketService } from './order-service/bascket.service';

@Component({
  selector: 'app-orders',
  templateUrl:"./orders.component.html",
  styles: [],
  providers : [BascketService]
})
export class OrdersComponent implements OnInit {


   constructor(private  basket :  BascketService){} 
  ngOnInit(): void {
     console.log("La valeur de panier  est  ");
     console.log(this.basket.getOrder());
     
     
  }

   
}
