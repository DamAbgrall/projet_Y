import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the RequestProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RequestProvider {

  header: HttpHeaders;
  serverAddr : string = "http://192.168.1.57:3000/"

  constructor(public http: HttpClient) {
    this.header = new HttpHeaders();
    this.header = this.header.append("Accept", "application/json");
  }


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
        this.header = this.header.append("Authorization", "Bearer " + res["token"]);
        console.log(res)
        if (res){
          resolve(res);
        }else{
          reject(res);
        } 
      })
    })
  }

  create(model,data){
    return new Promise<any>((resolve, reject) => {
      this.http.post(this.serverAddr+"/"+model,data,{ headers: this.header }).subscribe((res)=>{
        console.log(res)
        if (res){
          resolve(res);
        }else{
          reject(res);
        } 
      })
    })
  }

  delete(model,data){
    return new Promise<any>((resolve, reject) => {
      this.http.delete(this.serverAddr+"/"+model+"/"+data,{ headers: this.header }).subscribe((res)=>{
        console.log(res)
        if (res){
          resolve(res);
        }else{
          reject(res);
        } 
      })
    })
  }

  getAll(model){
    return new Promise<any>((resolve, reject) => {
      this.http.get(this.serverAddr+"/"+model,{ headers: this.header }).subscribe((res)=>{
        console.log(res)
        if (res){
          resolve(res);
        }else{
          reject(res);
        } 
      })
    })
  }

  getOne(model,id){
    return new Promise<any>((resolve, reject) => {
      this.http.get(this.serverAddr+"/"+model+"/"+id,{ headers: this.header }).subscribe((res)=>{
        console.log(res)
        if (res){
          resolve(res);
        }else{
          reject(res);
        } 
      })
    })
  }

  update(model,data,id){
    return new Promise<any>((resolve, reject) => {
      this.http.put(this.serverAddr+"/"+model+"/"+id,data,{ headers: this.header }).subscribe((res)=>{
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
