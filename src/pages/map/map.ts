import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {MapProvider} from '../../providers/map/map';
@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {
  element: any;
  map: any;
  x=0;
  
  constructor(public navCtrl: NavController, public navParams: NavParams ,public mapProvider : MapProvider) {
    
  } 
  ngAfterViewInit() {
    console.log("")
    this.element = document.getElementById('map');
    this.mapProvider.loadMap(this.element).then((mapData) => {
      this.map = mapData.map;
    }).catch((err) => {
      console.error(err);
    })
  }
  ionViewDidLoad
  ionViewWillEnter
  ionViewDidEnter

  test(){
    console.log("test");
  }
}
