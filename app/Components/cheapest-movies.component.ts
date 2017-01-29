import {Component} from "@angular/core";
import {MovieDetails} from "../Classes/MovieDetails";

@Component({
  moduleId: module.id,
  selector: 'cheapest-movies',
  templateUrl: 'cheapest-movies.component.html',
  styleUrls:['cheapest-movies.component.css']
})
export class CheapestMoviesComponent
{
  sortByCheapest:(a: MovieDetails, b: MovieDetails) =>number;

  ngOnInit(){
    this.sortByCheapest = (a: MovieDetails, b: MovieDetails) => {
      if (+a.Price < +b.Price)
        return -1;
      if (+a.Price > +b.Price)
        return 1;
      return 0;
    };

  }
}
