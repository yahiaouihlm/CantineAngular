import { Injectable } from "@angular/core";
import { Order } from "./Order";
import { Meal } from "src/app/Models/meal";



@Injectable({
    providedIn: 'root'
})

export class BascketService {
  private order : Order =  new Order(); 
    constructor() { }

    getOrder(): Order {
      return this.order;
    }

    setOrder(order: Order): void {
        this.order = order;
      }

    setMealInOrder (meal :  Meal ){
        this.order.meals.push (meal); 
    }

}