import { Component,  Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

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
    
  constructor(@Inject(MAT_DIALOG_DATA) public data: { message: string },  private dialogRef: MatDialogRef<ValidatorComponent> ) { }

  closeDialog( response :  string ){
    this. dialogRef.close(response);  
  }
}
