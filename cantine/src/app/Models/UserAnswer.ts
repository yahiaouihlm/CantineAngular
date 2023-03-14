import { Image } from "./image";

export interface UserAnswer {
    message : string ; 
    httpStatus  :   string ; 
    data  : User ;  
}



export interface User {
    id :  number
    username : string ,
    userfname  : string , 
    email  :  string ,
    phone : number
    credit : number ,  
    birthday: Date,
    creation : Date,
    image : string 
}