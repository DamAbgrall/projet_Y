import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { MapProvider } from '../../providers/map/map';
import { EventViewPage } from '../event-view/event-view';
import { RequestProvider } from '../../providers/request/request';

@Component({
  selector: 'page-event-list',
  templateUrl: 'event-list.html',
})
export class EventListPage {

  firstTagList = [];

  evenement: boolean = true;
  sortie: boolean = true;
  pleinAir: boolean = true;
  loisir: boolean = true;

  eventTagList: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public map: MapProvider, public request: RequestProvider) {
  }
  ionViewWillEnter() {
    this.request.getEventRadius().then(res => {
      this.firstTagList = res;
      this.eventTagList = this.firstTagList
      this.eventTagList.forEach(eventTag => {
        eventTag.event.endDate = new Date(eventTag.event.endDate)
        eventTag.event.startDate = new Date(eventTag.event.startDate)
      });
    }).catch(err => {
      console.error(err);
    })
  }

  getColor(categ) {
    if (categ.name == "Loisir") {
      return "jaune"
    } else if (categ.name == "Evenement") {
      return "violet";
    } else if (categ.name == "Plein air") {
      return "vert";
    } else if (categ.name == "Sortie") {
      return "rouge"; 
    } else {
      return "noir";
    }
  }

  detail(event) {
    this.navCtrl.push(EventViewPage, { "event": event })
  } 

  filter() {
    var categList = [];
    if (this.evenement) {
      categList = categList.concat("Evenement");
    }
    if (this.sortie) {
      categList = categList.concat("Sortie");
    }
    if (this.pleinAir) {
      categList = categList.concat("Plein air");
    }
    if (this.loisir) {
      categList = categList.concat("Loisir");
    }
    this.eventTagList = [];
    for (let eventTag of this.firstTagList) {
      if (categList.indexOf(eventTag.event.category.name) >= 0) {
        this.eventTagList = this.eventTagList.concat(eventTag)
      }
    }
  }

  changeE() {
    this.evenement = !this.evenement;
    this.filter();
  }
  changeS() {
    this.sortie = !this.sortie;
    this.filter();
  }
  changeP() {
    this.pleinAir = !this.pleinAir;
    this.filter();
  }
  changeL() {
    this.loisir = !this.loisir;
    this.filter();
  }

}
