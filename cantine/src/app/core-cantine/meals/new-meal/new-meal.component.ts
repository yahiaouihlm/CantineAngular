import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
  image ! :  any; 

  constructor  (  private formBuilder: FormBuilder, private cantineHandlerService: CantineHandlerService  ) {}
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
      this.convertToBase64(file);      
      } 
          
  convertToBase64(file: File) {
      const observable =  new Observable((subscriber :  Subscriber<any> ) =>{
         this.readFile(file ,  subscriber)
      });      
      observable.subscribe ((res) =>{     
         this.image =  res ;
                
      })
    }
          
  readFile(file: File, subscriber: Subscriber<any>) {
      const filereader  =  new FileReader(); 
      filereader.readAsDataURL(file);
      filereader.onload = ()=>{
          subscriber.next (filereader.result)
          subscriber.complete();
       }
      filereader.onerror = () =>{
          subscriber.error();
          subscriber.complete()
       }
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

       this.cantineHandlerService.newMeal(meal).subscribe({
           next : next =>{
               // Attendre La réponse du  serveur   et traiter  les erreurs
                 console.log(next);
                 
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