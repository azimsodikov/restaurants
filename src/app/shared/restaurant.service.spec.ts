import { MessageService } from './message.service';
import { HttpErrorHandler } from './http-error-handler.service';
import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';


import { RestaurantService } from './restaurant.service';
import { Restaurant } from './response.model';



describe('RestaurantService', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let restService: RestaurantService;


  const expectedRest: Restaurant[] =
  [{
      'name': 'Hopdoddy Burger Bar',
      'backgroundImageURL': 'http://sandbox.bottlerocketapps.com/BR_iOS_CodingExam_2015_Server/Images/hopdoddy.png',
      'category' : 'Burgers',
            'contact': {
                'phone': '9723872337',
                'formattedPhone': '(972) 387-2337',
                'twitter': 'hopdoddy',
                'facebook': 'hopdoddy',
                'facebookUsername': 'hopdoddy',
                'facebookName': 'hopdoddy'
            },
            'location': {
                'address': '5100 Belt Line Road, STE 502',
                'crossStreet': 'Dallas North Tollway',
                'lat': 32.950787,
                'lng': -96.821118,
                'postalCode': '75254',
                'cc': 'US',
                'city': 'Addison',
                'state': 'TX',
                'country': 'United States',
                'formattedAddress': [
                    '5100 Belt Line Road, STE 502 (Dallas North Tollway)',
                    'Addison, TX 75254',
                    'United States'
                ]
            }
  }];
  beforeEach(() => {
    TestBed.configureTestingModule({
      // Import the HttpClient mocking services
      imports: [ HttpClientTestingModule ],
      // Provide the service-under-test and its dependencies
      providers: [
        RestaurantService,
        HttpErrorHandler,
        MessageService
      ]
    });

    // Inject the http, test controller, and service-under-test
    // as they will be referenced by each test.
    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
    restService = TestBed.get(RestaurantService);
  });

  afterEach(() => {
    // After every test, assert that there are no more pending requests.
    httpTestingController.verify();
  });
  describe('#getListOfRestaurants', () => {
    let expectedRestaurants: Restaurant[];

    beforeEach(() => {
      restService = TestBed.get(RestaurantService);
      expectedRestaurants = expectedRest as Restaurant[];
    });

    it('should return expected restaurants (called once)', () => {
      restService.getRestaurantsList().subscribe(
        rest => expect(rest).toEqual(expectedRestaurants, 'should return expected restaurants'),
        fail
      );
      // restService should have made one request to GET heroes from expected URL
      const req = httpTestingController.expectOne(restService.restaurantsUrl);
      expect(req.request.method).toEqual('GET');

      // Respond with the mock heroes
      req.flush({restaurants: expectedRestaurants});

    });
    it('should be OK returning no restaurants', () => {

      restService.getRestaurantsList().subscribe(
        (rest = []) => expect(rest.length).toEqual(0, 'should have empty restaurants array'),
        fail
      );

      const req = httpTestingController.expectOne(restService.restaurantsUrl);
      req.flush([]); // Respond with no heroes
    });
      // This service reports the error but finds a way to let the app keep going.
    it('should turn 404 into an empty restaurants result', () => {

      restService.getRestaurantsList().subscribe(
        rest => expect(rest.length).toEqual(0, 'should return empty restaurants array'),
        fail
      );

      const req = httpTestingController.expectOne(restService.restaurantsUrl);

      // respond with a 404 and the error message in the body
      const msg = 'deliberate 404 error';
      req.flush(msg, {status: 404, statusText: 'Not Found'});
    });
    it('should return expected restaurants (called multiple times)', () => {

      restService.getRestaurantsList().subscribe();
      restService.getRestaurantsList().subscribe();
      restService.getRestaurantsList().subscribe(
        rest => expect(rest).toEqual(expectedRestaurants, 'should return expected restaurants'),
        fail
      );

      const requests = httpTestingController.match(restService.restaurantsUrl);
      expect(requests.length).toEqual(3, 'calls to getRestaurantsList()');

      // Respond to each request with different mock restaurants results
      requests[0].flush([]);
      requests[1].flush([{restaurant: 'Whole Foods'}]);
    });
  });
});

