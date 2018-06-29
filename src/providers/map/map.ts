import { Injectable } from '@angular/core';
import { GoogleMaps, GoogleMap, GoogleMapsEvent, Geocoder, LatLng, GeocoderResult } from '@ionic-native/google-maps';

@Injectable()
export class MapProvider {
    map: GoogleMap;
    mapDiv: HTMLElement;
    constructor(public googleMap: GoogleMaps) {

    }

    loadMap(element: HTMLElement) {
        console.log(element);
        this.mapDiv = element;
        return new Promise<{ element: HTMLElement, map: GoogleMap }>((resolve, reject) => {
            let mapOptions = {
                styles: [{ "featureType": "administrative.province", "elementType": "all", "stylers": [{ "visibility": "off" }] }, { "featureType": "landscape", "elementType": "all", "stylers": [{ "saturation": -100 }, { "lightness": 65 }, { "visibility": "on" }] }, { "featureType": "poi", "elementType": "all", "stylers": [{ "saturation": -100 }, { "lightness": 51 }, { "visibility": "simplified" }] }, { "featureType": "road.highway", "elementType": "all", "stylers": [{ "saturation": -100 }, { "visibility": "simplified" }] }, { "featureType": "road.arterial", "elementType": "all", "stylers": [{ "saturation": -100 }, { "lightness": 30 }, { "visibility": "on" }] }, { "featureType": "road.local", "elementType": "all", "stylers": [{ "saturation": -100 }, { "lightness": 40 }, { "visibility": "on" }] }, { "featureType": "transit", "elementType": "all", "stylers": [{ "saturation": -100 }, { "visibility": "simplified" }] }, { "featureType": "transit", "elementType": "geometry.fill", "stylers": [{ "visibility": "on" }] }, { "featureType": "water", "elementType": "geometry", "stylers": [{ "hue": "#ffff00" }, { "lightness": -25 }, { "saturation": -97 }] }, { "featureType": "water", "elementType": "labels", "stylers": [{ "visibility": "on" }, { "lightness": -25 }, { "saturation": -100 }] }]
            };
            this.map = GoogleMaps.create(this.mapDiv, mapOptions);
            this.map.one(GoogleMapsEvent.MAP_READY).then(() => {
                this.map.setCameraZoom(14);
                this.map.getMyLocation().then(res => {
                    this.map.setCameraTarget(res.latLng);
                }).catch((err) => {
                    console.error(err);
                    reject(err);
                })
                this.map.setOptions({
                    'controls': {
                        'compass': true,
                        'indoorPicker': true,
                        'zoom': true // Only for Android
                    },
                    'gestures': {
                        'scroll': true,
                        'tilt': true,
                        'rotate': true,
                        'zoom': true
                    }
                })
            }
            ).catch(err => {
                console.error(err)
                reject(err);
            });
            resolve({ element: this.mapDiv, map: this.map });
        });

    }

    latLngtoAddr(lat, lng) {
        return new Promise<any>((resolve, reject) => {
            var request = {
                'position': new LatLng(lat, lng)
            };
            console.log(request);
            Geocoder.geocode(request).then(res => {
                resolve(res);
                console.log(res);
            }).catch(err => {
                console.error(err);
                reject(err);
            })
        })


    }
}
