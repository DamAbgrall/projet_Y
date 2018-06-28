import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocalNotifications } from '@ionic-native/local-notifications';
import io from 'socket.io';
var SocketProvider = /** @class */ (function () {
    function SocketProvider(http, notif) {
        this.http = http;
        this.notif = notif;
        console.log('Hello SocketProvider Provider');
    }
    SocketProvider.prototype.socketLogin = function (userId) {
        var _this = this;
        console.log("Login");
        var connectionOptions = {
            "force new connection": true,
            "reconnectionAttempts": 0,
            //avoid having user reconnect manually in order to prevent dead clients after a server restart
            "timeout": 10000,
            //before connect_error and connect_timeout are emitted.
            "transports": ["websocket"],
            "query": "userId=" + userId
        };
        var socketHost = "http://192.168.0.60:8080";
        this.socket = io(socketHost, connectionOptions);
        this.socket.on("new_notification", function (name, fn) {
            console.log(name);
            fn("success");
            _this.notif.schedule({
                id: 1,
                text: 'Nouveau message de Valentin',
            });
        });
    };
    SocketProvider.prototype.send = function (eventName, eventData) {
        this.socket.emit(eventName, eventData);
    };
    SocketProvider.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    SocketProvider.ctorParameters = function () { return [
        { type: HttpClient, },
        { type: LocalNotifications, },
    ]; };
    return SocketProvider;
}());
export { SocketProvider };
//# sourceMappingURL=socket.js.map