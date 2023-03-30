import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-order-dial',
  template: `
    <p>
        {{data.message}}
    </p>
  `,
  styles: [
  ]
})
export class OrderDialComponent {
   
  constructor(@Inject(MAT_DIALOG_DATA) public data: { message: string},  private dialogRef: MatDialogRef<OrderDialComponent>) { }
}
