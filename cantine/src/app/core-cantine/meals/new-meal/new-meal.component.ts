import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Route, Router } from '@angular/router';
import { Observable, Subscriber } from 'rxjs';
import { ValidatorComponent } from 'src/app/globalCompenets/validator/validator.component';
import { CantineHandlerService } from 'src/app/services/cantine-handler.service';
@Component({
  selector: 'app-new-meal',
  templateUrl: './new-meal.component.html',
  styleUrls: ['./new-mealStyle.scss'],
  providers : [CantineHandlerService] 

})
export class NewMealComponent implements OnInit{  

  newmeal: FormGroup = new FormGroup({
    mealname: new FormControl(''),
    mealdescription :  new FormControl(''),
    mealprice  :  new FormControl('' ),
    mealquantity  : new FormControl('' ), 
    mealcategory  : new FormControl(''),
    mealImage  :  new FormControl('')
  });

  submitted = false;
  validatQuantity =  true ; 
  image ! :  File; 

  constructor  (  private formBuilder: FormBuilder, private cantineHandlerService: CantineHandlerService, private route : Router ,private matDialog :  MatDialog) {}
  ngOnInit(): void {
    this.newmeal =  this.formBuilder.group({
      mealname : ['',[Validators.required ,  Validators.maxLength(16) ,Validators.minLength(3)] ],
      mealdescription :['',[Validators.required ,  Validators.maxLength(32) ,Validators.minLength(3)]],
      mealprice :  ['' ,  [Validators.required]],
      mealquantity : ['', [Validators.required]], 
      mealcategory :  ['' , [Validators.required]],
      mealImage : [ '', [Validators.required]]
    })
  }
   
       


  onSubmit()  :  void {
     this.submitted =  true ; 
     if  (this.newmeal.invalid)
          return ;  
  
    const result =  this.matDialog.open(ValidatorComponent, {
            data: { message: "Voulez Vous Vraiment enregistré  ce plat " }
      }) ;  
    
      result.afterClosed(). subscribe((result) =>{
        if  (result === 'oui' ){
          this.sendmeal(); 
        }
        else{
           return  ; 
        }
      })
    
     

  }


  get f(): { [key: string]: AbstractControl } {
    return this.newmeal.controls;
      }










  
  onChange = ($event : Event) =>{
      const target  = $event.target as HTMLInputElement ; 
      const file  : File =  (target.files as FileList)[0]
        this.image =  file  ;  
      } 
          
 

      
    sendmeal () :  void {
       
       const formData: FormData = new FormData(); 
       formData.append('image', this.image);
       formData.append('categorie',this.newmeal.controls['mealcategory'].value )
       formData.append('description', this.newmeal.controls['mealdescription'].value);
       formData.append('label', this.newmeal.controls['mealname'].value);
       formData.append('prixht',  this.newmeal.controls['mealprice'].value);
       formData.append('quantite' ,this.newmeal.controls['mealquantity'].value );

       
       this.cantineHandlerService.newMeal(formData).subscribe({
           next : next =>{
                if  (next.message == "SUCCESS" && next.httpStatus=="OK" && next.data !=undefined){
                     this.matDialog.open(ValidatorComponent, {
                        data: { message: "  Votre Plat à était Enregistré avec succée " }
                     }) ;  

                     this.route.navigate(['cantine/meals'], { queryParams: { reload: 'true' } });   
                }
                else{
                      console.log("ya  une erreur  ");
                      
                }
                 
              }, 

           error : error => {
            console.log("erreur");
            console.log(error);
            
            
              //  Le Traitement Des Erreurs ;  
           }
       })
        


    }  







} //  end of class 



