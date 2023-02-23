import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CantineHandlerService } from 'src/app/services/cantine-handler.service';
import { MatDialog } from '@angular/material/dialog';
import { PlatListComponent } from '../plat-list/plat-list.component';
@Component({
  selector: 'app-new-meal',
  templateUrl: './new-menu.component.html',
  styles: [
  ]
})
export class NewMenuComponent {
  ListMeal : [] | undefined ; 
  submitted = false;  
  image ! :  File; 
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

  }

  

  onOpenDialogClick()  {
      this.matDialog.open(PlatListComponent) ;  
  }


  get f(): { [key: string]: AbstractControl } {
    return this.newmenu.controls;
      }





  onChange = ($event : Event) =>{
    const target  = $event.target as HTMLInputElement ; 
    const file  : File =  (target.files as FileList)[0]
      this.image =  file  ;  
    } 
        

}
