import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class SignService {
  readonly API_URL="http://localhost:8080/cantine/user";
  readonly ENDPOINTSIGNUP  =  "/signUP"  
  constructor(private  httpClient : HttpClient) { }



  signUp(userinformation : FormGroup) {
    console.log((this.API_URL + this.ENDPOINTSIGNUP));
  
    return this.httpClient.post( (this.API_URL + this.ENDPOINTSIGNUP), userinformation )
  }

  



}
