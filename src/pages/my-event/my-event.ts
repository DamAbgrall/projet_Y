import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { MapProvider } from '../../providers/map/map';
import { EventViewPage } from '../event-view/event-view';
import { RequestProvider } from '../../providers/request/request';

@Component({
  selector: 'page-my-event',
  templateUrl: 'my-event.html',
})
export class MyEventPage {

  eventList = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public map: MapProvider, public request: RequestProvider) {
    console.log(this.eventList[0].dateEvent);
  }
  ionViewDidLoad() {
    this.request.getEventRadius().then(res=>{
      this.eventList = res;
      for (let key in this.eventList) {
        this.map.latLngtoAddr(this.eventList[key].coordinates.lat, this.eventList[key].coordinates.long).then(res => {
          console.log(key)
          console.log(this.eventList[key])
          this.eventList[key].address = res;
        }).catch(err => {
          console.error(err)
        })
      }
    }).catch(err=>{
      console.error(err);
    })
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

  detail(event) {
    this.navCtrl.push(EventViewPage, { "event": event })
  }

}
