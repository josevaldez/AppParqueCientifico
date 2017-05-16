import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Geolocation, Geoposition } from '@ionic-native/geolocation';

import {
 GoogleMaps,
 GoogleMap,
 GoogleMapsEvent,
 LatLng,
 CameraPosition,
 MarkerOptions,
 Marker,
 GroundOverlayOptions,
 GroundOverlay
} from '@ionic-native/google-maps';

/**
 * Generated class for the MapPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {

  constructor(public geolocation: Geolocation, private googleMaps: GoogleMaps, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MapPage');
    this.obtenerPosicion();
    //this.loadMap();
  }

  obtenerPosicion():any{
    this.geolocation.getCurrentPosition().then(response => {
      this.loadMap(response);
    })
    .catch(error =>{
      console.log(error);
    })
  }

  loadMap(postion: Geoposition){

    let latitude = postion.coords.latitude;
    let longitud = postion.coords.longitude;
    /*let latitude = 21.131262;
    let longitud = -89.781358;*/
    console.log(latitude, longitud);

    // create a new map by passing HTMLElement
    let element: HTMLElement = document.getElementById('map');

    let map: GoogleMap = this.googleMaps.create(element);

    // create LatLng object
    let myPosition: LatLng = new LatLng(latitude,longitud);
    console.log(myPosition);

    // create CameraPosition
    let position: CameraPosition = {
      target: myPosition,
      zoom: 18,
      tilt: 0
    };

    map.one(GoogleMapsEvent.MAP_READY).then(()=>{
      console.log('Map is ready!');

      // move the map's camera to position
      map.moveCamera(position);

      // create new marker
      let markerOptions: MarkerOptions = {
        position: myPosition,
        title: 'Here'
      };
	  map.addMarker(markerOptions);

	   let myPosition2: LatLng = new LatLng(21.139329, -89.786656);
	   let myPosition3: LatLng = new LatLng(21.126122, -89.775123);
	   console.log(myPosition2);
		let groundOverlayOptions : GroundOverlayOptions = {
		//url: "http://www.lib.utexas.edu/maps/historical/newark_nj_1922.jpg",
		url: "img/mapa.png",
		bounds: [myPosition2,myPosition3],
		opacity: 0.2
		};
		map.addGroundOverlay(groundOverlayOptions);


    });

  }

  /*
	loadMap() {
		let location = new LatLng(20.987189, -89.643352);

        let map: GoogleMap = new GoogleMap('map', {
          'backgroundColor': 'white',
          'controls': {
            'compass': true,
            'myLocationButton': true,
            'indoorPicker': true,
            'zoom': true
          },
          'gestures': {
            'scroll': true,
            'tilt': true,
            'rotate': true,
            'zoom': true
          },
          'camera': {
            'latLng': location,
            'tilt': 30,
            'zoom': 15,
            'bearing': 50
          }
        });

        map.on(GoogleMapsEvent.MAP_READY).subscribe(() => {
            console.log('Map is ready!');
        });
	 /// make sure to create following structure in your view.html file
	 // and add a height (for example 100%) to it, else the map won't be visible
	 // <ion-content>
	 //  <div #map id="map" style="height:100%;"></div>
	 // </ion-content>

	 // create a new map by passing HTMLElement
	 let element: HTMLElement = document.getElementById('map');

	 let map: GoogleMap = this.googleMaps.create(element);

	 // listen to MAP_READY event
	 // You must wait for this event to fire before adding something to the map or modifying it in anyway
	 map.one(GoogleMapsEvent.MAP_READY).then(
	   () => {
	     console.log('Map is ready!');
	     // Now you can add elements to the map like the marker
	   }
	 );

	 // create LatLng object
	 let ionic: LatLng = new LatLng(20.987189, -89.643352);

	 // create CameraPosition
	 let position: CameraPosition = {
	   target: ionic,
	   zoom: 18,
	   tilt: 30
	 };

	 // move the map's camera to position
	 map.moveCamera(position);

	 // create new marker
	 let markerOptions: MarkerOptions = {
	   position: ionic,
	   title: 'Ionic'
	 };

	 //const marker: Marker =
	 map.addMarker(markerOptions)
	   .then((marker: Marker) => {
	      marker.showInfoWindow();
	    });
	   //*/
	//}
}
