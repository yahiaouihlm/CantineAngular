import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./mainNavStyle.scss']
})
 
export class MainNavComponent {

    constructor (private route  : Router){}

  goToSignIn() : void {
    this.route.navigate(['cantine/signIn']);
    console.log("Hello world !  ");
    
  }
}
