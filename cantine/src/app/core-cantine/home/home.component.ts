import { Component } from '@angular/core';
import {Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: [  './homeStyle.scss'
  ]
})
export class HomeComponent {
 
 

 constructor ( private route :  Router){}



  gotomeals() :  void {
    this.route.navigate(['cantine/meals']);
  }

  gotomenus() :  void  {
    this.route.navigate(['cantine/menus']); 
  }

  
}
