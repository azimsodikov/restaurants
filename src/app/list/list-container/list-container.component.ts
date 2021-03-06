import { Component, OnInit } from '@angular/core';
import { RestaurantService } from 'src/app/shared/restaurant.service';
import { Observable } from 'rxjs';
import { Restaurant } from 'src/app/shared/response.model';

@Component({
  selector: 'app-list-container',
  templateUrl: './list-container.component.html',
  styleUrls: ['./list-container.component.scss']
})
export class ListContainerComponent implements OnInit {

  /**
   * Holds restaurants data as an observable
   */
  restaurants$: Observable<Restaurant[]>;
  /**
   * Spinner while data is being loaded
   */
  showSpinner = true;
  constructor(private resService: RestaurantService) { }

  ngOnInit() {
    this.restaurants$ = this.resService.getRestaurantsList();
    // Once observable returns value we set spinner to false
    this.restaurants$.subscribe(() => this.showSpinner = false);
  }

}
