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
   isAuthenticated =  false ; 
   token  :  string = '' ; 
   username  : string  =  '';  
   role :  string = ''; 
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
      this.login =  false  ;  
      return;
    }

     const User = {
       email : this.signinform.controls['email'].value ,
       password : this.signinform.controls['password'].value 
   } 
   
    this.signService.login(User)
    .subscribe({
        next : next => {
          if (next.Authorization!= undefined && next.Authorization!==''
              && next.message==='you are authenticated' && next.status ==='OK' && next.user!=undefined &&  next.role !=undefined
             ){
              console.log("token");
              console.log(next);
              this.token =  next.Authorization; 
              this.username = next.user
              this.isAuthenticated =  true ; 
              this.role = next.role ;
              localStorage.setItem('Authorization' , this.token);
              localStorage.setItem('user' ,  this. getUserNam(this.username))
              localStorage.setItem('role',  this.role)
              this.route.navigate(['cantine']);
          }
          else if  (next.Authorization== undefined && next.message == 'Authentication error'  &&
               next.status === 'FORBIDDEN'
          ){
            this.isAuthenticated =    false ;  
            console.log("VOUS  ETES PAS AUTHENTIFIER ");
            
          }
        }, 
        
        error : error =>   {
         
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
}
