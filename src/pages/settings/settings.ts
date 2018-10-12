import { Component } from '@angular/core';
import { ModalController, NavController, NavParams, ActionSheetController } from 'ionic-angular';
import { ModalTagPage } from '../modal-tag/modal-tag';
import { Camera } from '@ionic-native/camera';
import { Crop } from '@ionic-native/crop';
import { File } from '@ionic-native/file';
import { RequestProvider } from '../../providers/request/request';

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
  lastImage: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController, public actionSheetCtrl: ActionSheetController, public file: File, public crop: Crop, private camera: Camera, public request: RequestProvider) {
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
        this.request.updateImage("users/image/", newImage, this.request.userId).then(res => {
          console.log(res)
        }).catch(err => {
          console.error(err);
        })
      });
    }, (err) => {
      console.error(err);
    });
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
