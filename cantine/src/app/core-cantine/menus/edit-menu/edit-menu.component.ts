import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Meal } from 'src/app/Models/meal';
import { Menu } from 'src/app/Models/menu';
import { CantineHandlerService } from 'src/app/services/cantine-handler.service';

@Component({
  selector: 'app-edit-menu',
  templateUrl: './edit-menu.component.html',
  styles: [],
  providers : [CantineHandlerService]
})
export class EditMenuComponent  implements OnInit{
 
   submitted =  false ;
   menuToedit =  { label : "" ,  description: "" , prixht:0 ,  quantite:0 , status:0 ,  image:"" , plats :  [ ] as Meal [] } ; 
   idmenuToUpdate!: string; 
   newmenu: FormGroup = new FormGroup({
    menuname: new FormControl(''),
    menudescription :  new FormControl(''),
    menuprice  :  new FormControl('' ),
    menuquantity  : new FormControl('' ), 
    menucategory  : new FormControl(''),
    menuImage  :  new FormControl('')
  });

    constructor (private router : ActivatedRoute ,  private  cantineHandlrService  : CantineHandlerService) {}

  ngOnInit(): void {
    const param = this.router.snapshot.paramMap.get('id');
    if  (param==null || param == undefined) 
          this.idmenuToUpdate = ""; 
    else{
          this.idmenuToUpdate =  param ; 
       } 
     this.cantineHandlrService.getmenuByid(this.idmenuToUpdate).subscribe({
           next : next =>{                     
            if  (next.message =="SENDED" && next.httpStatus =="OK" && next.data!=undefined){
                   this.menuToedit.status =  next.data.status;
                   this.menuToedit.description =  next.data.description; 
                   this.menuToedit.label =  next.data.label;
                   this.menuToedit.image =  next.data.image; 
                   this.menuToedit.prixht =  next.data.prixht ; 
                   this.menuToedit.quantite = next.data.quantite ; 
                   this.menuToedit.plats =  next.data.plats; 
                    
                  }
                  else {
                    console.log("ya une erreur  qui que part  La data  c'est pas  Egale ");
                    
                  }
           },
           error :  error =>{
            console.log("ya une erreur  qui que part ");

           }
     })
  }



  onSubmit(){
      console.log("hello world ");
      
  }


  
  onChange (event :  Event){
   
  }


  get f(): { [key: string]: AbstractControl } {
    return this.newmenu.controls;
      }
  
}
