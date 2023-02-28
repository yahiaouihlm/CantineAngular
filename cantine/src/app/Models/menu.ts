import { Meal } from "./meal";

export interface MenuAnser {
    message : string ; 
    httpStatus  :   string ; 
    data  : Menu ; 
}

export class Menu {
    idmenu!:number; 
    label!:string;
    description!:string;
    prixht!:number;
    quantite!:number;
    status!:number; 
    image!:string; 
    plats : Meal []  =  []; 
}