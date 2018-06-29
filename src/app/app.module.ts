import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { GooglePlus } from '@ionic-native/google-plus';
import { Facebook } from '@ionic-native/facebook';
import { TwitterConnect } from '@ionic-native/twitter-connect';
import { GoogleMaps,Geocoder} from '@ionic-native/google-maps';
import { HttpClientModule } from '@angular/common/http';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { Camera } from '@ionic-native/camera';
import { Crop } from '@ionic-native/crop';
import { File } from '@ionic-native/file';

import { MyApp } from './app.component';
import { LoginPage } from '../pages/login/login';
import { MapPage } from '../pages/map/map';
import { NewEventPage } from '../pages/new-event/new-event';
import { modalGooglePlacesPage } from '../pages/modalGooglePlaces/modalGooglePlaces';
import { ModalTagPage } from '../pages/modal-tag/modal-tag';
import { EventListPage } from '../pages/event-list/event-list';
import { MapProvider } from '../providers/map/map';
import { SocketProvider } from '../providers/socket/socket';

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    MapPage,
    NewEventPage,
    modalGooglePlacesPage,
    ModalTagPage,
    EventListPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    MapPage,
    NewEventPage,
    modalGooglePlacesPage,
    ModalTagPage,
    EventListPage
  ],
  providers: [
    StatusBar,
    GooglePlus,
    Facebook,
    TwitterConnect,
    SplashScreen,
    GoogleMaps,
    Geocoder,
    LocalNotifications,
    Camera,
    Crop,
    File,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    MapProvider,
    SocketProvider
  ]
})
export class AppModule {}
