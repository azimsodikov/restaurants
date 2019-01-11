import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Restaurant } from 'src/app/shared/response.model';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss']
})
export class ListItemComponent implements OnInit, OnChanges {

  /**
   * It expects singe restaurant instance from parent component
   */
  @Input()restaurant: Restaurant;

  constructor() { }

  ngOnInit() {
  }

  /**
   * A lifecycle hook that is called when any data-bound property of a directive changes.
   * @param changes changes.prop contains the old and the new value...
   */
  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
  }

}
