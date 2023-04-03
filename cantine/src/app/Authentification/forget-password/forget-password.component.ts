import { HttpStatusCode } from '@angular/common/http';
import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { OrderDialComponent } from 'src/app/core-cantine/orders/order-dial/order-dial.component';
import { UserOrderService } from 'src/app/services/user-order.service';
import { EmptyComponentComponent } from './empty-component.component';
import Validation from '../sign-up/validation';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss'],
  providers: [UserOrderService]
})
export class ForgetPasswordComponent {
  submitted = false; validate = false; incorrectCode = false; login =  false;  
  isLoading = false;
  chagepasswordComponent=false ;
  usernotfound = false;
  usercodecompenet = false;
  emailFrom: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@social.aston-ecole\.com\s*$")]),
  });
  codeForm: FormGroup = new FormGroup({ code: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")]) });

  changePassword: FormGroup = new FormGroup({
    newpassword: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(40)]),
    confirmnewPassword: new FormControl('', [Validators.required])
  },
    {
      validators: [Validation.match('newpassword', 'confirmnewPassword')]
    }


  )

  constructor(private userOrderService: UserOrderService, private route: Router, private matDialog: MatDialog) { }


  onSubmit(): void {
    this.submitted = true;
    this.isLoading = true;

    let email: string = this.emailFrom.controls["email"].value;
    if (email != undefined || email != null) {
      if (email.length > 0) {
        this.emailFrom.patchValue({
          email: email.trim()
        });
      }

    }

   console.log(this.emailFrom.invalid);
   
    if (this.emailFrom.invalid) {
      this.isLoading = false;
      return;
    }
    this.isLoading = true

    this.sendEmailToUpdateCode();
  }





  onSendcode() {
    this.validate = true;
    this.isLoading = true ; 
    if (this.codeForm.invalid) {
      this.isLoading=false; 
      return;
    }
    this.SendCodeToCheckEmail(); 
    
  }






  onSendpassword() {    
      this.login= true  ; 
      this.isLoading= true; 
      if (this.changePassword.invalid) {
        this.isLoading=false; 
        return;
      }
     this. sendNewPassword () ;      
  }












  get f(): { [key: string]: AbstractControl } {
    return this.emailFrom.controls;
  }
  get g(): { [key: string]: AbstractControl } {
    return this.codeForm.controls;
  }

  get h(): { [key: string]: AbstractControl } {
    return this.changePassword.controls;
  }



  /* Vérifier  si  utilisateru  existe  */
  sendEmailToUpdateCode(): void {
    let emailasobject: object = {
      email: this.emailFrom.controls["email"].value,
    }
    this.userOrderService.sendEmailToSendCode(emailasobject).subscribe({
      next: next => {
        if (next.message == "SENDED" && next.httpStatus == "OK" && next.data != undefined) {
          this.matDialog.open(EmptyComponentComponent, {
            data: { message: " Un Code Verification  vous  etiez envoyer à  " + this.emailFrom.controls["email"].value },
          });
          this.usercodecompenet = true;
          this.isLoading = false;

        }
        else {
          alert("Une  Erreur  Inattendu  c'est Produite   veuillez reéessez ultérieuremement ")
          localStorage.clear();
          this.route.navigate(['cantine/signIn']);
        }
      },

      error: error => {
        if (error.status == HttpStatusCode.NotFound) {
          this.usernotfound = true;
          this.isLoading = false;
          return;
        }
        else {
          alert("Une  Erreur  c'est Produite Probablement  Une Erreur de Connection  Au  Serveur  veuillez reéessez ultérieuremement ")
          localStorage.clear();
          this.route.navigate(['cantine/signIn']);
        }
      }

    })
  }

  /*Vérifier Si  Le code Est  Valide */
  SendCodeToCheckEmail(): void {
    let userinfoasObjet: object = {
      email: this.emailFrom.controls["email"].value,
      code: this.codeForm.controls['code'].value
    }
    this.userOrderService.sendCodeTocheckEmail(userinfoasObjet).subscribe({
      next: next => {
        if  (next.message == "FINDED" && next.httpStatus=="OK" && next.data !=undefined){
          this.usercodecompenet = false; 
          this.chagepasswordComponent =  true ; 
          this.isLoading = false  ; 
        }
        else{
          alert("Une Erreur c'est Produite Veuillez reéessez A Nouveau "); 
          localStorage.clear();
          this.route.navigate(['cantine/signIn']);
          return ; 
        }

      },
      error: error => {
        //  si  le  email  est incorrect  <normalement  si  impossible  puisque  c'est  le  2  composant  >
        if (error.status == HttpStatusCode.NotFound) {
          alert("Votre Email  Ne  corresponds Pas Veuillez reéessez ultérieuremement ");
          localStorage.clear();
          this.route.navigate(['cantine/signIn']);
          return;
        }
        // si  le  code est incorrect 
        else if (error.status == HttpStatusCode.BadRequest) {
          this.incorrectCode = true;
          this.isLoading = false ; 

          return;
        }
        //  si  le  code est Expiré  
        else if (error.status == HttpStatusCode.NotAcceptable) {
          this.matDialog.open(EmptyComponentComponent, {
            data: { message: " Un Code Verification Est  Expiré   Veuillez reéessez A Nouveau " },
          });

          localStorage.clear();
          this.route.navigate(['cantine/signIn']);
        }
        else {
          alert("Une Erreur  Inconnue  c'est produite Veuillez reéessez ultérieuremement ")
          localStorage.clear();
          this.route.navigate(['cantine/signIn']);
        }

      }
    }
    )


  }

  /* Proceder  au  changement de mot  de passe  */
  sendNewPassword () : void {
    let newUserInfo  : Object = {
      email :  this.emailFrom.controls["email"].value,
      code :  this.codeForm.controls['code'].value,
      password :  this.changePassword.controls["newpassword"].value
    };
     this.userOrderService.sendNewPassword (newUserInfo).subscribe({
         next :  next => {
             if (next.message == "CHANGED" && next.httpStatus=="OK" && next.data != undefined){
              this.matDialog.open(EmptyComponentComponent, {
                data: { message: " Votre Mot De Passe Est Correctement Changé "},
              }); 
              localStorage.clear();
              this.isLoading =  false ;
              this.route.navigate(['cantine/signIn']);
              return;
            }
             else{
              alert(" Une Erreur  S'est produite  Dans Le serveur Veuillez reéessez ultérieuremement ");
              localStorage.clear();
              this.isLoading =  false ; 
              this.route.navigate(['cantine/signIn']);
              return;
             }
         }, 
         error : error =>{
             if  (error.status == HttpStatusCode.NotFound) {
              alert("Votre Email  Ne  corresponds Pas Veuillez reéessez ultérieuremement ");
              localStorage.clear();
              this.route.navigate(['cantine/signIn']);
              return;
             }
             else if (error.status == HttpStatusCode.BadRequest){
              alert("Le code Est Incorrecte ou"+ error.error.message+"Veuillez reéessez ultérieuremement ");
              localStorage.clear();
              this.route.navigate(['cantine/signIn']);
              return; 
             }

             else if  (error.status == HttpStatusCode.NotAcceptable){
              alert(" Impossible de Valider  Votre Mot De passe Car  Le code  de Validation est Expiré Veuillez reéessez ultérieuremement ");
              localStorage.clear();
              this.route.navigate(['cantine/signIn']);
              return;  
            }

         } 
     });
  }

}
