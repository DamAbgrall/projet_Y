import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { Socket,SocketIoConfig } from 'ng-socket-io';

@Injectable()
export class SocketProvider {

  socket: any

  constructor(public http: HttpClient, public notif: LocalNotifications) {
    console.log('Hello SocketProvider Provider');
  }

  socketLogin(userId) {
    var config: SocketIoConfig = {
      url: 'http://192.168.1.57:8080', options: {
        "force new connection": true,
        "reconnectionAttempts": "Infinity", //avoid having user reconnect manually in order to prevent dead clients after a server restart
        "timeout": 10000,                  //before connect_error and connect_timeout are emitted.
        "transports": ["websocket"],
        "query": "userId=" + userId
      }
    };
    this.socket = new Socket(config)
    console.log(this.socket)
    this.socket.connect();
    this.socket.on("new_notification", (name, fn) => {
      console.log(name);
      fn("success");
      this.notif.schedule({
        id: 1,
        text: 'Nouveau message de Valentin',
      });
    })
  }

  send(eventName, eventData) {
    this.socket.emit(eventName, eventData);
  }

  test() {
    console.log(this.socket)
    this.socket.connect();
  }
}
