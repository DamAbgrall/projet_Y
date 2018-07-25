import { Component } from '@angular/core';
import { ModalController, NavController, NavParams,ActionSheetController } from 'ionic-angular';
import { modalGooglePlacesPage } from '../modalGooglePlaces/modalGooglePlaces';
import { ModalTagPage } from '../modal-tag/modal-tag';
import { Camera } from '@ionic-native/camera';
import { Crop } from '@ionic-native/crop';
import { File } from '@ionic-native/file';

/**
 * Generated class for the NewEventPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-new-event',
  templateUrl: 'new-event.html',
})
export class NewEventPage {
  address = {
    place: '',
    set: false,
  };
  TagList = []
  lastImage = "images/60277c31ce5030f22d5df389083e8fe9.jpg";
  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController,public actionSheetCtrl: ActionSheetController,public file: File,public crop: Crop,private camera: Camera) {
  }
  showModal() {
    // reset 
    this.address.place = '';
    this.address.set = false;
    // show modal|
    console.log('call showmodal');
    let modal = this.modalCtrl.create(modalGooglePlacesPage,{type:"geocode"});
    modal.onDidDismiss(data => {
      console.log('page > modal dismissed > data > ', data);
      if (data) {
        this.address.place = data.description;
        // get details
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
  delete(tag) {
    this.TagList.splice(this.TagList.indexOf(tag), 1);
  }
  public presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: "Sélectionner le type d'image",
      buttons: [
        {
          text: 'Choisir une photo existante',
          handler: () => {
            this.chooseImage(this.camera.PictureSourceType.PHOTOLIBRARY);
          }
        },
        {
          text: 'Prendre une nouvelle photo',
          handler: () => {
            this.chooseImage(this.camera.PictureSourceType.CAMERA);
          }
        },
        {
          text: 'Annuler',
          role: 'cancel'
        }
      ]
    });
    actionSheet.present();
  }

  chooseImage(sourceType) {
    var options = {
      quality: 100,
      sourceType: sourceType,
      saveToPhotoAlbum: false,
      correctOrientation: true
    };

    this.camera.getPicture(options).then((imagePath) => {
      // Special handling for Android library
      console.log(imagePath);
      this.crop.crop(imagePath).then(newImage => {
        //l'image taille normal
        var tempPathArray = imagePath.split('/');
        console.log(tempPathArray);
        var fileName = tempPathArray.pop().replace('-cropped', '').split('?')[0];
        var filePath = "";
        for (let str of tempPathArray) {
          if (filePath == '') {
            filePath = str;
          } else {
            filePath = filePath + '/' + str;
          }
        }
        this.file.removeFile(filePath, fileName).then(data => {
          console.log(data);
        }).catch(err => {
          console.error(err);
        })
        console.log(newImage);
        this.lastImage = newImage;
      });
    }, (err) => {
      console.error(err);
    });
  }
}
