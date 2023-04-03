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
 
 
  constructor(private  httpClient : HttpClient) { }

  sendEmailToSendCode(useremail : object ) {
    let url =  (this.API_URL + this.ENDPOINTSENDCODE); 
      return this.httpClient.post<Answer>(url, useremail );  
  }

  sendCodeTocheckEmail (userInfo : object ) {
    let url =  (this.API_URL + this.ENDPOINTCHECKCODE); 
    return this.httpClient.post<Answer>(url, userInfo );  
  }

}
