import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./mainNavStyle.scss']
})
 
export class MainNavComponent  implements OnInit {
     Username :  string  = '';
  constructor (private route  : Router){}
 

  goToSignIn() : void {
    
    this.route.navigate(['cantine/signIn']);
    console.log("Hello world !  ");
    
  }

  goToProfile() : void {
    this.route.navigate(['cantine/user/myprofile']);
  }


  ngOnInit(): void {
     var  user =  localStorage.getItem('user'); 
     if (user == undefined || user === ''){
      this.Username =  "Connexion"
     }else{
      this.Username =  user ; 
     }
   
  }

  

}
