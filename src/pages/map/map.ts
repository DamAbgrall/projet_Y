import { Component } from '@angular/core';
import { ModalController,NavController, NavParams, MenuController,Events } from 'ionic-angular';
import { MapProvider } from '../../providers/map/map';
import { GoogleMap } from '@ionic-native/google-maps';
import { NewEventPage } from '../new-event/new-event';
import { EventListPage } from '../event-list/event-list';
import { MyEventPage } from '../my-event/my-event';
import { EventViewPage } from '../event-view/event-view';
import { SettingsPage } from '../settings/settings';
import { ModalFilterPage } from '../modal-filter/modal-filter';

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
  event=[{
    title: "Titre",
    dateEvent: new Date(),
    description: "ABCDEFGHIJLKMNOPQRTSUVWXYZ",
    picture: "images/60277c31ce5030f22d5df389083e8fe9.jpg",
    maxAttendees: 10,
    creator: {
      name: "Nom",
      firstName: 'prénom',
      username: "pseudo"
    },
    isEnd: false,
    startDate: new Date(),
    endDate: new Date(),
    coordinates: {
      lat: 47.071482,
      lng: -1.567236
    },
    address: null,
    tags: ['football', 'rugby', 'patate', 'avion'],
    EventType: "",
    categ: "s",
    participants:[{'username':'Participants 1','picture':'images/yellow-point.png'},{'username':'Participants 2','picture':'images/yellow-point.png'}],
    commentary:[{'username':'Participants 1','picture':'images/yellow-point.png','comment':'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'},{'username':'participants 2','picture':'images/yellow-point.png','comment':'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'}],
  },{
    title: "Titre",
    dateEvent: new Date(),
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    picture: "images/60277c31ce5030f22d5df389083e8fe9.jpg",
    maxAttendees: 10,
    creator: {
      name: "Nom",
      firstName: 'prénom',
      username: "pseudo"
    },
    isEnd: false,
    startDate: new Date(),
    endDate: new Date(),
    coordinates: {
      lat: 47.078611,
      lng: -1.576290
    },
    address: null,
    tags: ['football', 'basketball', 'rugby', 'avion'],
    EventType: "",
    categ: "e",
    participants:[{'username':'Participants 1','picture':'images/yellow-point.png'},{'username':'Participants 2','picture':'images/yellow-point.png'}],
    commentary:[{'username':'Participants 1','picture':'images/yellow-point.png','comment':'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'},{'username':'participants 2','picture':'images/yellow-point.png','comment':'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'}],
  },{
    title: "Titre",
    dateEvent: new Date(),
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    picture: "images/60277c31ce5030f22d5df389083e8fe9.jpg",
    maxAttendees: 10,
    creator: {
      name: "Nom",
      firstName: 'prénom',
      username: "pseudo"
    },
    isEnd: false,
    startDate: new Date(),
    endDate: new Date(),
    coordinates: {
      lat: 47.071076,
      lng: -1.585813
    },
    address: null,
    tags: ['football', 'basketball', 'rugby', 'patate'],
    EventType: "",
    categ: "p",
    participants:[{'username':'Participants 1','picture':'images/yellow-point.png'},{'username':'Participants 2','picture':'images/yellow-point.png'}],
    commentary:[{'username':'Participants 1','picture':'images/yellow-point.png','comment':'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'},{'username':'participants 2','picture':'images/yellow-point.png','comment':'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'}],
  },{
    title: "Titre",
    dateEvent: new Date(),
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    picture: "images/60277c31ce5030f22d5df389083e8fe9.jpg",
    maxAttendees: 10,
    creator: {
      name: "Nom",
      firstName: 'prénom',
      username: "pseudo"
    },
    isEnd: false,
    startDate: new Date(),
    endDate: new Date(),
    coordinates: {
      lat:47.097487,
      lng:-1.555399
    },
    address: null,
    tags: ['basketball', 'rugby', 'patate', 'avion'],
    EventType: "",
    categ: "l",
    participants:[{'username':'Participants 1','picture':'images/yellow-point.png'},{'username':'Participants 2','picture':'images/yellow-point.png'}],
    commentary:[{'username':'Participants 1','picture':'images/yellow-point.png','comment':'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'},{'username':'participants 2','picture':'images/yellow-point.png','comment':'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'}],
  }
]

  constructor(public navCtrl: NavController, public navParams: NavParams, public mapProvider: MapProvider, public menuCtrl: MenuController,public modalCtrl: ModalController,public events: Events) {

  }
  ngAfterViewInit() {
    this.element = document.getElementById('map');
    this.mapProvider.loadMap(this.element).then((mapData) => {
      this.map = mapData.map;
      this.mapProvider.addMarker(this.event);
      this.events.subscribe('MAP_LONG_CLICK', (res) => {
        this.navCtrl.push(NewEventPage,res);
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

  openFilter(){
    let modal = this.modalCtrl.create(ModalFilterPage);
    modal.onDidDismiss(data => {
      console.log(data);
    })
    modal.present();
  }
  openView(){
    console.log(this.mapProvider.eventMarkerInfoList);
    for(let element of this.mapProvider.eventMarkerInfoList){
      console.log(this.mapProvider.currentMaker);
      if(element.marker == this.mapProvider.currentMaker){
        this.navCtrl.push(EventViewPage,{"event":element.event})
      }
    }
  }
}
