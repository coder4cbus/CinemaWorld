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
  styleUrls:['cheapest-movies.component.css'],

})
export class CheapestMoviesComponent
{
  moviesWithDetails: MovieDetails[];

  constructor(private movieService: MovieService){
    this.moviesWithDetails = [];
  }




  ngOnInit(){
    //    this.movieService.GetMoviesDetails().then(movies => {
    //   this.moviesWithDetails = movies;
    // }).catch(error=>{
    //   alert(error);
    //    });

    this.moviesWithDetails = [];
    this.movieService.GetMovies2().subscribe(movies=>{
      if(movies)
      {
        movies.forEach(movie=>{
          this.movieService.GetMovieDetails2(movie.ID).subscribe(d=>{
            this.moviesWithDetails.push(d);
          }, error=>{ alert(error + " Title:" + movie.Title);});
        })
      }
    },error=>{ alert(error);})

  }

}
