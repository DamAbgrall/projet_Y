import { Component } from '@angular/core';
import { ModalController, NavController, NavParams } from 'ionic-angular';
import { ModalTagPage } from '../modal-tag/modal-tag';

/**
 * Generated class for the SettingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {
  LoisirTagList: any;
  PleinAirTagList: any;
  SortieTagList: any;
  EvenementTagList: any;

  Loisir: boolean = true;
  PleinAir: boolean = true;
  Sortie: boolean = true;
  Evenement: boolean = true;

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController) {
  }

  showLoisirTagModal() {
    console.log(this.LoisirTagList);
    let modal = this.modalCtrl.create(ModalTagPage, { "tagList": this.LoisirTagList });
    modal.onDidDismiss(data => {
      this.LoisirTagList = data;
      console.log(this.LoisirTagList);
    })
    modal.present();
  }
  showPleinAirTagModal() {
    console.log(this.PleinAirTagList);
    let modal = this.modalCtrl.create(ModalTagPage, { "tagList": this.PleinAirTagList });
    modal.onDidDismiss(data => {
      this.PleinAirTagList = data;
      console.log(this.PleinAirTagList);
      console.log(this.LoisirTagList)
    })
    modal.present();
  }
  showSortieTagModal() {
    console.log(this.SortieTagList);
    let modal = this.modalCtrl.create(ModalTagPage, { "tagList": this.SortieTagList });
    modal.onDidDismiss(data => {
      this.SortieTagList = data;
      console.log(this.SortieTagList);
      console.log(this.LoisirTagList)
    })
    modal.present();
  }
  showEvenementTagModal() {
    console.log(this.EvenementTagList);
    let modal = this.modalCtrl.create(ModalTagPage, { "tagList": this.EvenementTagList });
    modal.onDidDismiss(data => {
      this.EvenementTagList = data;
      console.log(this.EvenementTagList);
      console.log(this.LoisirTagList)
    })
    modal.present();
  }
  delete(tag, list) {
    list.splice(list.indexOf(tag), 1);
  }

}
