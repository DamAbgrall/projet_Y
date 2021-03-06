import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { GooglePlus } from '@ionic-native/google-plus';
import { Facebook } from '@ionic-native/facebook';
import { TwitterConnect } from '@ionic-native/twitter-connect';
import { MapPage } from '../map/map';
import { ModalNotationPage } from '../modal-notation/modal-notation';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { SocketProvider } from '../../providers/socket/socket';
import { RequestProvider } from '../../providers/request/request';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  clicked: boolean = false;

  constructor(public navCtrl: NavController, public modalCtrl: ModalController, public googlePlus: GooglePlus, public fb: Facebook, public twitter: TwitterConnect, public http: HttpClient, public socketProvider: SocketProvider, public request: RequestProvider) {
  }

  skip() {
    console.log("test")
    if (this.clicked == false) {
      this.navCtrl.setRoot(MapPage);
    }
    this.clicked = true;
  }

  GGLogin() {
    let params = {
      'webClientId': '154329307674-t196vefq5hintetkl1bd0810avfapjpu.apps.googleusercontent.com'
    }
    this.googlePlus.login(params).then(res => {
      console.log(res)
      this.request.login(res.givenName, res.familyName, "", res.email, res.userId, "Google").then(res => {
        this.socketProvider.socketLogin(res._id);
        this.navCtrl.setRoot(MapPage);
      }).catch(err => {
        console.error(err)
      })
    }).catch(err => {
      console.error(err);
    });
  }

  facebooklogin() {
    this.fb.login(['public_profile', 'user_friends', 'email']).then((res) => {
      console.log(res);
      this.http.get("https://graph.facebook.com/v3.0/1826771280708609?fields=id,first_name,last_name,email&access_token=" + res.authResponse.accessToken).subscribe((data: any) => {
        this.request.login(data.name, data.last_name, "", data.email, res.authResponse.userID, "Facebook").then(res => {
          this.socketProvider.socketLogin(res._id);
          console.log(res);
          this.navCtrl.setRoot(MapPage);
        });
      });
    }).catch(err => {
      console.error(err);
    });
  }

  twitterLogin() {
    this.twitter.login().then((res) => {
      console.log(res);
      this.twitter.showUser().then(res => {
        console.log("ICI")
        console.log(res)
      }).catch(err => {
        console.log(err);
        this.request.login("", "", err.name, "", err.id, "Twitter").then(res => {
          this.socketProvider.socketLogin(res._id);
          console.log(res);
          this.navCtrl.setRoot(MapPage);
        }).catch(err => {
          console.error(err);
        })
      })
    }).catch((err) => {
      console.error(err);
    });
  }

  open() {
    let profileModal = this.modalCtrl.create(ModalNotationPage);
    profileModal.present();
  }


}
