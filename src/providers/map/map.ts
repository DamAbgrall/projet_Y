import { Injectable } from '@angular/core';
import { GoogleMaps, GoogleMap, GoogleMapsEvent, Geocoder, LatLng, MarkerOptions, Marker, GoogleMapsAnimation, HtmlInfoWindow } from '@ionic-native/google-maps';
import { Events } from 'ionic-angular';

@Injectable()
export class MapProvider {
    map: GoogleMap;
    mapDiv: HTMLElement;
    eventMarkerInfoList: Array<{event:any,marker:Marker,infoWindow:HtmlInfoWindow}> = [];
    currentMaker: Marker;
    
    constructor(public googleMap: GoogleMaps, public events: Events) {}

    loadMap(element: HTMLElement) {
        this.mapDiv = element;
        return new Promise<{ element: HTMLElement, map: GoogleMap }>((resolve, reject) => {
            let mapOptions = {
                'controls': {
                    'compass': true,
                    'indoorPicker': true,
                    'zoom': true,
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
                this.map.on(GoogleMapsEvent.MAP_LONG_CLICK).subscribe(coordiantes => {
                    console.log(coordiantes);
                    this.latLngtoAddr(coordiantes[0].lat, coordiantes[0].lng).then(addr => {
                        console.log(addr);
                        this.events.publish('MAP_LONG_CLICK', { address: addr, latLnt: coordiantes[0] });
                    })
                })
                this.map.getMyLocation().then(res => {
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
    addrtoLatLng(addr){
        return new Promise<any>((resolve, reject) => {
            var request = {
                'address': addr
            };
            console.log(request);
            Geocoder.geocode(request).then(res => {
                console.log(res);
                resolve(res);
            }).catch(err => {
                console.error(err);
                reject(err);
            })
        })
    }

    distance(lat1, lng1, lat2, lng2) {
        var R = 6371; // Radius of the earth in km
        var dLat = this.deg2rad(lat2 - lat1);  // deg2rad below
        var dLon = this.deg2rad(lng2 - lng1);
        var a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2)
            ;
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var d = R * c; // Distance in km
        return d;
    }
    deg2rad(deg) {
        return deg * (Math.PI / 180)
    }

    addMarker(events: Array<any>) {
        for (let eventTag of events) {
            eventTag.event.endDate = new Date(eventTag.event.endDate)
            eventTag.event.startDate = new Date(eventTag.event.startDate)
            let options: MarkerOptions = {
                icon: {
                    url: 'images/' + eventTag.event.category.name + '.png',
                    size: {
                        width: 32,
                        height: 32
                    }
                },
                position: { lat: eventTag.event.coordinates.lat, lng: eventTag.event.coordinates.lng },
                visible: true,
                animation: GoogleMapsAnimation.DROP,
            };
            this.map.addMarker(options).then((marker: Marker) => {
                let infoWindow = new HtmlInfoWindow();
                let frame: HTMLElement = document.createElement('div');
                var tagsHtml = ""
                console.log(eventTag.tags)
                for (let tag of eventTag.tags) {
                    console.log(tag)
                    tagsHtml = tagsHtml + "<span><i>#" + tag.tag.tagName + "  </i></span>"
                }
                var endDateZero = ""
                var endMonthZero = ""
                var endHourZero = ""
                var endMinuteZero = ""
                var startDateZero = ""
                var startMonthZero = ""
                var startHourZero = ""
                var startMinuteZero = ""
                if (eventTag.event.endDate.getDate() < 10)endDateZero = "0";
                if (eventTag.event.endDate.getMonth() < 10) endMonthZero = "0";
                if (eventTag.event.endDate.getHours() < 10) endHourZero = "0";
                if (eventTag.event.endDate.getMinutes() < 10) endMinuteZero = "0";
                if (eventTag.event.startDate.getDate() < 10)startDateZero = "0";
                if (eventTag.event.startDate.getMonth() < 10) startMonthZero = "0";
                if (eventTag.event.startDate.getHours() < 10) startHourZero = "0";
                if (eventTag.event.startDate.getMinutes() < 10) startMinuteZero = "0";
                frame.innerHTML = [
                    '<div class="container">',
                    '<div class="row">',
                    '<div col-10>',
                    '<h7 class="info-window-text">' + eventTag.event.title + '</h7>',
                    '<p style="font-size:12px" class="info-window-text">' + startDateZero + eventTag.event.startDate.getDate() + '/' + startMonthZero + eventTag.event.startDate.getMonth() + '/' + eventTag.event.startDate.getFullYear() + ' à ' + startHourZero + eventTag.event.startDate.getHours() + 'h' + startMinuteZero + eventTag.event.startDate.getMinutes() + '</p>',
                    '<p style="font-size:12px" class="info-window-text">' + endDateZero + eventTag.event.endDate.getDate() + '/' + endMonthZero + eventTag.event.endDate.getMonth() + '/' + eventTag.event.endDate.getFullYear() + ' à ' + endHourZero + eventTag.event.endDate.getHours() + 'h' + endMinuteZero + eventTag.event.endDate.getMinutes() + '</p>',
                    '<p style="font-size:12px" class="desc info-window-text">' + eventTag.event.description + '</p>',
                    '<hr style="margin: 2px 0px;">',
                    '<div style="font-size:12px">' + tagsHtml + '</div>',
                    '</div >',
                    '<div col-2>',
                    '<button onclick="document.getElementById(\'ghetto\').click();" class="btn pds"><img src="images/three-dots-more-indicator.png"/></button>',
                    '<button class="btn plus"><img src="images/plus-symbol.png"/></button>',
                    '</div >',
                    '</div>',
                    '</div>'
                ].join("");
                infoWindow.setContent(frame, {
                    width: "190px",
                    height: "135px"
                });
                this.eventMarkerInfoList = this.eventMarkerInfoList.concat([{
                    'event': event,
                    'marker': marker,
                    'infoWindow': infoWindow
                }])
                marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(res => {
                    console.log(res[1])
                    infoWindow.open(marker);
                    this.currentMaker = res[1]
                });
            }).catch(err => {
                console.error(err);
            })
        }
    }

}
