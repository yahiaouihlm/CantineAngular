import { Component,  Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-empty-component',
  template: `
  <div class="container" style="width:80% ; height: 30%">
  <p>
      {{data.message}}
  </p>
     <button class="center"> OK  </button>
  </div>
`,
  styles: [
  ]
})
export class EmptyComponentComponent {
  constructor(@Inject (MAT_DIALOG_DATA) public data: { message: string},  private dialogRef: MatDialogRef<EmptyComponentComponent>) { }
}
