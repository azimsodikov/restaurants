import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Restaurant } from 'src/app/shared/response.model';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  restaurant: Restaurant;
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    /**
     * Parse the json back to js object
     */
    this.route.queryParams.subscribe(
      params => {
        this.restaurant = JSON.parse(params.restaurant);
    });
  }

}
