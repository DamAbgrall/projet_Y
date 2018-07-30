import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { MapProvider } from '../../providers/map/map';
import { EventViewPage } from '../event-view/event-view';


/**
 * Generated class for the MyEventPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-my-event',
  templateUrl: 'my-event.html',
})
export class MyEventPage {

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
    tags: ['football', 'basketball', 'rugby', 'patate', 'avion'],
    EventType: "",
    categ: "a",
    participants:[{'username':'Participants 1','picture':'images/yellow-point.png'},{'username':'Participants 2','picture':'images/yellow-point.png'}],
    commentary:[{'username':'Participants 1','picture':'images/yellow-point.png','comment':'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'},{'username':'participants 2','picture':'images/yellow-point.png','comment':'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'}],
  }, {
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
    tags: ['football', 'basketball', 'rugby', 'patate', 'avion'],
    EventType: "",
    categ: "b",
    participants:[{'username':'Participants 1','picture':'images/yellow-point.png'},{'username':'Participants 2','picture':'images/yellow-point.png'}],
    commentary:[{'username':'Participants 1','picture':'images/yellow-point.png','comment':'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'},{'username':'participants 1','picture':'images/yellow-point.png','comment':'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'}],
  }, {
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
    tags: ['football', 'basketball', 'rugby', 'patate', 'avion'],
    EventType: "",
    categ: "c",
    participants:[{'username':'participants 1','picture':'images/yellow-point.png'},{'username':'participants 2','picture':'images/yellow-point.png'}],
    commentary:[{'username':'participants 1','picture':'images/yellow-point.png','comment':'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'},{'username':'participants 1','picture':'images/yellow-point.png','comment':'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'}],
  }, {
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
    tags: ['football', 'basketball', 'rugby', 'patate', 'avion'],
    EventType: "",
    categ: "d",
    participants:[{'username':'participants 1','picture':'images/yellow-point.png'},{'username':'participants 2','picture':'images/yellow-point.png'}],
    commentary:[{'username':'participants 1','picture':'images/yellow-point.png','comment':'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'},{'username':'participants 1','picture':'images/yellow-point.png','comment':'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'}],
  }];

  constructor(public navCtrl: NavController, public navParams: NavParams, public map: MapProvider) {
    console.log(this.eventList[0].dateEvent);
  }
  ionViewDidLoad() {
    for (let key in this.eventList) {
      this.map.latLngtoAddr(this.eventList[key].coordinates.lat, this.eventList[key].coordinates.long).then(res => {
        console.log(key)
        console.log(this.eventList[key])
        this.eventList[key].address = res;
      }).catch(err => {
        console.error(err)
      })
    }
  }

  getColor(categ) {
    if (categ == "l") {
      return "jaune"
    } else if (categ == "e") {
      return "violet";
    } else if (categ == "p") {
      return "vert";
    } else if (categ == "s") {
      return "rouge";
    } else {
      return "noir";
    }
  }

  detail(event){
    this.navCtrl.push(EventViewPage,{"event":event})
  }

}
