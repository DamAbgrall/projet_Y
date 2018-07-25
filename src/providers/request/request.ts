import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the RequestProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RequestProvider {

  serverAddr : string = "http://192.168.0.60:3000/"

  constructor(public http: HttpClient) {}


  login(name,firstname,username,email,password,connection_type){
    return new Promise<any>((resolve, reject) => {
      let option = {
        username:username||"",
        email:email||"",
        idUserNetwork :password,
        connection_type:connection_type,
        firstname:firstname,
        name:name
      }
      this.http.post(this.serverAddr+"auth",option).subscribe((res)=>{
        console.log(res)
        if (res){
          resolve(res);
        }else{
          reject(res);
        } 
      })
    })
  }

}
