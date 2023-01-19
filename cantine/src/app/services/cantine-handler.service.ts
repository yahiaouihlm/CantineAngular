import {
  HttpClient
} from '@angular/common/http';
import {
  Injectable
} from '@angular/core';
import {
  MealAnser
} from '../Models/meal';

@Injectable({
  providedIn: 'root'
})
export class CantineHandlerService {
  readonly API_URL = "http://localhost:8080/";
  readonly ENDPOINTMEALS = "cantine/meals"


  constructor(private httpClient: HttpClient) {}

  getMeal() {
    return this.httpClient.get < MealAnser > ((this.API_URL + this.ENDPOINTMEALS));
  }

}