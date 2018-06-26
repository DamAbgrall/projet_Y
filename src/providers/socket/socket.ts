import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { Observable } from 'rxjs/Observable';
import io from 'socket.io'
@Injectable()
export class SocketProvider {
  
  public socket

  constructor(public http: HttpClient,public notif:LocalNotifications) {
    console.log('Hello SocketProvider Provider');
  }
  socketLogin(userId){
    console.log("Login")
    var connectionOptions = {
      "force new connection": true,
      "reconnectionAttempts": 0, //avoid having user reconnect manually in order to prevent dead clients after a server restart
      "timeout": 10000,                  //before connect_error and connect_timeout are emitted.
      "transports": ["websocket"],
      "query": "userId=" + userId
    };
    var socketHost = "http://192.168.0.60:8080";
    this.socket = io(socketHost,connectionOptions);
    this.socket.on("new_notification",(name, fn) =>{
      console.log(name);
      fn("success");
      this.notif.schedule({
        id: 1,
        text: 'Nouveau message de Valentin',
      });
    })
  }

  send(eventName,eventData){
    this.socket.emit(eventName,eventData);
  }
}
