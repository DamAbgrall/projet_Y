import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { LoginPage } from '../pages/login/login';
import { NewEventPage } from '../pages/new-event/new-event';
import { MapPage } from '../pages/map/map';
import { ModalTagPage } from '../pages/modal-tag/modal-tag';
import { EventListPage } from '../pages/event-list/event-list';
import { SettingsPage } from '../pages/settings/settings';
import { EventViewPage } from '../pages/event-view/event-view';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = LoginPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}

