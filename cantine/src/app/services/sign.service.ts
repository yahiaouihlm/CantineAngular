import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Answer } from '../Models/Answer';
import { AuthAnswer } from '../Models/AuthAnswer';


@Injectable({
  providedIn: 'root'
})
export class SignService {
  readonly API_URL="http://localhost:8080/";
  readonly ENDPOINTSIGNUP  =  "cantine/user/signUP"  
  readonly ENDPOINTLOGIN  =  "login"
  readonly ENDPOINTEXISTINGEMAIL ="cantine/user/existemail"  
  constructor(private  httpClient : HttpClient) { }



  signUp(userinformation : Object) {
    console.log((this.API_URL + this.ENDPOINTSIGNUP));
    return this.httpClient.post( (this.API_URL + this.ENDPOINTSIGNUP), userinformation )
  }
   
  login (userlogin :  Object) {
    return this.httpClient.post<AuthAnswer>((this.API_URL + this.ENDPOINTLOGIN ) , userlogin) ;  
  }

  /**
   *  @todo   traitement des erreur  on  cas ou  le serveur a echoue 
   */
  /**
   *  TODO 
   * @param useremail 
   * @returns 
   */
  
  existingEmail  (useremail : Object){      
         return this.httpClient.post<Answer> ( (this.API_URL + this.ENDPOINTEXISTINGEMAIL), useremail )
  }
  



}
