import { Component,  Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-validator',
  template: `
    <div>
         <p>{{ data.message }}</p>
        <button class="btn"(click)="closeDialog('oui')" > oui </button>
        <button class="btn" (click)="closeDialog('non')" > Non </button>

   </div>
   
  `,
  styles: [
  ]
})
export class ValidatorComponent {
    
  constructor(@Inject(MAT_DIALOG_DATA) public data: { message: string},  private dialogRef: MatDialogRef<ValidatorComponent>) { }
  closeDialog( response :  string ){
    this. dialogRef.close(response);  
  }

}


export class ValidateUser{
    
    constructor(private router  :  Router) {}
    
    checkUser ():  void {
       let  token   =  localStorage.getItem('Authorisation'); 
       console.log(token);
       
       if (token === undefined ||token=== null) 
       this.router.navigate(['cantine'], { queryParams: { reload: 'true' } });
      }

      clearLocalStorage () {
        localStorage.clear(); 
      }
}