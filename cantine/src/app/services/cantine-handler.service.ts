import {
  HttpClient, HttpHeaders
} from '@angular/common/http';
import {
  Injectable
} from '@angular/core';
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


  constructor(private httpClient: HttpClient) {}

  getMeal() {
    return this.httpClient.get < MealAnser > ((this.API_URL + this.ENDPOINTMEALS));
  }

  newMeal ( meal : object){
    let  token = '' ;
    let   storage = localStorage.getItem('Authorization')
    if (storage === null)
        storage =''
    else {
      token =  storage;  
    }
    const headers = new HttpHeaders().set('Authorization',token );
    return this.httpClient.post <Answer> ((this.API_URL + this.ENDPOINTADDMEAL), meal, {headers} ); 
  }


}