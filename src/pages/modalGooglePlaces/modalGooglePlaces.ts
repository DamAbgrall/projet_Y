﻿import { Component } from '@angular/core';
import { NavController, ViewController,NavParams  } from 'ionic-angular';

declare var google: any;
/*
  Generated class for the modalGooglePlaces page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
    selector: 'page-modalGooglePlaces',
    templateUrl: 'modalGooglePlaces.html'
})
export class modalGooglePlacesPage {


    autocompleteItems: any;
    autocomplete: any;
    acService: any;
    placesService: any;

    constructor(public navCtrl: NavController, public viewCtrl: ViewController,public params: NavParams) {
        this.acService = new google.maps.places.AutocompleteService();
        this.autocompleteItems = [];
        this.autocomplete = {
            query: ''
        };
    }

    dismiss() {
        this.viewCtrl.dismiss();
    }

    chooseItem(item: any) {
        console.log('modal > chooseItem > item > ', item);
        this.viewCtrl.dismiss(item);
    }

    updateSearch() {
        console.log('modal > updateSearch');
        if (this.autocomplete.query == '') {
            this.autocompleteItems = [];
            return;
        }
        let self = this;
        console.log(this.params.get("type"));
        let config = {
            types: [this.params.get("type")], // other types available in the API: 'establishment', 'regions', and 'cities'
            input: this.autocomplete.query,
            componentRestrictions: { country: 'FR' }
        }
        this.acService.getPlacePredictions(config, function (predictions, status) {
            console.log('modal > getPlacePredictions > status > ', status);
            self.autocompleteItems = [];
            if(predictions){
                predictions.forEach(function (prediction) {
                    self.autocompleteItems.push(prediction);
                });
            }

        });
    }

}
