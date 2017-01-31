/**
 * Created by jaype on 1/31/2017.
 */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By }           from '@angular/platform-browser';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {MovieDetails} from "../Classes/MovieDetails";
import {HomeComponent} from "./home.component";

describe('HomeComponent', function () {
  let comp: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeComponent ],
      schemas:[ NO_ERRORS_SCHEMA ], //to ignore router outlet errors
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    comp = fixture.componentInstance;
    //de = fixture.debugElement.query(By.css('h1'));
  });

  it('should create component', () => expect(comp).toBeDefined() );

  it('should have expected Latest Movies Header', () => {
    let de = fixture.debugElement.query(By.css('.component-headers'));
    fixture.detectChanges();
    const h1 = de.nativeElement;
    expect(h1.innerText).toMatch('Latest Movies',
      'Show Latest Movies Header');
  })

  it('should have correct sorting for years released.', () => {
    comp.ngOnInit();
    let movieDetails1:MovieDetails = new MovieDetails();
    let movieDetails2:MovieDetails = new MovieDetails();
    movieDetails1.Year="2001";
    movieDetails2.Year="2002";
    expect( comp.sortByYear(movieDetails1, movieDetails2)).toBe(1, 'Must return 1');

    let movieDetails3:MovieDetails = new MovieDetails();
    let movieDetails4:MovieDetails = new MovieDetails();
    movieDetails3.Year="2003";
    movieDetails4.Year="2004";
    expect( comp.sortByYear(movieDetails2, movieDetails1)).toBe(-1, 'Must return -1');

    let movieDetails5:MovieDetails = new MovieDetails();
    let movieDetails5A:MovieDetails = new MovieDetails();
    movieDetails5.Year="2005";
    movieDetails5A.Year="2005";
    expect( comp.sortByYear(movieDetails5, movieDetails5A)).toBe(0, 'Must return 0');
  });
});
