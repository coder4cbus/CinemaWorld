//Unit Test for MovieDetailsComponent

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {MovieDetailsComponent} from "./movie-details.component";
import {StarMakerPipe} from "../Pipes/starMaker.pipe";
import {Router, ActivatedRoute} from "@angular/router";
import {MovieService} from "../Services/movie.service";
import {HttpClient} from "../Services/http-client.service";
import {MockBackend} from "@angular/http/testing";
import {BaseRequestOptions, Http} from "@angular/http";
import {MoviesCacheService} from "../Services/movies-cache.service";
import {Observable} from "rxjs/Rx";
import any = jasmine.any;
import {Alert, GetType} from "../Classes/Alert";
import {MovieDummyConstants} from "../Test/DummyMovies";
import {ActivatedRouteStub, RouterStub} from "../Test/RouteStubs";

describe('MovieDetailsComponent', function () {
  let comp: MovieDetailsComponent;
  let fixture: ComponentFixture<MovieDetailsComponent>;

  beforeEach(async(() => {
    let routerStub:ActivatedRouteStub = new ActivatedRouteStub({'id': MovieDummyConstants.cw0080684.ID });

    TestBed.configureTestingModule({
      declarations: [ MovieDetailsComponent, StarMakerPipe],
      schemas:[ NO_ERRORS_SCHEMA ], //to ignore router outlet errors
      providers:[
        HttpClient,
        MockBackend, //for mocking http
        BaseRequestOptions, //for mocking http
        {
          provide: Http,
          useFactory: (backendInstance: MockBackend, defaultOptions: BaseRequestOptions) => {
            return new Http(backendInstance, defaultOptions);
          },
          deps: [MockBackend, BaseRequestOptions] //for mocking http
        },
        {provide:Router, useClass: RouterStub},
        {provide:ActivatedRoute, useValue: routerStub},
        MovieService,
        MoviesCacheService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieDetailsComponent);
    comp = fixture.componentInstance;
    //de = fixture.debugElement.query(By.css('h1'));
  });

  it('should create component', () => expect(comp).toBeDefined() );

  it('should retrieve movie from server if not in cached during ngOnInit', () => {


    var params = {
      'cw0080684':Observable.of( MovieDummyConstants.cw0080684)
    }

    let movieService: MovieService = fixture.debugElement.injector.get(MovieService);
    spyOn(movieService, 'GetMovieDetails').and.callFake((myParam:any) =>{
      return params[myParam];
    });

    comp.ngOnInit();

    expect(comp.movieDetails.ID).toEqual(MovieDummyConstants.cw0080684.ID);


  })

  it('should retrieve movie from cache if found during ngOnInit', () => {

    var params = {
      'cw0080684':MovieDummyConstants.cw0080684
    }

    let movieServiceCache: MovieService = fixture.debugElement.injector.get(MoviesCacheService);
    spyOn(movieServiceCache, 'getMovieDetails').and.callFake((myParam:any) =>{
      return params[myParam];
    });

    comp.ngOnInit();

    expect(comp.movieDetails.ID).toEqual(MovieDummyConstants.cw0080684.ID);

  })

  it('should show generic alert when error when retrieving from server. movie info not in cache', () => {

    var params = {
      'cw0080684':Observable.throw(MovieDummyConstants.cw0080684)
    }

    let movieService: MovieService = fixture.debugElement.injector.get(MovieService);
    spyOn(movieService, 'GetMovieDetails').and.callFake((myParam:any) =>{
      return params[myParam];
    });

    comp.ngOnInit();

    expect(comp.alert.movieInfo.ID).toEqual(MovieDummyConstants.cw0080684.ID);
    expect(comp.alert.message).toEqual("Sorry, the selected movie cannot be displayed at this moment. Please click this alert or refresh this page to try again.");

  })

  it('should show specific alert when error when retrieving from server. movie info is in cache', () => {

    var paramsCache = {
      'cw0080684':MovieDummyConstants.cw0080684_partial
    }

    let movieCacheService: MoviesCacheService = fixture.debugElement.injector.get(MoviesCacheService);
    spyOn(movieCacheService, 'getMovie').and.callFake((myParam:any) =>{
      return paramsCache[myParam];
    });

    var params = {
      'cw0080684':Observable.throw( {status:503})
    }

    let movieService: MovieService = fixture.debugElement.injector.get(MovieService);
    spyOn(movieService, 'GetMovieDetails').and.callFake((myParam:any) =>{
      return params[myParam];
    });

    comp.ngOnInit();

    expect(comp.isLoading).toEqual(false);
    expect(comp.alert.movieInfo.ID).toEqual(MovieDummyConstants.cw0080684_partial.ID);
    expect(comp.alert.message).toEqual("Sorry, " + MovieDummyConstants.cw0080684_partial.Title + " cannot be displayed at this moment. Please click this alert or refresh this page to try again.");

  })

  it('should load movies when clickAlert is called', () => {

    var params = {
      'cw0080684':Observable.of( MovieDummyConstants.cw0080684)
    }

    let movieService: MovieService = fixture.debugElement.injector.get(MovieService);
    spyOn(movieService, 'GetMovieDetails').and.callFake((myParam:any) =>{
      return params[myParam];
    });

    let alert:Alert = new Alert();
    alert.movieInfo = MovieDummyConstants.cw0080684;
    alert.getType = GetType.Details;

    comp.alert = alert;
    comp.clickAlert(alert);

    expect(comp.isLoading).toEqual(false);
    expect(comp.alert).toBeNull('alert must be null');

  })

  it('should delete alert when calling closeAlert', () => {

    let alert:Alert = new Alert();
    alert.movieInfo = MovieDummyConstants.cw0080684;
    alert.getType = GetType.Details;

    comp.alert = alert;
    comp.clickAlert(alert);

    expect(comp.alert).toBeNull('alert must be null');

  })

  it('should not delete alert and load movie info if alert is not for movie details', () => {

    let alert:Alert = new Alert();
    alert.movieInfo = MovieDummyConstants.cw0080684;

    comp.alert = alert;
    comp.clickAlert(alert);

    expect(comp.alert).not.toBeNull('alert must be null');

  })
});

