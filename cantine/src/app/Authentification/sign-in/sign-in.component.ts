import { Component } from '@angular/core';
import { Router } from '@angular/router';




@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: [ './signinStyle.scss'
  ]
})
export class SignInComponent {
   
  constructor (private route  : Router){}
  gotoSignUpPage  ( ){
    console.log("Hello world !  ");
    this.route.navigate(['cantine/signUp']);
  }
}
