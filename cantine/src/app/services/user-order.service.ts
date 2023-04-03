import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Answer } from '../Models/Answer';

@Injectable({
  providedIn: 'root'
})
export class UserOrderService {
  readonly API_URL="http://localhost:8080/";
  readonly ENDPOINTSENDCODE  =  "cantine/users/forgetpassword";
  readonly ENDPOINTCHECKCODE  = "cantine/users/forgetpassword/checkCode"
  readonly ENDPOINTNEWPASSWORD = "cantine/users/forgetpassword/changePassword";
 
  constructor(private  httpClient : HttpClient) { }

   sendNewPassword (newUserInfo : object){
    let url =  (this.API_URL + this.ENDPOINTNEWPASSWORD); 
    return this.httpClient.post<Answer>(url, newUserInfo); 
   }

  sendEmailToSendCode(useremail : object ) {
    let url =  (this.API_URL + this.ENDPOINTSENDCODE); 
      return this.httpClient.post<Answer>(url, useremail );  
  }

  sendCodeTocheckEmail (userInfo : object ) {
    let url =  (this.API_URL + this.ENDPOINTCHECKCODE); 
    return this.httpClient.post<Answer>(url, userInfo );  
  }

}
