import { Component } from '@angular/core';
import { NavController, NavParams,ViewController } from 'ionic-angular';

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
  a:boolean=false;
  constructor(public navCtrl: NavController, public navParams: NavParams,public viewCtrl: ViewController ) {
  }

  ionViewDidLoad(){
    let elem = document.getElementsByTagName("page-modal-filter").item(0);
    let parent = elem.parentElement
    parent.addEventListener("click",()=>{
      if(this.a){
        this.a = false;
      }else{
        this.viewCtrl.dismiss();
      }
    })
    elem.addEventListener("click",()=>{
      this.a = true
    })
  }

  cancel(){
    this.viewCtrl.dismiss();
  }

  filter(){
    this.viewCtrl.dismiss();
  }


}
