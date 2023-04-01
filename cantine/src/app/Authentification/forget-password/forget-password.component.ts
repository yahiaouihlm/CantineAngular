import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html', 
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent {
  submitted =    false ; 
  emailFrom: FormGroup = new FormGroup({
    email: new FormControl(''),
  });  



  onSubmit() : void {

  }

  get f(): { [key: string]: AbstractControl } {
    return this.emailFrom.controls;
      }

}
