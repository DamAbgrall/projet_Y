import { Component } from '@angular/core';
import { NavController, ViewController,NavParams } from 'ionic-angular';

/**
 * Generated class for the ModalTagPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-modal-tag',
  templateUrl: 'modal-tag.html',
})
export class ModalTagPage {

  tagList= ['football','basketball','rugby','avion'];
  result = {}
  viewList= [];
  search:string;
  startTags=[]

  constructor(public navCtrl: NavController,public viewCtrl: ViewController,public params: NavParams) {
    this.viewList=this.tagList;
    this.startTags = params.get('tagList');
    for(let index in this.startTags){
      this.result[this.startTags[index]]=true;
    }

  }

  dismiss() {
    this.viewCtrl.dismiss(this.startTags);
  }

  finish() {
    let keys = Object.keys(this.result)
    for(let key in keys){
      if(this.result[keys[key]]==false){
        delete(this.result[keys[key]])
      }
    }
    this.viewCtrl.dismiss(Object.keys(this.result));
  }

  updateSearch(){
    this.viewList = []
    for (let tag in this.tagList){
      if (this.tagList[tag].includes(this.search.toLowerCase())){
        this.viewList.push(this.tagList[tag]);
      }
    }
  }

}
