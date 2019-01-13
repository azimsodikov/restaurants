import { HandleError, HttpErrorHandler } from './http-error-handler.service';
import { Restaurant, RootRestaurantsObject } from './response.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';


@Injectable()
export class RestaurantService {
  public restaurantsUrl = 'https://s3.amazonaws.com/br-codingexams/restaurants.json' ;
  private handleError: HandleError;

  /**
   * Injects httpClient Service
   * @param _http injects httpClient Service
   */
  constructor(private _http: HttpClient, httpErrorHandler: HttpErrorHandler) {
    this.handleError = httpErrorHandler.createHandleError('HeroesService');
  }
  /**
   * Fetchs the data from data source and maps it to the restaurants array
   * @return Observable<Restaurant[]>
   */
  getRestaurantsList(): Observable<Restaurant[]> {
    return this._http.get<Restaurant[]>(this.restaurantsUrl).pipe(
      // Map to the restaurants array
      map((rests: any) => rests.restaurants),
      catchError(this.handleError('getRestaurantsList', []))
    );
  }
}
