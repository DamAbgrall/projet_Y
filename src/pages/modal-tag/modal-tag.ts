import { Component } from '@angular/core';
import { NavController, ViewController, NavParams } from 'ionic-angular';
import { RequestProvider } from '../../providers/request/request';
import { FilterTag } from '../../providers/filter-tag/filter-tag';

@Component({
  selector: 'page-modal-tag',
  templateUrl: 'modal-tag.html',
})
export class ModalTagPage {

  tagList = [];
  result = []
  search: string = "";
  startTags = []

  constructor(public navCtrl: NavController, public viewCtrl: ViewController, public params: NavParams, public request: RequestProvider) {
    this.request.getAll("tag").then(res => {
      this.tagList = res;
      this.startTags = params.get('tagList');
      this.startTags.forEach(current_tag=>{
        this.tagList.forEach(tag=>{
          if(current_tag.tagName == tag.tagName){
            tag.selected = true;
          }
        })
      })
    }).catch(err => {
      console.error(err);
    })
  }
  dismiss() {
    this.viewCtrl.dismiss(this.startTags);
  }

  finish() {
    this.tagList.forEach(tag => {
      if (tag.selected == true) {
        this.result.push(tag);
      }
    })
    this.viewCtrl.dismiss(this.result);
  }

}