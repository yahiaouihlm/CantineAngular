import {
  HttpClient, HttpEvent, HttpHeaders, HttpRequest
} from '@angular/common/http';
import {
  Injectable
} from '@angular/core';
import { Observable } from 'rxjs';
import { Answer } from '../Models/Answer';
import {
  MealAnser
} from '../Models/meal';

@Injectable({
  providedIn: 'root'
})
export class CantineHandlerService {
  readonly API_URL = "http://localhost:8080/";
  readonly ENDPOINTMEALS = "cantine/meals";
  readonly ENDPOINTADDMEAL = "cantine/meals/add";
  readonly ENDPOINTGETMEAL = "cantine/meals/getOne"


  constructor(private httpClient: HttpClient) {}



  // avoir un  plat depuis  son  ID 
  getmealByid ( id :   number )   {
    const url  =  this.API_URL + this.ENDPOINTGETMEAL + "/" + id
         return  this.httpClient.get <MealAnser>(url); 
  }




  // avoir la liste des plats depuis  la back  
  getMeal() {
    return this.httpClient.get < MealAnser > ((this.API_URL + this.ENDPOINTMEALS));
  }




   

  // envoyer un plat  à  la base de donnée 
  newMeal ( meal : FormData){
    let  token = '' ;
    let   storage = localStorage.getItem('Authorization')
    if (storage === null)
        storage =''
    else {
      token =  storage;  
    }
    const headers = new HttpHeaders().set('Authorization',token );
    const req = new HttpRequest('POST',  (this.API_URL + this.ENDPOINTADDMEAL) ,meal ,   {
      reportProgress: true,
      responseType: 'json',
      headers : headers,
    });
    return  this.httpClient.request(req); 






  }


 
 
  /*sendImage (  data  :   File    ){

    const formData: FormData = new FormData(); 
    formData.append('file', data);


    const url =  "http://localhost:8080/cantine/upload"
     //  return this.httpClient.post <Answer> (url , data,   formData    );         


     const req = new HttpRequest('POST',  url, formData ,   {
      reportProgress: true,
      responseType: 'json'
    });

    return  this.httpClient.request(req); 
  }*/
}