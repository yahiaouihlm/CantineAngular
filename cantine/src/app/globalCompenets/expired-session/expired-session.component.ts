import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-expired-session',
  template: `
    <div class="center" >
          <h2 > Votre session  est Expiré Veuillez  Vous connecter </h2>
              <button class="btn" (click)="toConnec()"> Je me Connecte  </button>
     </div>
`,
  styles: []
})
export class ExpiredSessionComponent {


   constructor(private router :  Router) {}

  toConnec()  {
     this.router.navigate(['cantine']); 
  }
}
