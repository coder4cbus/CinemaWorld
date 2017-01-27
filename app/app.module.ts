import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent }  from './app.component';
import {HttpModule, JsonpModule} from "@angular/http";
import {AppRoutingModule} from "./app-routing.module";
import {HomeComponent} from "./home.component";
import {MovieDetailsComponent} from "./movie-details.component";
import {CheapestMoviesComponent} from "./cheapest-movies.component";
import {LocationStrategy, HashLocationStrategy} from "@angular/common";
import {FillPipe} from "./fill.pipe";
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [ BrowserModule,
    HttpModule,
    JsonpModule,
    AppRoutingModule,
    NgbModule.forRoot(),],
  providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }], //to prevent error when refreshed.
  declarations: [ AppComponent,
    HomeComponent,
    MovieDetailsComponent,
    CheapestMoviesComponent,
    FillPipe],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
