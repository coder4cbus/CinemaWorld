//Unit Test for MovieCardsComponent

import {async, ComponentFixture, TestBed, inject} from '@angular/core/testing';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {MovieDetails} from "../Classes/MovieDetails";
import {MovieCardsComponent} from "./movie-cards.component";
import {StarMakerPipe} from "../Pipes/starMaker.pipe";
import {MovieService} from "../Services/movie.service";
import {MockBackend} from "@angular/http/testing";
import {HttpClient} from "../Services/http-client.service";
import {BaseRequestOptions, Http} from "@angular/http";
import {Router} from "@angular/router";
import {MoviesCacheService} from "../Services/movies-cache.service";
import {Observable} from "rxjs/Rx";
import {Alert, GetType} from "../Classes/Alert";
import {MovieDummyConstants} from "../Test/DummyMovies";
import {RouterStub} from "../Test/RouteStubs";

describe('MovieCardsComponent', function () {
  let comp: MovieCardsComponent;
  let fixture: ComponentFixture<MovieCardsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MovieCardsComponent, StarMakerPipe ],
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
        MovieService,
        MoviesCacheService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieCardsComponent);
    comp = fixture.componentInstance;
  });

  it('should create component', () => expect(comp).toBeDefined() );

  it('should load movies during ngOnInit (quick mode)', () => {

    let movieService: MovieService = fixture.debugElement.injector.get(MovieService);
    spyOn(movieService, 'GetMovies')
      .and.returnValues(Observable.of(MovieDummyConstants.movieList));

    let movieCacheService: MoviesCacheService = fixture.debugElement.injector.get(MoviesCacheService);
    spyOn(movieCacheService, 'updateMovie');

    comp.sortingLogic = (a: MovieDetails, b: MovieDetails) => {
      if (+a.Year > +b.Year)
        return -1;
      if (+a.Year < +b.Year)
        return 1;
      return 0;
    };
    comp.isQuickLoading=true;
    comp.ngOnInit();

    fixture.whenStable().then(()=>{
      expect(comp.moviesWithDetails.length).toEqual(MovieDummyConstants.movieList.length, 'movie must be 7')
      expect(movieCacheService.updateMovie).toHaveBeenCalledTimes(MovieDummyConstants.movieList.length);
      expect(comp.moviesWithDetails[0].ID).toEqual(MovieDummyConstants.cw2488496.ID);
      expect(comp.moviesWithDetails[1].ID).toEqual(MovieDummyConstants.cw0121766.ID);
      expect(comp.moviesWithDetails[2].ID).toEqual(MovieDummyConstants.cw0121765.ID);
      expect(comp.moviesWithDetails[3].ID).toEqual(MovieDummyConstants.cw0120915.ID);
      expect(comp.moviesWithDetails[4].ID).toEqual(MovieDummyConstants.cw0086190.ID);
      expect(comp.moviesWithDetails[5].ID).toEqual(MovieDummyConstants.cw0080684.ID);
      expect(comp.moviesWithDetails[6].ID).toEqual(MovieDummyConstants.cw0076759.ID);
      expect(comp.isLoading).toEqual(false);
      }
    )
  });

  it('should show alert when error occurs (quick mode)', () => {

    let movieService: MovieService = fixture.debugElement.injector.get(MovieService);
    spyOn(movieService, 'GetMovies')
      .and.returnValue(Observable.throw({status:503}));


    comp.isQuickLoading=true;
    comp.ngOnInit();
    expect(comp.isLoading).toEqual(false);
    expect(comp.alerts[0].message).toEqual("Sorry, Movie list cannot be displayed at this moment. Please click this alert or refresh this page to try again.");
  });

  it('should load movies during ngOnInit (full mode)', () => {

    //Crate Mock GetMovies
    let movieService: MovieService = fixture.debugElement.injector.get(MovieService);
    spyOn(movieService, 'GetMovies')
      .and.returnValue(Observable.of(MovieDummyConstants.movieList));

    //Create Mock GetMovieDetails
    var params = {
      'cw0076759':Observable.of( MovieDummyConstants.cw0076759), //if parameter is cw0076759, return Observable.of( cw0076759)
      'cw0080684':Observable.of( MovieDummyConstants.cw0080684),
      'cw0086190':Observable.of( MovieDummyConstants.cw0086190),
      'cw2488496':Observable.of( MovieDummyConstants.cw2488496),
      'cw0120915':Observable.of( MovieDummyConstants.cw0120915),
      'cw0121766':Observable.of( MovieDummyConstants.cw0121766),
      'cw0121765':Observable.of( MovieDummyConstants.cw0121765),
    }
    spyOn(movieService, 'GetMovieDetails').and.callFake((myParam:any) =>{
     return params[myParam];
    });

    let movieCacheService: MoviesCacheService = fixture.debugElement.injector.get(MoviesCacheService);
    spyOn(movieCacheService, 'updateMovieDetails');

    comp.isQuickLoading=false;
    comp.sortingLogic = (a: MovieDetails, b: MovieDetails) => {
      if (+a.Price < +b.Price)
        return -1;
      if (+a.Price > +b.Price)
        return 1;
      return 0;
    };
    comp.ngOnInit();

    fixture.whenStable().then(()=>{
        expect(comp.moviesWithDetails.length).toEqual(MovieDummyConstants.movieList.length, 'movie must be 7')
        expect(movieCacheService.updateMovieDetails).toHaveBeenCalledTimes(MovieDummyConstants.movieList.length);

        expect(comp.moviesWithDetails[0].ID).toEqual(MovieDummyConstants.cw0121765.ID);
        expect(comp.moviesWithDetails[1].ID).toEqual(MovieDummyConstants.cw0080684.ID);
        expect(comp.moviesWithDetails[2].ID).toEqual(MovieDummyConstants.cw0076759.ID);
        expect(comp.moviesWithDetails[3].ID).toEqual(MovieDummyConstants.cw0121766.ID);
        expect(comp.moviesWithDetails[4].ID).toEqual(MovieDummyConstants.cw2488496.ID);
        expect(comp.moviesWithDetails[5].ID).toEqual(MovieDummyConstants.cw0086190.ID);
        expect(comp.moviesWithDetails[6].ID).toEqual(MovieDummyConstants.cw0120915.ID);

        expect(comp.isLoading).toEqual(false);
      }
    )
  });

  it('should show alert for each movie when error occurs (full mode)', () => {

    let movieService: MovieService = fixture.debugElement.injector.get(MovieService);
    spyOn(movieService, 'GetMovies')
      .and.returnValue(Observable.of(MovieDummyConstants.movieList));

    //Create Mock GetMovieDetails
    var params = {
      'cw0076759':Observable.throw( {status:503}), //if parameter is cw0076759, return Observable.of( cw0076759)
      'cw0080684':Observable.throw( {status:503}),
      'cw0086190':Observable.throw( {status:503}),
      'cw2488496':Observable.throw( {status:503}),
      'cw0120915':Observable.throw( {status:503}),
      'cw0121766':Observable.throw( {status:503}),
      'cw0121765':Observable.throw( {status:503}),
    }
    spyOn(movieService, 'GetMovieDetails').and.callFake((myParam:any) =>{
      return params[myParam];
    });

    let movieCacheService: MoviesCacheService = fixture.debugElement.injector.get(MoviesCacheService);
    let updateMovieSpy = spyOn(movieCacheService, 'updateMovieDetails');

    comp.isQuickLoading=false;
    comp.ngOnInit();

    fixture.whenStable().then(()=> {
      expect(comp.isLoading).toEqual(false);

      expect(comp.alerts[0].movieInfo.ID).toEqual(MovieDummyConstants.cw0076759.ID);
      expect(comp.alerts[1].movieInfo.ID).toEqual(MovieDummyConstants.cw0080684.ID);
      expect(comp.alerts[2].movieInfo.ID).toEqual(MovieDummyConstants.cw0086190.ID);
      expect(comp.alerts[3].movieInfo.ID).toEqual(MovieDummyConstants.cw2488496.ID);
      expect(comp.alerts[4].movieInfo.ID).toEqual(MovieDummyConstants.cw0120915.ID);
      expect(comp.alerts[5].movieInfo.ID).toEqual(MovieDummyConstants.cw0121766.ID);
      expect(comp.alerts[6].movieInfo.ID).toEqual(MovieDummyConstants.cw0121765.ID);
      expect(comp.alerts[0].message).toEqual("Sorry, Star Wars: Episode IV - A New Hope cannot be displayed at this moment. Please click this alert or refresh this page to try again.");
      expect(comp.alerts[1].message).toEqual("Sorry, Star Wars: Episode V - The Empire Strikes Back cannot be displayed at this moment. Please click this alert or refresh this page to try again.");
      expect(comp.alerts[2].message).toEqual("Sorry, Star Wars: Episode VI - Return of the Jedi cannot be displayed at this moment. Please click this alert or refresh this page to try again.");
      expect(comp.alerts[3].message).toEqual("Sorry, Star Wars: The Force Awakens cannot be displayed at this moment. Please click this alert or refresh this page to try again.");
      expect(comp.alerts[4].message).toEqual("Sorry, Star Wars: Episode I - The Phantom Menace cannot be displayed at this moment. Please click this alert or refresh this page to try again.");
      expect(comp.alerts[5].message).toEqual("Sorry, Star Wars: Episode III - Revenge of the Sith cannot be displayed at this moment. Please click this alert or refresh this page to try again.");
      expect(comp.alerts[6].message).toEqual("Sorry, Star Wars: Episode II - Attack of the Clones cannot be displayed at this moment. Please click this alert or refresh this page to try again.");
    });
  });

  it('should load the movie when clickAlert(for failed to retrieve movie) is called', () => {
    let movieService: MovieService = fixture.debugElement.injector.get(MovieService);

    let movieCacheService: MoviesCacheService = fixture.debugElement.injector.get(MoviesCacheService);
    let updateMovieDetails = spyOn(movieCacheService, 'updateMovieDetails');

    comp.isQuickLoading=false;

    var params = {
      'cw0076759':Observable.of(MovieDummyConstants.cw0076759) //if parameter is cw0076759, return Observable.of( cw0076759)
    }

    spyOn(movieService, 'GetMovieDetails').and.callFake((myParam:any) =>{
      return params[myParam];
    });

    let alert:Alert = new Alert();
    alert.getType = GetType.Details;

    let movieInfo:MovieDetails = new MovieDetails();
    movieInfo.ID = 'cw0076759'
    alert.movieInfo = movieInfo;
    comp.alerts.push(alert);

    comp.clickAlert(comp.alerts[0]);

    fixture.whenStable().then(()=>{
        expect(movieCacheService.updateMovieDetails).toHaveBeenCalledTimes(1);
        expect(comp.moviesWithDetails[0].ID).toEqual(MovieDummyConstants.cw0076759.ID);
        expect(comp.isLoading).toEqual(false);
      }
    )

  });

  it('should load all movies when clickAlert(for failed to retrieve movie list) is called', () => {
    let movieService: MovieService = fixture.debugElement.injector.get(MovieService);

    spyOn(movieService, 'GetMovies')
      .and.returnValue(Observable.of(MovieDummyConstants.movieList));

    let movieCacheService: MoviesCacheService = fixture.debugElement.injector.get(MoviesCacheService);
    let updateMovieDetails = spyOn(movieCacheService, 'updateMovieDetails');

    comp.isQuickLoading=false;
    comp.sortingLogic = (a: MovieDetails, b: MovieDetails) => {
      if (+a.Price < +b.Price)
        return -1;
      if (+a.Price > +b.Price)
        return 1;
      return 0;
    };

    var params = {
      'cw0076759':Observable.of( MovieDummyConstants.cw0076759), //if parameter is cw0076759, return Observable.of( cw0076759)
      'cw0080684':Observable.of( MovieDummyConstants.cw0080684),
      'cw0086190':Observable.of( MovieDummyConstants.cw0086190),
      'cw2488496':Observable.of( MovieDummyConstants.cw2488496),
      'cw0120915':Observable.of( MovieDummyConstants.cw0120915),
      'cw0121766':Observable.of( MovieDummyConstants.cw0121766),
      'cw0121765':Observable.of( MovieDummyConstants.cw0121765),
    }

    spyOn(movieService, 'GetMovieDetails').and.callFake((myParam:any) =>{
      return params[myParam];
    });

    let alert:Alert = new Alert();
    alert.getType = GetType.List;

    let movieInfo:MovieDetails = new MovieDetails();
    movieInfo.ID = 'cw0076759'
    alert.movieInfo = movieInfo;
    comp.alerts.push(alert);

    comp.clickAlert(comp.alerts[0]);

    fixture.whenStable().then(()=>{
      expect(comp.moviesWithDetails.length).toEqual(MovieDummyConstants.movieList.length, 'movie must be 7')
      expect(movieCacheService.updateMovieDetails).toHaveBeenCalledTimes(MovieDummyConstants.movieList.length);

      expect(comp.moviesWithDetails[0].ID).toEqual(MovieDummyConstants.cw0121765.ID);
      expect(comp.moviesWithDetails[1].ID).toEqual(MovieDummyConstants.cw0080684.ID);
      expect(comp.moviesWithDetails[2].ID).toEqual(MovieDummyConstants.cw0076759.ID);
      expect(comp.moviesWithDetails[3].ID).toEqual(MovieDummyConstants.cw0121766.ID);
      expect(comp.moviesWithDetails[4].ID).toEqual(MovieDummyConstants.cw2488496.ID);
      expect(comp.moviesWithDetails[5].ID).toEqual(MovieDummyConstants.cw0086190.ID);
      expect(comp.moviesWithDetails[6].ID).toEqual(MovieDummyConstants.cw0120915.ID);

      expect(comp.isLoading).toEqual(false);
      }
    )

  });

  it('should delete the alert when closeAlert is called', ()=>{
    let alert:Alert = new Alert();
    alert.getType = GetType.List;

    let movieInfo:MovieDetails = new MovieDetails();
    movieInfo.ID = 'cw0076759'
    alert.movieInfo = movieInfo;
    comp.alerts.push(alert);

    comp.closeAlert(alert);

    expect(comp.alerts.length).toEqual(0);

  });

  it('should navigate to movie details page when goToDetails is called', inject([Router],(router:Router) =>{
    const spy = spyOn(router,'navigate');
    comp.goToDetails("abc");
    const navArgs = spy.calls.first().args[0];
    expect(navArgs).toContain('/movie-details', 'must navigate to movie-details');
  }));
});
