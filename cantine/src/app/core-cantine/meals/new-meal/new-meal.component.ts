import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { Observable, Subscriber } from 'rxjs';
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

  constructor  (  private formBuilder: FormBuilder, private cantineHandlerService: CantineHandlerService,  private  route :Router  ) {}
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
  
    confirm("veuillez confirmer  L'enregistrement du plat "); 
    
    this.sendmeal(); 
     

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
       const  meal :  object = {
        categorie : this.newmeal.controls['mealcategory'].value,
        description :  this.newmeal.controls['mealdescription'].value,
        label : this.newmeal.controls['mealname'].value,
        prixht :  this.newmeal.controls['mealprice'].value,
        quantite :  this.newmeal.controls['mealquantity'].value,
        image :  this.image
       } 

       
       const formData: FormData = new FormData(); 
    formData.append('image', this.image);
       formData.append('categorie',this.newmeal.controls['mealcategory'].value )
       formData.append('description', this.newmeal.controls['mealdescription'].value);
       formData.append('label', this.newmeal.controls['mealname'].value);
       formData.append('prixht',  this.newmeal.controls['mealprice'].value);
       formData.append('quantite' ,this.newmeal.controls['mealquantity'].value );
       this.cantineHandlerService.newMeal(formData).subscribe({
           next : next =>{
               // Attendre La réponse du  serveur   et traiter  les erreurs
               window.location.href = 'http://localhost:4200/cantine/meals'
               
               alert('Votre Plat à  éte parfaitement enregistrer '); 
                 
              }, 

           error : error => {
            console.log("erreur");
            console.log(error);
            
            
              //  Le Traitement Des Erreurs ;  
           }
       })
        


    }  







} //  end of class 



// onChange = async ($event : Event) =>{
//   const target  = $event.target as HTMLInputElement ; 
//   const file  : File =  (target.files as FileList)[0]
//   console.log(this.image);
  
// } 

// convertToBase64(file: File) {
//   const observable =  new Observable((subscriber :  Subscriber<any> ) =>{
//   this.readFile(file ,  subscriber)
//   });

//   observable.subscribe ((res) =>{
//       this.image =  res ;
      
//   })
// }


// readFile(file: File, subscriber: Subscriber<any>) {
// const filereader  =  new FileReader(); 
// filereader.readAsDataURL(file);
// filereader.onload = ()=>{
//   subscriber.next (filereader.result)
//   subscriber.complete();
// }
// filereader.onerror = () =>{
// subscriber.error();
// subscriber.complete()
// }
// }