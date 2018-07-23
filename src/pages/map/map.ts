import { Component } from '@angular/core';
import { NavController, NavParams, MenuController } from 'ionic-angular';
import { MapProvider } from '../../providers/map/map';
import { GoogleMap } from '@ionic-native/google-maps';
import { NewEventPage } from '../new-event/new-event';
import { EventListPage } from '../event-list/event-list';
import { MyEventPage } from '../my-event/my-event';
import { SettingsPage } from '../settings/settings';
@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {
  element: any;
  map: GoogleMap;
  x = 0;
  viewList = {
    'param': SettingsPage,
    'comingEvents': MyEventPage,
    'newEvent': NewEventPage,
    'EventListPage':EventListPage
  }

  constructor(public navCtrl: NavController, public navParams: NavParams, public mapProvider: MapProvider, public menuCtrl: MenuController) {

  }
  ngAfterViewInit() {
    this.element = document.getElementById('map');
    this.mapProvider.loadMap(this.element).then((mapData) => {
      this.map = mapData.map;
    }).catch((err) => {
      console.error(err);
    })
  }
  openMenu() {
    this.menuCtrl.toggle();
  }

  setMapClickable(bool) {
    if (bool) {
      document.getElementById('fab').removeAttribute("style");
    } else {
      document.getElementById('fab').setAttribute("style", "display:none");
    }
    this.map.setClickable(bool);
  }
  goTo(viewName) {
    this.navCtrl.push(this.viewList[viewName]);
  }
}
