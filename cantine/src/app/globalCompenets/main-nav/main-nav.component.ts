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

  user =  {
    token :  localStorage.getItem('Authorization'),
    role  :  localStorage.getItem('rol'),
    username :  localStorage.getItem('user')
  }
  constructor (private route  : Router){}
 

  goToSignIn() : void {
    
    this.route.navigate(['cantine/signIn']);
    console.log("Hello world !  ");
    
  }

  goToProfile() : void {
    this.route.navigate(['cantine/user/myprofile']);
  }


  ngOnInit(): void {
       const token =  this.user.token;  
       const username = this.user.username; 
     if (token == null || token== undefined || username == null || username== undefined  )
              this.Username =  "Connexion"
     else {
        this.Username =  username;  
     }
     if  (this.user.role == 'admin'){
      this.nameorder = "Commandes"
     }
  }

  gotopanier() :  void {
    if  (this.user.role == 'admin'){
      this.route.navigate(['cantine/admin/baskets']);
      return ; 
     }
    this.route.navigate(['cantine/user/panier']);  
  }
  

}
