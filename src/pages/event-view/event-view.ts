import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { RequestProvider } from '../../providers/request/request';

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
  isParticipant:boolean;
  isCreator:boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, public request: RequestProvider) {
    this.event = this.navParams.get("event");
    console.log(this.event)
    this.isCreator = this.request.userId == this.event
    /*for(let participant of this.eventTag.participants){
      if(this.request.userId == participant._id){
        this.isParticipant = true;
      }
    }*/
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

  subToEvent(){
    this.request.create("eventSub",{"userSub" : this.request.userId,"eventSub" : this.event._id}).then(res=>{
      this.isParticipant = true;
      console.log(res)
    }).catch(err=>{
      console.error(err);
    })
  }

  unsubToEvent(){
    //TODO
  }

}
