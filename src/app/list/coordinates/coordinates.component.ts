import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Restaurant } from 'src/app/shared/response.model';


@Component({
  selector: 'app-coordinates',
  templateUrl: './coordinates.component.html',
  styleUrls: ['./coordinates.component.scss']
})
export class CoordinatesComponent implements OnInit {
  constructor() { }
  @Input()restaurant: Restaurant;
  @ViewChild('googlemaps') gmapElement: any; // reference to the template
  gmap: google.maps.Map;


  ngOnInit() {
    const geocoder = new google.maps.Geocoder;
    const infowindow = new google.maps.InfoWindow;
    /**
     * When this life cycle hook gets called, we initilize maps properties and pass to the google maps constructor
     * which returns new Map object which we assing to the map property;
     */
    if (this.restaurant) {
      const mapProperties = {
        center: new google.maps.LatLng(this.restaurant.location.lat, this.restaurant.location.lng),
        zoom: 10,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };
      this.gmap = new google.maps.Map(this.gmapElement.nativeElement, mapProperties);
      this.geocodeLatLng(geocoder, this.gmap, infowindow, this.restaurant.location);
    }
  }
  /**
   * Reverse geocode location by lat and lng values and also put name of the plase using infoWindow
   * @param geocoder new Geocoder object;
   * @param map new map object with properties;
   * @param infowindow An InfoWindow can be placed on a map at a particular position or above a marker,
   * depending on what is specified in the options.
   * @param location location of the restaurant;
   */
  geocodeLatLng(geocoder: any, gmap: google.maps.Map, infowindow: google.maps.InfoWindow, location: any): void {
    const latlng = new google.maps.LatLng(location.lat, location.lng);
    geocoder.geocode({'location': latlng}, (results, status) => {
      if (status === 'OK') {
        if (results[0]) {
          gmap.setZoom(14);
          const marker = new google.maps.Marker({
            position: latlng,
            map: gmap,
            animation: google.maps.Animation.DROP,
            draggable: true
          });
          infowindow.setContent(this.restaurant.name);
          infowindow.open(gmap, marker);
        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }
    });
  }
}
