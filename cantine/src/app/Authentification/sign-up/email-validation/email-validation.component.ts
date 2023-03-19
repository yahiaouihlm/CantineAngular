import { Component,OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SignService } from 'src/app/services/sign.service';

@Component({
  selector: 'app-email-validation',
  template: `
    <div class="center">
         <h2>   Merci  pour votre inscription !  pour la  complété et activer  votre compte vous  devriez activer votre Email </h2>
         <button class="btn" (click)="activateAcount()"> j'active Mon  Compte   </button>
        

    </div> 
  `,
  styles: [ ],
  providers: [SignService]
})
export class EmailValidationComponent implements  OnInit {
   UserEmail! : string | null  ; 
    
   constructor  (private router :  ActivatedRoute , private signService: SignService  ) {}
    
    ngOnInit(): void {
        this.UserEmail  =  this.router.snapshot.paramMap.get('useremail');   
       
    }

    activateAcount()  {
     let email =  this.UserEmail!=undefined ? this.UserEmail  : '' ;  
     this.signService.activateAcount(email).subscribe ({
        next :  next => {
              if  (next.message == "SECCESS"  && next.httpStatus ==  "OK" && next.data != undefined ){
                  alert("un  email  vous etait  envoyer  à  adresse " +  email ); 

              } else{
                  console.log("error   avec le if  donc c'est le serveur qui  réponds par error   ");
                  
              }
        }, 

        error :  error => {
          console.log("error   avec le if  donc c'est le serveur qui  réponds par error   ");
        }
     })
    } 
    
}



