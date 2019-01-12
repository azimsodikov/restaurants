import { Locations } from './../../shared/response.model';
import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Restaurant } from 'src/app/shared/response.model';
import { RestaurantService } from 'src/app/shared/restaurant.service';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-coordinates',
  templateUrl: './coordinates.component.html',
  styleUrls: ['./coordinates.component.scss']
})
export class CoordinatesComponent implements OnInit {
  constructor(private restService: RestaurantService) { }
  @Input()restaurant: Restaurant;
  @ViewChild('googlemaps') gmapElement: any; // reference to the template
  locations: Locations[];
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
      // this.geocodeLatLng(geocoder, gmap, infowindow, this.restaurant.location);
    }

    /**
     * When component is initilized, this methods gets fired which will fetch the data and process the locations to the new array
     */
    this.restService.getRestaurantsList().pipe(
      map((resraurants: Restaurant[]) => resraurants.map(res => {
        /**
         * Map the array and only retrieve latlng and create new object for each of them;
         */
        return {
          position: new google.maps.LatLng(res.location.lat, res.location.lng),
          type: 'info',
          address: res.location.address
        };
      }))
    ).subscribe((value: Locations[]) => {
      this.locations = value;
      this.geocodeMultipleLocations(this.gmap, infowindow);
    });
  }
  /**
   * Reverse geocode location by lat and lng values and also put an address of the plase using infoWindow
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
          infowindow.setContent(results[0].formatted_address);
          infowindow.open(gmap, marker);
        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }
    });
  }
  /**
   * Reverse geocode multiple locations by lat and lng values and put marker;
   * @param gmap new map object with properties;
   */
  geocodeMultipleLocations(gmap: google.maps.Map, infoWindow: google.maps.InfoWindow): void {
    if (this.locations) {
      this.locations.forEach(function(feature) {
        gmap.setZoom(14);
        const marker = new google.maps.Marker({
          position: feature.position,
          map: gmap
        });
        /**
         * Adds event listener to the marker and when that event happens fires the function with correct address
         */
        google.maps.event.addListener(marker, 'click', (function() {
          return function() {
            infoWindow.setContent(feature.address);
            infoWindow.open(gmap, marker);
          };
        })());
      });
    }
  }

}
