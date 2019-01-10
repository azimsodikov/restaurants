import { HttpClientModule, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { TestBed, async, inject  } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';


import { RestaurantService } from './restaurant.service';

describe('RestaurantService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        HttpClientTestingModule
      ],
      providers: [
        RestaurantService
      ]

    });
  });
  afterEach(inject([HttpTestingController], (backend: HttpTestingController) => {
    backend.verify();
  }));


  it('should make a call to mentioned url', async(inject([HttpClient, HttpTestingController],
    (http: HttpClient, backend: HttpTestingController) => {
      http.get('https://s3.amazonaws.com/br-codingexams/restaurants.json').subscribe();

      backend.expectOne({
        url: 'https://s3.amazonaws.com/br-codingexams/restaurants.json',
        method: 'GET'
      });
  })));

  it('should fetch the restaurants data when call is successful', async(inject([RestaurantService, HttpTestingController],
    (service: RestaurantService, backend: HttpTestingController) => {
      service.getRestaurantsList()
      .subscribe((next) => {
        expect(next).toBeTruthy();
      });

      backend.expectOne('https://s3.amazonaws.com/br-codingexams/restaurants.json')
      .flush('true', { status: 200, statusText: 'Ok' });
  })));

});
