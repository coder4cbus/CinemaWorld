import {Component} from "@angular/core";
import {Movie, MovieDetails} from "./Movie";
import {MovieService} from "./movie.service";
/**
 * Created by jaype on 1/24/2017.
 */


@Component({
  moduleId: module.id,
  selector: 'cheapest-movies',
  templateUrl: 'cheapest-movies.component.html',
  styleUrls:['cheapest-movies.component.css']

})
export class CheapestMoviesComponent
{
  moviesWithDetails: MovieDetails[];

  constructor(private movieService: MovieService){
    this.moviesWithDetails = [];
  }

  ngOnInit(){
    // let arrayString:string[] = ['cw0086190','cw0086190'];
    // this.movieService.GetMovieDetails(arrayString).then((movies:MovieDetails[]) => {
    //   this.moviesWithDetails = movies;
    // })


    this.movieService.GetMoviesWithFullDetails().then(movies => {
      this.moviesWithDetails = movies;
    })

  }

}
