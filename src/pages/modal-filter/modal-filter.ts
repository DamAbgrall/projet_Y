import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, ModalController } from 'ionic-angular';
import { modalGooglePlacesPage } from '../modalGooglePlaces/modalGooglePlaces';
import { MapProvider } from '../../providers/map/map';
import { ModalTagPage } from '../modal-tag/modal-tag';
/**
 * Generated class for the ModalFilterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-modal-filter',
  templateUrl: 'modal-filter.html',
})
export class ModalFilterPage {

  a: boolean = false;
  address = '';
  coordinates = null;
  TagList = []
  debut;
  fin;
  distance;
  categ;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public modalCtrl: ModalController, public mapPro: MapProvider) {
  }

  ionViewDidLoad() {
    let elem = document.getElementsByTagName("page-modal-filter").item(0);
    let parent = elem.parentElement
    parent.addEventListener("click", () => {
      if (this.a) {
        this.a = false;
      } else {
        this.viewCtrl.dismiss();
      }
    })
    elem.addEventListener("click", () => {
      this.a = true
    })
  }
  getCurrentPos() {
    this.address = ''
    this.mapPro.map.getMyLocation().then(res => {
      console.log(res);
      this.coordinates = res.latLng;
      this.address = '';
    }).catch(err => {
      console.error(err);
    })
  }
  cancel() {
    this.viewCtrl.dismiss();
  }

  filter() {
    let data = {
      "debut": this.debut,
      "fin": this.fin,
      "coordinates": this.coordinates,
      "distance": this.distance,
      "categ": this.categ,
      "TagList": this.TagList
    }
    this.viewCtrl.dismiss(data);
  }
  showModal() {
    // reset 
    this.address = '';
    // show modal|
    console.log('call showmodal');
    let modal = this.modalCtrl.create(modalGooglePlacesPage, { type: "(cities)" });
    modal.onDidDismiss(data => {
      console.log('page > modal dismissed > data > ', data);
      if (data) {
        this.mapPro.addrtoLatLng(data.description).then(res => {
          console.log(res);
          this.coordinates = res;
        }).catch(err=>{
          console.error(err)
        })

        this.coordinates = null
      }
    })
    modal.present();
  }
  showTagModal() {
    let modal = this.modalCtrl.create(ModalTagPage, { "tagList": this.TagList });
    modal.onDidDismiss(data => {
      this.TagList = data;
      console.log(this.TagList);
    })
    modal.present();
  }

}
