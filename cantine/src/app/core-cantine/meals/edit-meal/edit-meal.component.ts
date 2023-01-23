import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-meal',
  templateUrl: './edit-meal.component.html',
  styles: [
  ]
})



export class EditMealComponent implements OnInit {
 
   idmeal: number =0 ;
    constructor  ( private router : ActivatedRoute)  {}

   ngOnInit(): void {
    const param = this.router.snapshot.paramMap.get('id');
    console.log("le id  du plat  voulu  est  :  ");
    
    console.log(param);
      
  }
}
