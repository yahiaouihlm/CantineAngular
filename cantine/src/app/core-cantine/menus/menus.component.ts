import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menus',
  templateUrl:'./menus.component.html',
  styles: [
  ]
})
export class MenusComponent {


     constructor (private route :  Router) {}






  goToNewMenu () {
      this.route.navigate (['cantine/menus/addMenu']);
  }
}
