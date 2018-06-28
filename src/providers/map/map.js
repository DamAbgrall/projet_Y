import { Injectable } from '@angular/core';
import { GoogleMaps, GoogleMapsEvent } from '@ionic-native/google-maps';
var MapProvider = /** @class */ (function () {
    function MapProvider(googleMap) {
        this.googleMap = googleMap;
    }
    MapProvider.prototype.loadMap = function (element) {
        var _this = this;
        console.log(element);
        this.mapDiv = element;
        return new Promise(function (resolve, reject) {
            var mapOptions = {
                styles: [{ "featureType": "administrative.province", "elementType": "all", "stylers": [{ "visibility": "off" }] }, { "featureType": "landscape", "elementType": "all", "stylers": [{ "saturation": -100 }, { "lightness": 65 }, { "visibility": "on" }] }, { "featureType": "poi", "elementType": "all", "stylers": [{ "saturation": -100 }, { "lightness": 51 }, { "visibility": "simplified" }] }, { "featureType": "road.highway", "elementType": "all", "stylers": [{ "saturation": -100 }, { "visibility": "simplified" }] }, { "featureType": "road.arterial", "elementType": "all", "stylers": [{ "saturation": -100 }, { "lightness": 30 }, { "visibility": "on" }] }, { "featureType": "road.local", "elementType": "all", "stylers": [{ "saturation": -100 }, { "lightness": 40 }, { "visibility": "on" }] }, { "featureType": "transit", "elementType": "all", "stylers": [{ "saturation": -100 }, { "visibility": "simplified" }] }, { "featureType": "transit", "elementType": "geometry.fill", "stylers": [{ "visibility": "on" }] }, { "featureType": "water", "elementType": "geometry", "stylers": [{ "hue": "#ffff00" }, { "lightness": -25 }, { "saturation": -97 }] }, { "featureType": "water", "elementType": "labels", "stylers": [{ "visibility": "on" }, { "lightness": -25 }, { "saturation": -100 }] }]
            };
            _this.map = GoogleMaps.create(_this.mapDiv, mapOptions);
            _this.map.one(GoogleMapsEvent.MAP_READY).then(function () {
                _this.map.setCameraZoom(14);
                _this.map.getMyLocation().then(function (res) {
                    _this.map.setCameraTarget(res.latLng);
                }).catch(function (err) {
                    console.error(err);
                    reject(err);
                });
                _this.map.setOptions({
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
                });
            }).catch(function (err) {
                console.error(err);
                reject(err);
            });
            resolve({ element: _this.mapDiv, map: _this.map });
        });
    };
    MapProvider.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    MapProvider.ctorParameters = function () { return [
        { type: GoogleMaps, },
    ]; };
    return MapProvider;
}());
export { MapProvider };
//# sourceMappingURL=map.js.map