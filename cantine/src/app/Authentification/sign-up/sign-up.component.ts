import { Component, OnInit } from '@angular/core';
import { AbstractControl, Form, FormBuilder, FormControl, FormGroup, Validator, Validators } from '@angular/forms';
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
        show =  true ;  
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
          console.log("i have made it true ");
          this.show =  false ; 
          this.submitted = true;
          if (this.signupform.invalid) {
            return;
          }
      
         console.log('--- call  to service ------');
         this.signService.signUp(this.signupform); 
         
        }


        onReset(): void {
          this.submitted = false;
          this.signupform.reset();
        }
      
        OnAnser () : boolean {
           return this.show ;  
        }
       
}
