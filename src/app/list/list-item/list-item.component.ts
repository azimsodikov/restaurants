import { Component, OnInit, Input } from '@angular/core';
import { Restaurant } from 'src/app/shared/response.model';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss']
})
export class ListItemComponent implements OnInit {

  /**
   * It expects singe restaurant instance from parent component
   */
  @Input()
  restaurant: Restaurant;
  constructor(private router: Router) { }

  ngOnInit() {
  }

  /**
   * When user clicks to particular restaurant, this will emit event
   */
  onSelect() {
    // Stringifies selected restaurant and passes through activated route
    const navigationExtras: NavigationExtras = {
      queryParams: { restaurant: JSON.stringify(this.restaurant) }
    };
    this.router.navigate(['details'], navigationExtras);
  }

}
