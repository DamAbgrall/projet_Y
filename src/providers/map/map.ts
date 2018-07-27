import { Injectable } from '@angular/core';
import { GoogleMaps, GoogleMap, GoogleMapsEvent, Geocoder, LatLng, MarkerOptions, Marker, GoogleMapsAnimation, HtmlInfoWindow } from '@ionic-native/google-maps';

@Injectable()
export class MapProvider {
    map: GoogleMap;
    mapDiv: HTMLElement;
    eventMarkerInfoList: Array<any> = [];
    constructor(public googleMap: GoogleMaps) {

    }

    loadMap(element: HTMLElement) {
        console.log(element);
        this.mapDiv = element;
        return new Promise<{ element: HTMLElement, map: GoogleMap }>((resolve, reject) => {
            let mapOptions = {
                'controls': {
                    'compass': true,
                    'indoorPicker': true,
                    'zoom': true, // Only for Android
                    'myLocationButton': true,
                    'myLocation': true,
                },
                'gestures': {
                    'scroll': true,
                    'tilt': true,
                    'rotate': true,
                    'zoom': true
                },
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
            }).catch(err => {
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
    addMarker(events: Array<any>) {
        for (let event of events) {
            let options: MarkerOptions = {
                icon: {
                    url: 'images/' + event.categ + '.png',
                    size: {
                        width: 32,
                        height: 32
                    }
                },
                position: { lat: event.coordinates.lat, lng: event.coordinates.lng },
                visible: true,
                animation: GoogleMapsAnimation.DROP,
            };
            this.map.addMarker(options).then((marker: Marker) => {
                let infoWindow = new HtmlInfoWindow();
                let frame: HTMLElement = document.createElement('div');
                var tagsHtml = ""
                for (let tag of event.tags) {
                    tagsHtml = tagsHtml + "<span><i>#" + tag + "  </i></span>"
                }
                var dateZero = ""
                var monthZero = ""
                var hourZero = ""
                var minuteZero = ""
                if (event.dateEvent.getDate() < 10) {
                    dateZero = "0";
                }
                if (event.dateEvent.getMonth() < 10) {
                    monthZero = "0";
                }
                if (event.dateEvent.getHours() < 10) {
                    hourZero = "0";
                }
                if (event.dateEvent.getMinutes() < 10) {
                    minuteZero = "0";
                }
                frame.innerHTML = [
                    '<div class="container">',
                    '<div class="row">',
                    '<div col-10>',
                    '<h6 class="info-window-text">' + event.title + '</h6>',
                    '<p style="font-size:12px" class="info-window-text">' + dateZero + event.dateEvent.getDate() + '/' + monthZero + event.dateEvent.getMonth() + '/' + event.dateEvent.getFullYear() + ' à ' + hourZero + event.dateEvent.getHours() + 'h' + minuteZero + event.dateEvent.getMinutes() + '</p>',
                    '<p style="font-size:12px" class="desc info-window-text">' + event.description + '</p>',
                    '<hr style="margin: 2px 0px;">',
                    '<div style="font-size:12px">' + tagsHtml + '</div>',
                    '</div >',
                    '<div col-2>',
                    '<button class="btn pds"><img src="images/three-dots-more-indicator.png"/></button>',
                    '<button class="btn plus"><img src="images/plus-symbol.png"/></button>',
                    '</div >',
                    '</div>',
                    '</div>'
                ].join("");
                infoWindow.setContent(frame, {
                    width: "190px",
                    height: "135px"
                });
                this.eventMarkerInfoList.concat({
                    'event': event,
                    'marker': marker,
                    'infoWindow': infoWindow
                })
                marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(res => {
                    infoWindow.open(marker);
                })
            }).catch(err => {
                console.error(err);
            })

        }
    }

}
