import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the EventViewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-event-view',
  templateUrl: 'event-view.html',
})
export class EventViewPage {

  event:any;
  menu="part";

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.event = this.navParams.data.event;
  }


  getColor(categ) {
    if (categ == "a") {
      return "jaune"
    } else if (categ == "b") {
      return "violet";
    } else if (categ == "c") {
      return "vert";
    } else if (categ == "d") {
      return "rouge";
    } else {
      return "noir";
    }
  }

}
