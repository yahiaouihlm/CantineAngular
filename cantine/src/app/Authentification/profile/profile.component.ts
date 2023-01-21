import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SignService } from 'src/app/services/sign.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profileStyle.scss'], 
  providers : [SignService] 
})
export class ProfileComponent   implements OnInit {
   submitted =  false  ;
  
   user = { username : '' , userfname  : '' , email  :  '', birthday: new Date() , credit : 0 , creation : new Date}; 
   disable  =  true  ; 
   change =   false  ;  
   userinfo: FormGroup = new FormGroup({
    fullname: new FormControl( '', Validators.required    ),
    username: new FormControl('',  Validators.required  ),
    birthday : new FormControl('',  Validators.required   ),
    email: new FormControl('',  ),
  });
  formBuilder: any;
  
  
  constructor  (private route : Router ,  private signService: SignService){}
  ngOnInit(): void {

    this.getUserInfo();  //  charger  les  information  de utilisateur 
    this.userinfo.disable () ;
 
  } //  end  of  OnInt 

   getUserInfo () : void  {
       let email =localStorage.getItem('user')+'@social.aston-ecole.com'; 

       this.signService.getProfile(( { email} )).subscribe({
           next : next => {
                 if (next.message == "user" &&  next.httpStatus=="OK" &&  next.data != undefined  ){
                     console.log(  "user : => "   );
                     console.log(next.data); 
                     this.user.username = next.data.username ;   
                     this.user.userfname = next.data.userfname ;
                     this.user.creation =  next.data.creation ; 
                     this.user.credit =  next.data.credit; 
                     this.user.email =  next.data.email ;  
                     this.user.birthday = next.data.birthday ; 
                 }
                 else {
                  console.log(next);
                    this.deconnexion();  
                 }
           },
           error : error =>{
               this.deconnexion();  
                    
                    
           }
       })
   }






  onSubmit():  boolean{
    this.submitted = true;
    if (this.userinfo.invalid) {
      return  false   ;         
     }
      return true;  
  }



  validation (): void  {
   
   if  (!this.onSubmit()) 
       return;   
   this.userinfo.disable(); 
    this.change =  false ;  
    /**
     * 
     *   Il faut envoyer les information  au   Serveur 
     */
  }



  modifyProfile ():  void {
        this.userinfo.enable();
        this.change =  true ; 
  }

  

  deconnexion () : void  {
     localStorage.removeItem('Authorization'); 
     localStorage.removeItem('user'); 
     localStorage.removeItem('rol'); 
     this.route.navigate(['cantine']);
  }
  get f(): { [key: string]: AbstractControl } {
    return this.userinfo.controls;
      }
   
}
