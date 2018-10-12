import { Component } from '@angular/core';
import { ModalController, NavController, NavParams, MenuController, Events } from 'ionic-angular';
import { MapProvider } from '../../providers/map/map';
import { GoogleMap } from '@ionic-native/google-maps';
import { NewEventPage } from '../new-event/new-event';
import { EventListPage } from '../event-list/event-list';
import { MyEventPage } from '../my-event/my-event';
import { EventViewPage } from '../event-view/event-view';
import { SettingsPage } from '../settings/settings';
import { ModalFilterPage } from '../modal-filter/modal-filter';
import { RequestProvider } from '../../providers/request/request';

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
    'EventListPage': EventListPage
  }

  constructor(public navCtrl: NavController, public navParams: NavParams, public mapProvider: MapProvider, public menuCtrl: MenuController, public modalCtrl: ModalController, public events: Events, public request: RequestProvider) {
  }
  ngAfterViewInit() {
    this.element = document.getElementById('map');
    this.mapProvider.loadMap(this.element).then((mapData) => {
      this.map = mapData.map;
      this.request.getEventRadius().then(res=>{
        this.mapProvider.addMarker(res);
      }).catch(err=>{
        console.error(err);
      })
      this.events.subscribe('MAP_LONG_CLICK', (res) => {
        this.navCtrl.push(NewEventPage, res);
      });
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

  openFilter() {
    let modal = this.modalCtrl.create(ModalFilterPage);
    modal.onDidDismiss(data => {
      console.log(data);
      if (data != undefined) {
        var correcTime = true;
        var correctDistance = true;
        var correcCateg = true;
        var correcTag = true;
        for (let elem of this.mapProvider.eventMarkerInfoList) {
          elem.marker.setVisible(false);
          if (data.debut != undefined && data.fin != undefined) {
            correcTime = elem.event.dateEvent > data.debut && elem.event.dateEvent < data.fin;
          }
          if (data.coordinates != "" && data.coordinates != undefined) {
            if (data.coordinates.lat != "" && data.coordinates.lng != "") {
              correctDistance = this.mapProvider.distance(elem.event.coordinates.lat, elem.event.coordinates.lng, data.coordinates.lat, data.coordinates.lng) < data.distance;
            }
          }
          if (data.categ != undefined) {
            correcCateg = data.categ.indexOf(elem.event.categ) >= 0;
          }
          if (data.TagList.length > 0) {
            correcTag = data.TagList.some(r => elem.event.tags.indexOf(r) >= 0);
          }
          if (correcTime && correctDistance && correcCateg && correcTag) {
            elem.marker.setVisible(true);
          }
        }
      }
    })
    modal.present();
  }
  openView() {
    console.log(this.mapProvider.eventMarkerInfoList);
    for (let element of this.mapProvider.eventMarkerInfoList) {
      console.log(this.mapProvider.currentMaker);
      if (element.marker == this.mapProvider.currentMaker) {
        this.navCtrl.push(EventViewPage, { "event": element.event })
      }
    }
  }

}
