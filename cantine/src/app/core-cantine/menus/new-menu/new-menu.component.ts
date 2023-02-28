import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CantineHandlerService } from 'src/app/services/cantine-handler.service';
import { MatDialog } from '@angular/material/dialog';
import { PlatListComponent } from '../plat-list/plat-list.component';
import { Meal } from 'src/app/Models/meal';
@Component({
  selector: 'app-new-meal',
  templateUrl: './new-menu.component.html',
  styles: [
  ]
})
export class NewMenuComponent {
  submitted = false;  
  clicked  =  false;  
  image ! :  File; 
  choosenmealformenu : Meal []   = [] ;  
  mealsIDs : number  [] = [] ;  
  newmenu: FormGroup = new FormGroup({
    menuname: new FormControl(''),
    menudescription :  new FormControl(''),
    menuprice  :  new FormControl('' ),
    menuquantity  : new FormControl('' ), 
    menuImage  :  new FormControl('')
  });
  
  constructor  (  private formBuilder: FormBuilder, private cantineHandlerService: CantineHandlerService,  private  route :Router  , private matDialog :  MatDialog) {}
  
  ngOnInit(): void {
    this.newmenu =  this.formBuilder.group({
      menuname : ['',[Validators.required ,  Validators.maxLength(16) ,Validators.minLength(3)] ],
      menudescription :['',[Validators.required ,  Validators.maxLength(32) ,Validators.minLength(3)]],
      menuprice :  ['' ,  [Validators.required]],
      menuquantity : ['', [Validators.required]], 
      menuImage : [ '', [Validators.required]]
    })
  }

  onSubmit()   {
    this.submitted =  true ; 
     if  ( this.choosenmealformenu.length ==0 ||this.newmenu.invalid )
          return ;  

         this.sendmenu ();

  }

  

  onOpenDialogClick()  {
      const result =  this.matDialog.open(PlatListComponent) ;  
      result.afterClosed(). subscribe((result) =>{
        if  (result ===  undefined )
             this.choosenmealformenu =  [] 
        else{
          this.choosenmealformenu   =  result ; 
        }    
             
        this.clicked =  true ;  
      })
      
  }


  get f(): { [key: string]: AbstractControl } {
    return this.newmenu.controls;
      }






        
   //  envoyer le le menu  
  sendmenu () :  void   {
     const formData : FormData = new FormData (); 
     formData.append('image',this.image);
     console.log(this.newmenu.controls['menuname'].value);
     
     formData.append('label', this.newmenu.controls['menuname'].value)
     formData.append('description', this.newmenu.controls['menudescription'].value)
     formData.append('prixht', this.newmenu.controls['menuprice'].value)
     formData.append('quantite', this.newmenu.controls['menuquantity'].value);
    this.mealsIDs.splice(0 ,  this.mealsIDs.length); 
     this.choosenmealformenu.forEach((meal : Meal) =>
       this.mealsIDs.push (+meal.id)
        )  
     const mealsJSON = JSON.stringify(this.mealsIDs);
      
    
     formData.append('mealsIDS', mealsJSON);
    
     
     this.cantineHandlerService.newMenu(formData).subscribe({
         next : next => {
          console.log(formData);
              console.log(formData);
              
             console.log("je suis dans le next  ");
             
             console.log(next);
             
         }
     });
  }
          

  onChange = ($event : Event) =>{
    const target  = $event.target as HTMLInputElement ; 
    const file  : File =  (target.files as FileList)[0]
      this.image =  file  ;  
    } 

}
