import { Component, OnInit } from '@angular/core';
import { AbstractControl, Form, FormBuilder, FormControl, FormGroup, Validator, Validators } from '@angular/forms';
import Validation from './validation';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: [ './signupStyle.scss'
  ]
})
export class SignUpComponent  implements OnInit {
     
     signupform: FormGroup = new FormGroup({
          fullname: new FormControl(''),
          username: new FormControl(''),
          userbirthday : new FormControl(''),
          email: new FormControl(''),
          password: new FormControl(''),
          confirmPassword: new FormControl(''),
          acceptTerms: new FormControl(false),
        });
        submitted = false;
 constructor  (private formBuilder: FormBuilder){

 }
     ngOnInit(): void {
       this.signupform =  this.formBuilder.group({
          fullname: ['', Validators.required],
          username: [
               '',
               [
                 Validators.required,
                 Validators.minLength(3),
                 Validators.maxLength(20)
               ]
             ],

          userbirthday : ['' , Validators.required], 
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
           
          if (this.signupform.invalid) {
            return;
          }
      
          console.log(JSON.stringify(this.signupform.value, null, 2));
        }


        onReset(): void {
          this.submitted = false;
          this.signupform.reset();
        }

       
}
