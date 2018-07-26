import { Injectable } from '@angular/core';
import { GoogleMaps, GoogleMap, GoogleMapsEvent, Geocoder, LatLng, MarkerOptions, Marker,GoogleMapsAnimation,HtmlInfoWindow } from '@ionic-native/google-maps';

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
                    console.log(res)
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
    addMarker(event) {
        let options: MarkerOptions = {
            icon: {
              url: 'images/yellow-point.png',
              size: {
                width: 32,
                height: 32
              }
            },
            position: {lat: 47.0859231, lng: -1.5591416},
            visible: true,
            animation: GoogleMapsAnimation.DROP,
          };

          let htmlInfoWindow = new HtmlInfoWindow();
          let frame: HTMLElement = document.createElement('div');
          frame.innerHTML = [
            '<h3>VOILA</h3>',
            '<img src="images/60277c31ce5030f22d5df389083e8fe9.png">'
          ].join("");
          htmlInfoWindow.setContent(frame, {
            width: "200px",
            height: "200px"
          });
  
        this.map.addMarker(options).then((marker: Marker) => {
            marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(res=>{
                
            })
        })
    }

}
