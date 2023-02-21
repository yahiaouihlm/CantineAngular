import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { last, Observable, of } from 'rxjs';
import { Meal } from 'src/app/Models/meal';
import { CantineHandlerService } from 'src/app/services/cantine-handler.service';

@Component({
  selector: 'app-edit-meal',
  templateUrl: './edit-meal.component.html',
  styles: [
  ]
})



export class EditMealComponent implements OnInit {
 
   idmealtoupdate =""  ;
   submitted =  false ;
   meal =  { label : "" ,  description: "" , prixht:0 ,  quantite:0 , categorie: "" ,  image:"" } ; 

   newmeal: FormGroup = new FormGroup({
    mealname: new FormControl(''),
    mealdescription :  new FormControl(''),
    mealprice  :  new FormControl('' ),
    mealquantity  : new FormControl('' ), 
    mealcategory  : new FormControl(''),
    mealImage  :  new FormControl('')
  });
   /// meal :  Meal | null; 
    constructor  ( private router : ActivatedRoute,private route :   Router  ,private cantineHandlerService  : CantineHandlerService)  {}
 
   ngOnInit(): void {
      const param = this.router.snapshot.paramMap.get('id');
      if  (param==null || param == undefined) 
            this.idmealtoupdate = ""; 
      else{
            this.idmealtoupdate =  param ; 
         } 

      this.getmealToedit ();  
    
    
      
  }

   

   removeMeal( ) :  void {
      confirm ("Voulez-vous  Vraiment supprmier Difinitivement ce plat  "); 
        this.cantineHandlerService.removemealByid (this.idmealtoupdate).subscribe({
             next :  next => {
                    if  (next.message === "DELETED" && next.httpStatus == "OK"&& next.data !=undefined) {
                      this.route.navigate(['cantine/meals']);  
                      alert("Votre Plat à  Bien  éte supprimer ")
                        
                    }
                    else {
                      alert("Un erreur S'est produit  "); 
                    }
             },

             error : error => {    

             }
        }); 
   }


  get f(): { [key: string]: AbstractControl } {
    return this.newmeal.controls;
      }
  

      onChange (event :  Event){

      }

      onSubmit()  { 

      }


   getmealToedit () {
         this.cantineHandlerService.getmealByid(this.idmealtoupdate).pipe()
         .subscribe({
          next : next =>{
               if (next.data != undefined && next.httpStatus === "OK" &&  next.message === "FOUND"){
                     this.meal.label =  next.data.label; 
                     this.meal.categorie=  next.data.categorie; 
                     this.meal.description =  next.data.description;
                     this.meal.prixht =  next.data.prixht ; 
                     this.meal.quantite =  next.data.quantite; 
                     this.meal.image =  next.data.image;
                  }
                  else{
                    console.log("ya une erreur");
                    
                  }
                 
           }, 

      
         })

         console.log(this.meal);
         
   }  

  
}
