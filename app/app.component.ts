import {Component, OnInit} from '@angular/core';
import {MovieService} from "./movie.service";
import {Movie, MovieDetails} from "./Movie";
import {HttpClient} from "./http-client.service";

@Component({
    moduleId: module.id,
    selector: 'my-app',
    templateUrl: 'app.component.html',
    styleUrls:['app.component.css'],
    providers:[MovieService, HttpClient],
})
export class AppComponent implements OnInit{

  movies: Movie[];
  movie: MovieDetails;


  constructor(private movieService: MovieService){

    this.movies = [];
    this.movie = new MovieDetails;


  }

  ngOnInit(){
    // this.movieService.GetMovies2().subscribe((movies) => {
    //   this.movies = movies;
    //
    //
    // })
    //
    //
    // this.movieService.GetMovieDetails("cw0086190").then((movie) => {
    //   this.movie = movie;
    //
    // })




  }

}
