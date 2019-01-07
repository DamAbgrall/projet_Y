import { Component } from '@angular/core';
import { ModalController, NavController, NavParams, ActionSheetController } from 'ionic-angular';
import { ModalTagPage } from '../modal-tag/modal-tag';
import { CropModalPage } from '../crop-modal/crop-modal';
import { Camera } from '@ionic-native/camera';
import { Crop } from '@ionic-native/crop';
import { File } from '@ionic-native/file';
import { RequestProvider } from '../../providers/request/request';
import { MapProvider } from '../../providers/map/map';
import { FormBuilder } from '@angular/forms';

declare var google: any;

@Component({
  selector: 'page-new-event',
  templateUrl: 'new-event.html',
})
export class NewEventPage {

  TagList = [];
  categories = [];
  lastImage = "images/60277c31ce5030f22d5df389083e8fe9.png";
  inscription: Boolean;
  attendees: Number;
  title: String;
  startDate: Date;
  endDate: Date;
  description: String;
  autocompleteItems: any;
  autocomplete: any = {};
  acService: any;
  addressChosen: Boolean = false;
  location: any;
  selectedCategory: any;
  event: any = {};

  constructor(public map: MapProvider, public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController, public actionSheetCtrl: ActionSheetController, public file: File, public crop: Crop, private camera: Camera, public request: RequestProvider, private formBuilder: FormBuilder) {
    this.autocomplete.description = "";
    this.acService = new google.maps.places.AutocompleteService();
    this.autocompleteItems = [];
    this.request.getAll("category").then(res => {
      this.categories = res;
    }).catch(err => {
      console.error(err);
    })
  }

  choose(item) {
    this.autocomplete = item;
    document.getElementById("divAutoComp").setAttribute("style", "display:none");
  }

  showItems() {
    document.getElementById("divAutoComp").removeAttribute("style");
  }

  updateSearch() {
    console.log('modal > updateSearch');
    console.log(this.autocomplete);
    if (this.autocomplete.description == '') {
      this.autocompleteItems = [];
      return;
    }
    let self = this;
    let config = {
      types: [], // other types available in the API: 'establishment', 'regions', and 'cities'
      input: this.autocomplete.description,
      componentRestrictions: { country: 'FR' }
    }
    this.acService.getPlacePredictions(config, function (predictions, status) {
      console.log('modal > getPlacePredictions > status > ', status);
      console.log(predictions);
      self.autocompleteItems = [];
      if (predictions) {
        predictions.forEach(function (prediction) {
          self.autocompleteItems.push(prediction);
        });
      }
    });
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
      let modalCrop = this.modalCtrl.create(CropModalPage,{"image":imagePath});
      modalCrop.onDidDismiss(data=>{
        this.lastImage=data;
        console.log(data);
      })
      modalCrop.present();
    }, (err) => {
      console.error(err);
    });
  }

  createEvent() {
    this.map.addrtoLatLng(this.autocomplete).then(res => {
      if (res.subThoroughfare != undefined && res.thoroughfare != undefined) var addr = res.subThoroughfare + " " + res.thoroughfare
      var tagListId = []
      this.TagList.forEach(tag => {
        tagListId.push(tag._id);
      })
      console.log(res);
      let event = {
        "title": this.title,
        "picture": "",
        "startDate": this.startDate,
        "endDate": this.endDate,
        "isEnd": false,
        "comments": [],
        "rates": [],
        "validations": [],
        "description": this.description,
        "options": {
          "subValided": false,
          "hideAddr": this.inscription,
          "subscription": this.inscription
        },
        "maxAttendees": this.attendees,
        "tags": tagListId,
        "category": this.selectedCategory,
        "coordinates": {
          "long": res[0].position.lng,
          "lat": res[0].position.lat,
        },
        "creator": this.request.userId,
        "localisation": {
          "place_id": this.autocomplete.place_id,
          "long": res[0].position.lng,
          "lat": res[0].position.lat,
          "adress": addr,
          "zip": res[0].postalCode,
          "city": res[0].locality,
          "country": res[0].country,
          "name": this.autocomplete.description,
        }
      }
      console.log(event);
      this.request.create("event", event).then(res => {
        this.request.updateImage("event/image/", this.lastImage, res._id).then(res => {
          console.log(res);
        }).catch(err => {
          console.error(err);
        })
        console.log(res);
      }).catch(err => {
        console.error(err);
      })
    }).catch(err => {
      console.error(err);
    })

  }
}
