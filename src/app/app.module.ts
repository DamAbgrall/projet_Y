import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule, Injectable } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { GooglePlus } from '@ionic-native/google-plus';
import { Facebook } from '@ionic-native/facebook';
import { TwitterConnect } from '@ionic-native/twitter-connect';
import { GoogleMaps, Geocoder } from '@ionic-native/google-maps';
import { HttpClientModule } from '@angular/common/http';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { Camera } from '@ionic-native/camera';
import { Crop } from '@ionic-native/crop';
import { File } from '@ionic-native/file';
import { FileTransfer } from '@ionic-native/file-transfer';

import { MyApp } from './app.component';
import { LoginPage } from '../pages/login/login';
import { MapPage } from '../pages/map/map';
import { NewEventPage } from '../pages/new-event/new-event';
import { modalGooglePlacesPage } from '../pages/modalGooglePlaces/modalGooglePlaces';
import { ModalTagPage } from '../pages/modal-tag/modal-tag';
import { EventListPage } from '../pages/event-list/event-list';
import { EventViewPage } from '../pages/event-view/event-view';
import { MyEventPage } from '../pages/my-event/my-event';
import { CropModalPage } from '../pages/crop-modal/crop-modal';
import { SettingsPage } from '../pages/settings/settings';
import { ProfilePage } from '../pages/profile/profile';
import { ModalFilterPage } from '../pages/modal-filter/modal-filter';
import { ModalNotationPage } from '../pages/modal-notation/modal-notation';
import { MapProvider } from '../providers/map/map';
import { SocketProvider } from '../providers/socket/socket';
import { RequestProvider } from '../providers/request/request';

import { Socket } from 'ng-socket-io';
import { FilterTag } from '../providers/filter-tag/filter-tag';
import { AngularCropperjsModule } from 'angular-cropperjs';

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    MapPage,
    NewEventPage,
    modalGooglePlacesPage,
    ModalTagPage,
    EventListPage,
    EventViewPage,
    MyEventPage,
    SettingsPage,
    ModalFilterPage,
    FilterTag,
    ProfilePage,
    ModalNotationPage,
    CropModalPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    AngularCropperjsModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    MapPage,
    NewEventPage,
    modalGooglePlacesPage,
    ModalTagPage,
    EventListPage,
    EventViewPage,
    MyEventPage,
    SettingsPage,
    ModalFilterPage,
    ProfilePage,
    ModalNotationPage,
    CropModalPage
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
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    MapProvider,
    SocketProvider,
    RequestProvider,
    FileTransfer,
  ]
})
export class AppModule { }
