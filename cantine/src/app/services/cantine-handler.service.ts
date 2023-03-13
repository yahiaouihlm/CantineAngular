import {
  HttpClient, HttpEvent, HttpHeaders, HttpParams, HttpRequest
} from '@angular/common/http';
import {
  Injectable
} from '@angular/core';
import { Observable } from 'rxjs';
import { Answer } from '../Models/Answer';
import {
  MealAnser
} from '../Models/meal';
import { Menu, MenuAnser } from '../Models/menu';

@Injectable({
  providedIn: 'root'
})
export class CantineHandlerService {
  readonly API_URL = "http://localhost:8080/";
  readonly ENDPOINTMEALS = "cantine/meals";
  readonly ENDPOINTADDMEAL = "cantine/meals/add";
  readonly ENDPOINTUPDATEMEAL = "cantine/meals/update";
  readonly ENDPOINTGETMEAL = "cantine/meals/getOne"
  readonly ENDPOINTREMOVEMEA = "cantine/meals/removeOne"; 


  readonly ENDPOINTADDMENU ="cantine/menus/addMenu"; 
  readonly ENDPOINTGETMENUS = "cantine/menus/getMenus"
  readonly ENDPOINTGETMENU = "cantine/menus/getOne"
  readonly ENDPOINTUPDATMENU = "cantine/menus/update";


  constructor(private httpClient: HttpClient) {}

/*************************************   Menu   *********************************************/



updateMenu (menu:  Menu,  idmenu : string ){
  let  token = '' ;
  let   storage = localStorage.getItem('Authorization')
  if (storage === null)
      storage =''
  else {
    token =  storage;  
  }
  const headers = new HttpHeaders().set('Authorization',token );
  const   url  =  this.API_URL+this.ENDPOINTUPDATMENU + '/' + idmenu; 
  return  this.httpClient.post<MenuAnser> (url , {headers}); 
}

getmenuByid (idmenu :  string) {
  let  token = '' ;
  let   storage = localStorage.getItem('Authorization')
  if (storage === null)
      storage =''
  else {
    token =  storage;  
  }
  const headers = new HttpHeaders().set('Authorization',token );
  const  url =  this.API_URL + this.ENDPOINTGETMENU + "/" +  idmenu;   
  return this.httpClient.get<MenuAnser>(url ,  {headers}); 
}

getmenus ()  {
  let  token = '' ;
  let   storage = localStorage.getItem('Authorization')
  if (storage === null)
      storage =''
  else {
    token =  storage;  
  }
  const headers = new HttpHeaders().set('Authorization',token );
  return this.httpClient.get<MenuAnser>( (this.API_URL +  this.ENDPOINTGETMENUS ) , {headers}); 
}
 





 newMenu ( menu :  FormData)  {
  let  token = '' ;
    let   storage = localStorage.getItem('Authorization')
    if (storage === null)
        storage =''
    else {
      token =  storage;  
    }
    const headers = new HttpHeaders().set('Authorization',token );
    //const params = new HttpParams().set('mealsIDS', listmeal);
    const req = new HttpRequest('POST',  (this.API_URL + this.ENDPOINTADDMENU) ,menu ,   {
      reportProgress: true,
      responseType: 'json',
      headers : headers,
   
    });
   
    return  this.httpClient.request(req); 
 }








/*************************************   MEALS   *********************************************/

  removemealByid (id :  string ) {
    let  token = '' ;
    let   storage = localStorage.getItem('Authorization')
    if (storage === null)
        storage =''
    else {
      token =  storage;  
    }
    const headers = new HttpHeaders().set('Authorization',token );
    const url  =  this.API_URL + this.ENDPOINTREMOVEMEA + "/" + id ; 
    return  this.httpClient.get <Answer>(url ,  {headers}); 

  }


  

  // avoir un  plat depuis  son  ID 
  getmealByid ( id :   string )   {
    let  token = '' ;
    let   storage = localStorage.getItem('Authorization')
    if (storage === null)
        storage =''
    else {
      token =  storage;  
    }
    const headers = new HttpHeaders().set('Authorization',token );
    const url  =  this.API_URL + this.ENDPOINTGETMEAL + "/" + id
         return  this.httpClient.get <MealAnser>(url ,  {headers}); 
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
  
    return this.httpClient.post < MealAnser > ((this.API_URL + this.ENDPOINTADDMEAL),  meal , {headers :  headers}) ;


  }
  

 updateMeal (meal : FormData , idmeal :  string ) {
  let  token = '' ;
  let   storage = localStorage.getItem('Authorization')
  if (storage === null)
      storage =''
  else {
    token =  storage;  
  }
  const url  =  this.API_URL + this.ENDPOINTUPDATEMEAL + '/' +  idmeal
  const headers = new HttpHeaders().set('Authorization',token );
  /*const req = new HttpRequest('POST', url  ,meal ,   {
    reportProgress: true,
    responseType: 'json',
    headers : headers,
  });
  return  this.httpClient.  request(req);  */ 
  return this.httpClient.post < MealAnser > (url,  meal , {headers :  headers}) ;

 }
 

}