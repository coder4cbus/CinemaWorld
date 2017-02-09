import { NgModule,enableProdMode}      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent }  from './Components/app.component';
import {HttpModule, JsonpModule} from "@angular/http";
import {AppRoutingModule} from "./app-routing.module";
import {HomeComponent} from "./Components/home.component";
import {MovieDetailsComponent} from "./Components/movie-details.component";
import {CheapestMoviesComponent} from "./Components/cheapest-movies.component";
import {LocationStrategy, HashLocationStrategy} from "@angular/common";
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {StarMakerPipe} from "./Pipes/starMaker.pipe";
import {MovieCardsComponent} from "./Components/movie-cards.component";
import {FormsModule} from "@angular/forms";
enableProdMode();

@NgModule({
  imports: [ BrowserModule,
    HttpModule,
    JsonpModule,
    AppRoutingModule,
    NgbModule.forRoot()],
  providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }], //to prevent error when refreshed.
  declarations: [ AppComponent,
    HomeComponent,
    MovieDetailsComponent,
    CheapestMoviesComponent,
    StarMakerPipe,
    MovieCardsComponent],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
