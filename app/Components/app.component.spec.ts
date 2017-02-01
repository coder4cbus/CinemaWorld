import { AppComponent } from './app.component';

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By }           from '@angular/platform-browser';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {Router} from "@angular/router";
import {RouterStub} from "../Test/RouteStubs";

describe('AppComponent', function () {
  let comp: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppComponent ],
      schemas:      [ NO_ERRORS_SCHEMA ], //to ignore router outlet errors
      providers:[{provide:Router, useClass: RouterStub}]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    comp = fixture.componentInstance;
    //de = fixture.debugElement.query(By.css('h1'));
  });

  it('should create component', () => expect(comp).toBeDefined() );

  it('should have expected CinemaWorld title', () => {
    let de = fixture.debugElement.query(By.css('.navbar-brand'));
    fixture.detectChanges();
    const h1 = de.nativeElement;
    expect(h1.innerText).toMatch('CinemaWorld',
      'Show Cinema World Title');
  });

  it('should have expected Home link', () => {
    let de = fixture.debugElement.query(By.css('[routerLink="/home"]'));
    fixture.detectChanges();
    const h1 = de.nativeElement;
    expect(h1.innerText).toMatch('Home',
      'Show Home link');
  });

  it('should have expected Chepest link', () => {
    let de = fixture.debugElement.query(By.css('[routerLink="/cheapest-movies"]'));
    fixture.detectChanges();
    const h1 = de.nativeElement;
    expect(h1.innerText).toMatch('Cheapest',
      'Show Home link');
  });
});
