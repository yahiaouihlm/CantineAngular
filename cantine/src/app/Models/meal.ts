export interface MealAnser {
    message : string ; 
    httpStatus  :   string ; 
    data  : Meal ;  
}

export class Meal {
    id!: number; 
    label!: string;
    description!: string; 
    categorie!: string; 
    prixht!: number;
    quantite!: number; 
    status!: number;
    image!:  string;  //  je  suis  pas sur  ;  

}


