import { Component,ViewChild } from '@angular/core';
import { NavController, NavParams,ViewController } from 'ionic-angular';
import { AngularCropperjsComponent } from 'angular-cropperjs';

/**
 * Generated class for the CropModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-crop-modal',
  templateUrl: 'crop-modal.html',
})
export class CropModalPage {
  @ViewChild('angularCropper') public angularCropper: AngularCropperjsComponent;

  image:any;
  cropperOptions:any;
  scaleValX = 1;
  scaleValY = 1;
  cropper:any

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
    console.log(this.angularCropper);
    this.image = this.navParams.get("image");
    this.cropperOptions = {
      dragMode: 'move',
      aspectRatio: 1.7777777777777777,
      autoCrop: true,
      movable: false,
      zoomable: false,
      scalable: false,
      autoCropArea: 0.8,
      cropBoxResizable:false,
      zoomOnWheel:false,
      zoomOnTouch:false,
      rotatable:true,
    };

  }
 
  clear() {
    this.angularCropper.cropper.reset();
  }
 
  rotate() {
    this.angularCropper.cropper.rotate(90);
  }

  save(){
    this.viewCtrl.dismiss(this.angularCropper.cropper.getCroppedCanvas().toDataURL('image/jpeg'));
  }

  cropperTouchStart(event){
    event.stopPropagation();
    event.preventDefault();

  }
}
