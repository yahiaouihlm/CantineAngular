import { Component, OnInit } from '@angular/core';
import { AbstractControl, Form, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import Validation from './validation';
import { SignService } from 'src/app/services/sign.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: [ './signupStyle.scss'] , 
  providers : [SignService]
})
export class SignUpComponent  implements OnInit { 
     signupform: FormGroup = new FormGroup({
          fullname: new FormControl(''),
          username: new FormControl(''),
          birthday : new FormControl(''),
          email: new FormControl(''),
          password: new FormControl(''),
          confirmPassword: new FormControl(''),
          acceptTerms: new FormControl(false),
        });
        submitted = false;
        show =  true ;      // show if authentificated has been  done  
        authError =  false; // if  there  is any  authenticated problem show  the  html    div 
        existingUserEmail =  false;   //  if  the email alredy  exist  in  database 
       // serverAnser : Answer | undefined ;   


 constructor  (private formBuilder: FormBuilder, private signService : SignService,  private route :  Router){
 }
  ngOnInit(): void {
          this.signupform =  this.formBuilder.group({
          fullname: ['', 
                    [
                      Validators.required,
                      Validators.maxLength(16)
              ]
             ],
          username: [
               '',
               [
                 Validators.required,
                 Validators.minLength(3),
                 Validators.maxLength(20)
               ]
             ],
          birthday : ['' , Validators.required], 
          email: ['', [Validators.required, Validators.email,Validators.pattern('^[a-z0-9._%+-]+@social.aston-ecole.com')]],
          password: [
               '',
               [
                 Validators.required,
                 Validators.minLength(6),
                 Validators.maxLength(40)
               ]
             ],
         confirmPassword: ['', Validators.required],
         acceptTerms: [false, Validators.requiredTrue] 
        },
        {
          validators: [Validation.match('password', 'confirmPassword')]
        }
       );
     }
     get f(): { [key: string]: AbstractControl } {
    return this.signupform.controls;
      }
   onSubmit(): void {
    
          this.submitted = true;
          this.checkExisingEmail(); 
    
    
    
          if (this.signupform.invalid) {
    
               return  ;         
          }

   
          
        //  console.log('--- call  to service ------');
        //  this.signService.signUp(UserInfo).subscribe({
        //         next:  data  => console.log("data =>  " +  data), 
        //        error : error =>  this.authError =  true  
             
        //  }); 
         
        }


       


        onReset(): void {
          this.submitted = false;
          this.signupform.reset();
        }
      
        OnAnser () : boolean {
           return this.show ;  
        }
       
        getauthError () : boolean{
             return  this.authError;         
         }
       //yahiaoui@social.aston-ecole.com
       checkExisingEmail ()  :  boolean  {
           const Useremail  = {email : this.signupform.controls['email'].value}
           const exitUser  =  {message : 'existingUser' ,  httpStatus:'OK' ,  data:  'Exist'}
           const notExisting  =  {message : 'notexistingUser' ,  httpStatus:'OK' ,  data:  'Not Exist'} 
   
           this.signService.existingEmail(Useremail).subscribe({
               
               next : next => {
           
                
                    if (next.data  == exitUser.data && next.httpStatus == exitUser.httpStatus  && next.message == exitUser.message){
                         this.existingUserEmail =  true ;  
                         
                   
                    }
                
                            
                    else if (next.data  == notExisting.data && next.httpStatus == notExisting.httpStatus  && next.message == notExisting.message){
                            this.existingUserEmail =  false ; 
                            this.inscription () ; 

                    }
                    else {
                        console.log('ya une rreur ici  ');
                        
                    }
                
               }, 
               error :  error => {
                   console.log(" there  is  a error ");
                } 
            })
           

        
          
         return  this.existingUserEmail ;          
      }






     getExistingEmail () : boolean {
      return  this.existingUserEmail ; 
     }

      
     private inscription (): void {

      const  UserInfo: Object  = {
        username : this.signupform.controls['username'].value,
        fullname : this.signupform.controls['fullname'].value,
        password : this.signupform.controls['password'].value,
        email : this.signupform.controls['email'].value,
        birthday :  this.signupform.controls['birthday'].value
      }
       
      let  saved  =  {  message : 'saved  successfully',  httpStatus  :'OK', data :  null  }
     
      this.signService.signUp(UserInfo).subscribe({
       
           next : next =>   {
                
            } , 
           error : error => {console.log(error);}
           
      })

      
     }


     






    }

