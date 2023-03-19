import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Answer } from '../Models/Answer';
import { AuthAnswer } from '../Models/AuthAnswer';
import { UserAnswer } from '../Models/UserAnswer';


@Injectable({
  providedIn: 'root'
})
export class SignService {
  readonly API_URL="http://localhost:8080/";
  readonly ENDPOINTSIGNUP  =  "cantine/user/signUP"  
  readonly ENDPOINTLOGIN  =  "login"
  readonly ENDPOINTEXISTINGEMAIL ="cantine/user/existemail"  
  readonly ENDPOINTMYPROFILE =  "cantine/user/myprofile"
  readonly ENDPOINTACTIVATEACOUNT = "cantine/users/activatedAcount" ;
  constructor(private  httpClient : HttpClient) { }

  activateAcount( email :  string ) {
    let url =  (this.API_URL + this.ENDPOINTACTIVATEACOUNT) + "/" + email
      return this.httpClient.post<Answer>(url,  email);  
  }

  signUp(userinformation : FormData) {
    console.log((this.API_URL + this.ENDPOINTSIGNUP));
    return this.httpClient.post <Answer>( (this.API_URL + this.ENDPOINTSIGNUP), userinformation )
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
  
  getProfile (useremail:  Object ) {
    let  token = '' ;
    let   storage = localStorage.getItem('Authorization')
    if (storage === null)
        storage =''
    else {
      token =  storage;  
    }
    const headers = new HttpHeaders().set('Authorization',token );
    return this.httpClient.post<UserAnswer>( (this.API_URL + this.ENDPOINTMYPROFILE) ,  useremail,  {headers}) ; 
  }



}
