import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { MapProvider } from '../../providers/map/map';

/**
 * Generated class for the EventListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-event-list',
  templateUrl: 'event-list.html',
})
export class EventListPage {

  eventList = [{
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
      lat: 47.086329,
      long: -1.558949
    },
    address: null,
    tags: ['football', 'basketball', 'rugby', 'patate', 'avion', 'rugby', 'avion', 'football', 'basketball'],
    EventType: "",
  }];

  constructor(public navCtrl: NavController, public navParams: NavParams, public map: MapProvider) {

  }
  // ionViewDidLoad(){
  //   for (let key in this.eventList) {
  //     this.map.latLngtoAddr(this.eventList[key].coordinates.lat, this.eventList[key].coordinates.long).then(res => {
  //       this.eventList[key].address = res;
  //     }).catch(err => {
  //       console.error(err)
  //     })

  //   }
  // }

  test(categ) {
    console.log(categ)
    return "vert";
  }

}
