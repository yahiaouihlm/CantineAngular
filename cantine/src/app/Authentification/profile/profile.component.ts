import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: [
  ]
})
export class ProfileComponent {
  submitted =  false  ;
    user  =  localStorage.getItem('user') ; 
  
  userinfo: FormGroup = new FormGroup({
    fullname: new FormControl(''),
    username: new FormControl(''),
    birthday : new FormControl(''),
    email: new FormControl(''),
  });
  
  
  constructor  (private route : Router){}

  get f(): { [key: string]: AbstractControl } {
    return this.userinfo.controls;
      }

  onSubmit(){

  }

  deconnexion () : void  {
     localStorage.removeItem('Authorization'); 
     localStorage.removeItem('user'); 
     this.route.navigate(['cantine']);
  }

}
