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
  isParticipant:boolean=true;
  me:any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.event = this.navParams.data.event;
    for(let participant of this.event.participants){
      if(this.me == participant){
        this.isParticipant = true;
      }
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

}
