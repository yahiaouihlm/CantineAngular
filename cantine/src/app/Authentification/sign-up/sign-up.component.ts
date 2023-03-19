import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import Validation from './validation';
import { SignService } from 'src/app/services/sign.service';
import { Router } from '@angular/router';
import { format, parseISO } from 'date-fns';
import { EmailValidationComponent } from './email-validation/email-validation.component';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./signupStyle.scss'],
  providers: [SignService]
})
export class SignUpComponent implements OnInit {
  signupform: FormGroup = new FormGroup({
    fullname: new FormControl('', [Validators.required, Validators.maxLength(16)]),
    username: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
    birthday: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@social.aston-ecole.com')]),
    password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(40)]),
    confirmPassword: new FormControl('', [Validators.required])
    // acceptTerms: new FormControl(true),
  },
    {
      validators: [Validation.match('password', 'confirmPassword')]
    }

  );
  submitted = false;
  show = true;      // show if authentificated has been  done  
  authError = false; // if  there  is any  authenticated problem show  the  html    div 
  existingUserEmail: boolean | undefined;   //  if  the email alredy  exist  in  database 
  isLoading = false;
  image!: File;


  constructor(private signService: SignService, private route: Router) {
  }
  ngOnInit(): void {

  }

  onSubmit(): void {
    this.submitted = true;

    if (this.signupform.invalid) {
      return;
    }
    this.isLoading = true;
    this.checkExisingEmailAndSignUP();

  }


  checkExisingEmailAndSignUP() {
    const Useremail = { email: this.signupform.controls['email'].value }
    const exitUser = { message: 'existingUser', httpStatus: 'OK', data: 'Exist' }
    const notExisting = { message: 'notexistingUser', httpStatus: 'OK', data: 'Not Exist' }

    this.signService.existingEmail(Useremail).subscribe({
      next: next => {
        if (next.data == exitUser.data && next.httpStatus == exitUser.httpStatus && next.message == exitUser.message) {
          this.existingUserEmail = true;
          this.isLoading = false;
          alert(' Ce mail Existe déja   ');


        }

        else if (next.data == notExisting.data && next.httpStatus == notExisting.httpStatus && next.message == notExisting.message) {
          this.existingUserEmail = false;
          this.inscription();
        }
        else {
          alert(" Une erreur  c'est produite pendant la trasmition des donné ");
          this.route.navigate(['cantine'])

        }

      },
      error: error => {
        alert(" Une erreur  c'est produite pendant la trasmition des donnés ")
        this.route.navigate(['cantine']);
      }
    })




  }


  private inscription(): void {

    
    const formData: FormData = new FormData();
    if (this.image != null || this.image != undefined) // envoyer  une image  uniquement si  y'a eu  une image  ! 
      formData.append('image', this.image);
    const dateAsString = this.signupform.controls['birthday'].value;
    const date = parseISO(dateAsString);
    const formattedDate = format(date, 'yyyy-MM-dd');

    formData.append('username', this.signupform.controls['username'].value)
    formData.append('fullname', this.signupform.controls['fullname'].value);
    formData.append('password', this.signupform.controls['password'].value);
    formData.append('email', this.signupform.controls['email'].value);
    formData.append('dateofbirth', formattedDate);

   let   useremail = this.signupform.controls['email'].value; 

    this.signService.signUp(formData).subscribe({

      next: next => {
        if (next.message == "SECCESS" && next.httpStatus == "OK" && next.data != undefined) {
          this.isLoading = false;
       
          this.route.navigate(['cantine/user/ActivatiedAcount',  useremail  ] ); 

        }
        else {
          alert("Votre Inscription  n'a  pas était prise en  Compte Il S'agit probablement d'un probléme Réseau ou  une erreur  de BDD ")
          this.isLoading = false;
          this.route.navigate(['cantine'], { queryParams: { reload: 'true' } });
        }
      },
      error: error => {
        alert("Votre Inscription  n'a  pas était prise en  Compte Il S'agit probablement d'un probléme Réseau  Veuillez reeassez ultérieurement ");
        this.isLoading = false;
        this.route.navigate(['cantine'], { queryParams: { reload: 'true' } });
      }

    })


  }





  onReset(): void {
    this.submitted = false;
    this.signupform.reset();
  }

  OnAnser(): boolean {
    return this.show;
  }

  getauthError(): boolean {
    return this.authError;
  }











  get f(): { [key: string]: AbstractControl } {
    return this.signupform.controls;
  }



  onChange = ($event: Event) => {
    const target = $event.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0]
    this.image = file;
  }




}



