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
  @ViewChild('googlemaps') gmapElement: any;
  locations: any[];


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
      const gmap = new google.maps.Map(this.gmapElement.nativeElement, mapProperties);
      this.geocodeLatLng(geocoder, gmap, infowindow, this.restaurant.location);
      // this.geocodeMultipleLocations(gmap);
    }

    // this.restService.getRestaurantsList().pipe(
    //   map((resraurants: Restaurant[]) => resraurants.map(res => {
    //     /**
    //      * Map the array and only retrieve latlng and create new object for each of them;
    //      */
    //     return {
    //       position: new google.maps.LatLng(res.location.lat, res.location.lng),
    //       type: 'info'
    //     };
    //   }))
    // ).subscribe((value: any) => {
    //   this.locations = value;
    //   this.geocodeMultipleLocations(gmap);
    // });
  }
  /**
   * Reverse geocode location by lat and lng values
   * @param geocoder new Geocoder object;
   * @param map new map object with properties;
   * @param infowindow An InfoWindow can be placed on a map at a particular position or above a marker,
   * depending on what is specified in the options.
   * @param location location of the restaurant
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
            animation: google.maps.Animation.DROP
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
  geocodeMultipleLocations(gmap): void {
    /**
     * TODO : locations undefined by the time map gets executed, refactor it so it waits for it to be complete
     */
    if (this.locations) {
      this.locations.forEach(function(feature) {
        gmap.setZoom(14);
        const marker = new google.maps.Marker({
          position: feature.position,
          map: gmap,
        });
      });
    }
  }

}
