import { Router, NavigationEnd } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { filter } from 'rxjs/operators';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isListView = false;
  constructor(private router: Router) {}

  ngOnInit() {
    /**
     * Filter out any events that is not NavigationEnd, if yes continue the stream
     */
    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      // Map to the routerState property, since we only need that
      map(() => this.router.routerState)
    ).subscribe((event) => {
      // Based on the URL hide and show back button on navigation
      event.snapshot.url !== '/' ? this.isListView = true : this.isListView = false;
    });
  }

}
