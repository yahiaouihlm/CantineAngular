import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./mainNavStyle.scss']
})
 
export class MainNavComponent  implements OnInit {
  Username :  string  = '';
  nameorder : string ='Mon Panier';
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
     var  role =  localStorage.getItem('rol'); 
     if (user == undefined || user === ''){
      this.Username =  "Connexion"
     }else{
      this.Username =  user ; 
     }
     if  (role=='admin'){
       this.nameorder="Commandes"
     }
     console.log(role);
     
   
  }

  

}
