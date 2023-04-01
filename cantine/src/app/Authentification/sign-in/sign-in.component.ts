import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SignService } from 'src/app/services/sign.service';




@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: [ './signinStyle.scss'],   
  providers : [SignService] 
})
export class SignInComponent implements OnInit{
  
  signinform: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });  
   login  = false;
   isAuthenticated :  boolean | undefined ; 
   token  :  string = '' ; 
   username  : string  =  '';  
   rol :  string = ''; 
   isLoading =  false ;  
  constructor (private route  : Router ,  private formBuilder: FormBuilder , private signService: SignService ){}
  
  ngOnInit(): void {
    this.signinform =  this.formBuilder.group({
      email: ['', [Validators.required] ],
      password : ['' , [Validators.required]]
     })   

  }



  get f(): { [key: string]: AbstractControl } {
    return this.signinform.controls;
      }

  

  onSubmit () {
    this.login =  true ; 
    if (this.signinform.invalid) {      
      return;
    }

    this.isLoading =  true 
     const User = {
       email : this.signinform.controls['email'].value,
       password : this.signinform.controls['password'].value 
   } 
   
    this.signService.login(User)
    .subscribe({
        next : next => {
          if (next.Authorization!= undefined && next.Authorization!==''
              && next.message==='you are authenticated' && next.status ==='OK' && next.user!=undefined &&  next.role !=undefined
             ){
              this.isAuthenticated =  true ; 
              this.isLoading =  false ;
              console.log("token");
              console.log(next);
              this.token =  next.Authorization; 
              this.username = next.user
              this.rol = next.role ;
              localStorage.setItem('Authorization' , this.token);
              localStorage.setItem('user' ,  this. getUserNam(this.username))
              localStorage.setItem('rol',  this.rol)
              this.route.navigate(['cantine']);
          }
          else if  (next.Authorization== undefined && next.message == 'Authentication error'  &&
               next.status === 'FORBIDDEN'
                
          ){
            this.isAuthenticated =    false ;  
            this.isLoading =  false ;
            console.log("VOUS  ETES PAS AUTHENTIFIER ");
            
          }
        }, 
        
        error : error =>   {
          this.isLoading =  false ;
          alert('Une  ERREUR  produite lors du  chargement des Données  Réessayez  plus tart  si le problème persiste  veuillez contactez  L administration  de vorte  Ecole ')
           this.route.navigate(['cantine']);
           localStorage.clear(); 
          //  Ya une erreur il faut    faite la gestion des    erreurs 
          console.error(error)
        }  
    }) 
  }

  
  gotoSignUpPage  ( ){
    this.route.navigate(['cantine/signUp']);
  }

  getUserNam(username : string ) : string {
    return username.replace("@social.aston-ecole.com" ,'');
  }



  forgetpassword() : void  {
     this.route.navigate(['cantine/users/forgetpassword']);  
  }
}
