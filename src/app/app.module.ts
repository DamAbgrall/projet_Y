import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { GooglePlus } from '@ionic-native/google-plus';
import { Facebook } from '@ionic-native/facebook';
import { TwitterConnect } from '@ionic-native/twitter-connect';
import { GoogleMaps} from '@ionic-native/google-maps';
import { HttpClientModule } from '@angular/common/http';
import { LocalNotifications } from '@ionic-native/local-notifications';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { MapPage } from '../pages/map/map';
import { MapProvider } from '../providers/map/map';
import { SocketProvider } from '../providers/socket/socket';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    MapPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    MapPage
  ],
  providers: [
    StatusBar,
    GooglePlus,
    Facebook,
    TwitterConnect,
    SplashScreen,
    GoogleMaps,
    LocalNotifications,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    MapProvider,
    SocketProvider
  ]
})
export class AppModule {}
