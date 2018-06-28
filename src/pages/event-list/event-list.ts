import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

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

  EventSchema = {
    title: {
      type: String,
      required: true
    },
    dateEvent: Date,
    description: String,
    picture: String,
    maxAttendees: String,
    creator: {
      name: "Nom",
      firstName: 'prénom',
      username: "pseudo"
    },
    isEnd: {
      type: "false",
    },
    startDate: new Date(),
    endDate: new Date(),
    coordinates: {
      lat: 10,
      long: 10
    }
  };

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }



}
