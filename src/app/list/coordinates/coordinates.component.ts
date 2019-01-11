import { Component, OnInit, ViewChild } from '@angular/core';


@Component({
  selector: 'app-coordinates',
  templateUrl: './coordinates.component.html',
  styleUrls: ['./coordinates.component.scss']
})
export class CoordinatesComponent implements OnInit {
  constructor() { }

  @ViewChild('googlemaps') gmapElement: any;
  map: google.maps.Map;
  geocoder: google.maps.Geocoder;
  infowindow: google.maps.InfoWindow;

  ngOnInit() {
    this.geocoder = new google.maps.Geocoder;
    this.infowindow = new google.maps.InfoWindow;
    /**
     * When this life cycle hook gets called, we initilize maps properties and pass to the google maps constructor
     * which returns new Map object which we assing to the map property;
     */
    const mapProperties = {
      center: new google.maps.LatLng(32.95703457542545, -96.82081996316793),
      zoom: 8,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProperties);
    this.geocodeLatLng(this.geocoder, this.map, this.infowindow);
  }

  geocodeLatLng(geocoder, map, infowindow) {
    const latlng = new google.maps.LatLng(32.95703457542545, -96.82081996316793);
    geocoder.geocode({'location': latlng}, function(results, status) {
      if (status === 'OK') {
        if (results[0]) {
          map.setZoom(11);
          const marker = new google.maps.Marker({
            position: latlng,
            map: map,
            animation: google.maps.Animation.DROP
          });
          infowindow.setContent(results[0].formatted_address);
          infowindow.open(map, marker);
        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }
    });
  }
  // callback(results, status) {
  //   if (status === google.maps.places.PlacesServiceStatus.OK) {
  //     for (let i = 0; i < results.length; i++) {
  //       this.createMarker(results[i]);
  //     }
  //   }
  // }
  // createMarker(place) {
  //   const placeLoc = place.geometry.location;
  //   const marker = new google.maps.Marker({
  //     map: this.map,
  //     position: place.geometry.location
  //   });

  //   google.maps.event.addListener(marker, 'click', function() {
  //     this.infowindow.setContent(place.name);
  //     this.infowindow.open(this.map, this);
  //   });
  // }

}
