import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, of } from 'rxjs';
import { Menu } from 'src/app/Models/menu';
import { CantineHandlerService } from 'src/app/services/cantine-handler.service';

@Component({
  selector: 'app-menus',
  templateUrl:'./menus.component.html',
  styles: [
  ]
})
export class MenusComponent  implements OnInit{
    
  meuns: Menu[] = [];
  role :  string ='';
  constructor (private route :  Router,  private cantineHandlerService :  CantineHandlerService) {}
 
  ngOnInit(): void {

    let local =  localStorage.getItem("rol")
    if (local !=undefined)
      this.role =  local;    
     this.getmenus(); 
     console.log("je suis  la ");
     
     console.log(this.meuns);
     

  }
 

    

  getmenus()  {

    this.cantineHandlerService.getmenus ().pipe(
      catchError((err) => this.handleError(err, null))
    ).subscribe({
       next : next => {
         if  (next.httpStatus == "OK" && next.message == "SENDED" &&  next.data != undefined ){
                console.log(" iNFORMATION  DE MEAL  SONT  BIEN  LUES  ");
                console.log(next.data);
                this.meuns =  next.data ; 
                console.log(next.data.image);
                
         }    

         else {
            console.log("ya   une  erreur de réponse de serveur ");
            
         }
       },

       error :  error => {
                 console.log("erreur du  serveur ");
                 
       }
    }

    )
  }

     
  private handleError(error: Error, errorValue: any) {
    console.error(error);
    return of(errorValue);
  }
 

  editmenu ( idmenu : number ) {
       this.route.navigate(['cantine/menus/editMenu/',  idmenu ])
  }

  goToNewMenu () {
      this.route.navigate (['cantine/menus/addMenu']);
  }
}
