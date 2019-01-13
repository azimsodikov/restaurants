import { Component, OnInit, ViewChild } from '@angular/core';
import { map } from 'rxjs/operators';

import { Locations, Restaurant } from './../../shared/response.model';
import { RestaurantService } from 'src/app/shared/restaurant.service';

@Component({
  selector: 'app-all-coordinates',
  templateUrl: './all-coordinates.component.html',
  styleUrls: ['./all-coordinates.component.scss']
})
export class AllCoordinatesComponent implements OnInit {
  locations: Locations[];
  @ViewChild('googlemaps') gmapElement: any; // reference to the template
  gmap: google.maps.Map;

  constructor(private restService: RestaurantService) { }


  ngOnInit() {
    const infowindow = new google.maps.InfoWindow;
    const mapProperties = {
      center: new google.maps.LatLng(32.99908456526653, -96.83018780592823),
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    /**
     * Initilize new google maps object with properties
     */
    this.gmap = new google.maps.Map(this.gmapElement.nativeElement, mapProperties);
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
      this.markMultipleLocations(this.gmap, infowindow);
    });
  }
  /**
   * Put marker to multiple locations
   * @param gmap new map object with properties;
   * @param infoWindow new infoWindow object;
   */
  markMultipleLocations(gmap: google.maps.Map, infoWindow: google.maps.InfoWindow): void {
    if (this.locations) {
      this.locations.forEach(function(feature) {
        gmap.setZoom(13);
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
