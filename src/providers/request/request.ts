import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { MapProvider } from '../map/map';
/*
  Generated class for the RequestProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RequestProvider {

  header: HttpHeaders;
  serverAddr: string = "http://172.16.2.205:3000/"
  userId: string;

  constructor(public http: HttpClient, public transfer: FileTransfer, public mapPro : MapProvider) {
    this.header = new HttpHeaders();
    this.header = this.header.append("Accept", "application/json");
  }


  login(name, firstname, username, email, password, connection_type) {
    return new Promise<any>((resolve, reject) => {
      let option = {
        username: username || "",
        email: email || "",
        idUserNetwork: password,
        connection_type: connection_type,
        firstname: firstname,
        name: name
      }
      this.http.post(this.serverAddr + "auth", option).subscribe((res) => {
        this.header = this.header.append("Authorization", res["token"]);
        this.userId = res["_id"];
        console.log(res)
        if (res["success"] == true) {
          resolve(res);
        } else {
          reject(res);
        }
      })
    })
  }

  create(model, data) {
    return new Promise<any>((resolve, reject) => {
      this.http.post(this.serverAddr + model, data, { headers: this.header }).subscribe((res) => {
        console.log(res)
        if (res["success"] == true) {
          resolve(res);
        } else {
          reject(res);
        }
      })
    })
  }

  delete(model, data) {
    return new Promise<any>((resolve, reject) => {
      this.http.delete(this.serverAddr + model + "/" + data, { headers: this.header }).subscribe((res) => {
        console.log(res)
        if (res["success"] == true) {
          resolve(res);
        } else {
          reject(res);
        }
      })
    })
  }

  getAll(model) {
    return new Promise<any>((resolve, reject) => {
      this.http.get(this.serverAddr + model, { headers: this.header }).subscribe((res) => {
        console.log(res)
        if (res) {
          resolve(res);
        } else {
          reject(res);
        }
      })
    })
  }

  getOne(model, id) {
    return new Promise<any>((resolve, reject) => {
      this.http.get(this.serverAddr + model + "/" + id, { headers: this.header }).subscribe((res) => {
        console.log(res)
        if (res) {
          resolve(res);
        } else {
          reject(res);
        }
      })
    })
  }

  update(model, data, id) {
    return new Promise<any>((resolve, reject) => {
      this.http.put(this.serverAddr + model + "/" + id, data, { headers: this.header }).subscribe((res) => {
        console.log(res)
        if (res["success"] == true) {
          resolve(res);
        } else {
          reject(res);
        }
      })
    })
  }

  updateImage(path,picturePath,id) {
    return new Promise<any>((resolve, reject) => {
      var url = this.serverAddr + path + id;
      var uploadoptions: FileUploadOptions = {
        fileKey: "avatar",
        fileName: "image.jpg",
        chunkedMode: true,
        mimeType: "image/jpg",
        headers: this.header,
      };
      console.log(uploadoptions);
      var fileTransfer: FileTransferObject = this.transfer.create();
      fileTransfer.upload(picturePath, url, uploadoptions, true).then(res => {
        console.log("request result : ");
        console.log(res);
        resolve(res);
      }).catch(err => {
        console.error(err);
        reject(err);
      })
    })
  }

  getEventRadius() {
    return new Promise<any>((resolve, reject) => {
      this.mapPro.map.getMyLocation().then(res=>{
        console.log(res)
        var url = this.serverAddr + "event/" + res.latLng.lat + "/" + res.latLng.lng + "/" + 500000000000;
        this.http.get(url, { headers: this.header }).subscribe((res) => {
          console.log(res)
          if (res) {
            resolve(res["success"] == true);
          } else {
            reject(res);
          }
        })
      }).catch(err=>{
        console.error(err);
      })
    })
  }


}
