import {Component, OnInit} from "@angular/core";
import {MovieDetails} from "../Classes/MovieDetails";

//Component that is reponsible for home page display.
@Component({
  moduleId: module.id,
  selector: 'home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css']

})
export class HomeComponent implements OnInit{
  sortByYear:(a: MovieDetails, b: MovieDetails) =>number;

  ngOnInit(){
    //The home page sorts the card by latest.
    this.sortByYear = (a: MovieDetails, b: MovieDetails) => {
      if (+a.Year > +b.Year)
        return -1;
      if (+a.Year < +b.Year)
        return 1;
      return 0;
    };
  }
}
