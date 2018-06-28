import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { GooglePlus } from '@ionic-native/google-plus';
import { Facebook } from '@ionic-native/facebook';
import { TwitterConnect } from '@ionic-native/twitter-connect';
import { MapPage } from '../map/map';
import { HttpClient} from '@angular/common/http';
import 'rxjs/add/operator/map';
import { SocketProvider } from '../../providers/socket/socket';
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  event
  data

  constructor(public navCtrl: NavController,public googlePlus: GooglePlus,public fb: Facebook,public twitter: TwitterConnect,public http: HttpClient,public socketProvider:SocketProvider) {
  }

  skip(){
    console.log("test")
    this.navCtrl.setRoot(MapPage);
  }

  GGLogin(){
    let params = {
      'webClientId':'154329307674-t196vefq5hintetkl1bd0810avfapjpu.apps.googleusercontent.com'
    }
    this.googlePlus.login(params).then(res => {
      console.log(res)
      this.login(res.givenName,res.familyName,"",res.email,res.userId,"Google").then(res=>{
        console.log(res);
        this.socketProvider.socketLogin(res._id);
        
      }).catch(err=>{
        console.error(err)
      })
    }).catch(err=>{
      console.error(err);
    });
  }

  facebooklogin(){
    this.fb.login(['public_profile', 'user_friends', 'email']).then((res) => {
      console.log(res);
      this.http.get("https://graph.facebook.com/v3.0/1826771280708609?fields=id,first_name,last_name,email&access_token="+res.authResponse.accessToken).subscribe((data:any)=>{
        this.login(data.name,data.last_name,"",data.email,res.authResponse.userID,"Facebook").then(res=>{
          this.socketProvider.socketLogin(res._id);
          console.log(res);
          this.navCtrl.setRoot(MapPage);
        });
      });
    }).catch(err => {
      console.error(err);
    });
  }

  twitterLogin(){
    this.twitter.login().then((res)=>{
      console.log(res);
      this.twitter.showUser().then(res=>{
        console.log("ICI")
        console.log(res)
      }).catch(err=>{
        console.log(err);
        this.login("","",err.name,"",err.id,"Twitter").then(res=>{
          this.socketProvider.socketLogin(res._id);
          console.log(res);
          this.navCtrl.setRoot(MapPage);
        }).catch(err=>{
          console.error(err);
        })
      })
    }).catch((err)=>{
      console.error(err);
    });
  }

  test(){
    this.socketProvider.send(this.event,this.data);
  }
  login(name,firstname,username,email,password,connection_type){
    return new Promise<any>((resolve, reject) => {
      let url="http://192.168.0.60:3000/auth";
      let option = {
        username:username||"",
        email:email||"",
        idUserNetwork :password,
        connection_type:connection_type,
        firstname:firstname,
        name:name
      }
      this.http.post(url,option).subscribe((res)=>{
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
