import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CantineHandlerService } from '../services/cantine-handler.service';

@Component({
  selector: 'app-test',
  template: `
         <h1 class="center"> Upload Image </h1>
         <form [formGroup]="formtest"   enctype="multipart/form-data"  >
                        <div class="form-group">
                          <label>Nom </label>
                          <input 
                            type="file"
                            formControlName="file"
                            (change)="onChange ($event)" 
                          />
                 
                        </div>
              <button type="submit"> valider </button>
         
       </form>

         
  `,
  styles: [
  ],
  providers: [CantineHandlerService]
})
export class TestComponent {

  formtest: FormGroup = new FormGroup({
    file: new FormControl( '', Validators.required),
  });
  constructor (private cantineHandlerService  : CantineHandlerService) {}
 
  onChange = ($event : Event) =>{
    const target  = $event.target as HTMLInputElement ; 
    const file  : File =  (target.files as FileList)[0]
     
    /*this.cantineHandlerService.sendImage(  file ).subscribe({

      next : next =>   {
                console.log(next);
                
      } , 
     error : error => {console.log(error);}
    
          
    } 


    ) */
}
}



