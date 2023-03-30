import { Injectable } from "@angular/core";
import { Meal } from "../../../Models/meal";
import { Menu } from "../../../Models/menu";


@Injectable()
export class Order  {
    meals :  Meal[] = []
    menus :  Menu  [] = []
}