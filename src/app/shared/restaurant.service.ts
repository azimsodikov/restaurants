import { Restaurant, RootRestaurantsObject } from './response.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, pipe } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable()
export class RestaurantService {
  private _restaurantsUrl = 'https://s3.amazonaws.com/br-codingexams/restaurants.json' ;
  /**
   * Injects httpClient Service
   * @param _http injects httpClient Service
   */
  constructor(private _http: HttpClient) { }
  /**
   * Fetchs the data from data source and maps it to the restaurants array
   * @return Observable<Restaurant[]>
   */
  getRestaurantsList(): Observable<Restaurant[]> {
    return this._http.get<Restaurant[]>(this._restaurantsUrl).pipe(
      // Map to the restaurants array
      map((rests: any) => rests.restaurants)
    );
  }
}
