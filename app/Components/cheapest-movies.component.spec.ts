/**
 * Created by jaype on 1/31/2017.
 */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By }           from '@angular/platform-browser';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {CheapestMoviesComponent} from "./cheapest-movies.component";
import {MovieDetails} from "../Classes/MovieDetails";

describe('CheapestMoviesComponent', function () {
  let comp: CheapestMoviesComponent;
  let fixture: ComponentFixture<CheapestMoviesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheapestMoviesComponent ],
       schemas:[ NO_ERRORS_SCHEMA ], //to ignore router outlet errors
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheapestMoviesComponent);
    comp = fixture.componentInstance;
    //de = fixture.debugElement.query(By.css('h1'));
  });

  it('should create component', () => expect(comp).toBeDefined() );

  it('should have expected Cheapest Movies Header', () => {
    let de = fixture.debugElement.query(By.css('.component-headers'));
    fixture.detectChanges();
    const h1 = de.nativeElement;
    expect(h1.innerText).toMatch('Cheapest Movies',
      'Show Cheapest Movies Header');
  })

  it('should have correct sorting for cheapest price.', () => {
    comp.ngOnInit();
    let movieDetails1:MovieDetails = new MovieDetails();
    let movieDetails2:MovieDetails = new MovieDetails();
    movieDetails1.Price="1";
    movieDetails2.Price="2";
    expect( comp.sortByCheapest(movieDetails1, movieDetails2)).toBe(-1, 'Must return -1');

    let movieDetails3:MovieDetails = new MovieDetails();
    let movieDetails4:MovieDetails = new MovieDetails();
    movieDetails3.Price="3";
    movieDetails4.Price="4";
    expect( comp.sortByCheapest(movieDetails2, movieDetails1)).toBe(1, 'Must return 1');

    let movieDetails5:MovieDetails = new MovieDetails();
    let movieDetails5A:MovieDetails = new MovieDetails();
    movieDetails5.Price="5";
    movieDetails5A.Price="5";
    expect( comp.sortByCheapest(movieDetails5, movieDetails5A)).toBe(0, 'Must return 0');


  });
});
