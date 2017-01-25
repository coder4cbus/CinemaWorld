import {Component, OnInit, transition} from '@angular/core';
import {MovieService} from "./movie.service";
import {Movie, MovieDetails} from "./Movie";
import {HttpClient} from "./http-client.service";

@Component({
    moduleId: module.id,
    selector: 'my-app',
    templateUrl: 'app.component.html',
    styleUrls:['app.component.css'],
    providers:[MovieService, HttpClient]
})
export class AppComponent implements OnInit{

  movies: Movie[];
  movie: MovieDetails;

  constructor(private movieService: MovieService){

    this.movies = [];
    this.movie = new MovieDetails;


  }

  ngOnInit(){
    this.movieService.GetMovies().then((movies) => {
      this.movies = movies;
      // let movie1 = new Movie();
      // movie1.Title = "LOL";
      //
      // let movie2 = new Movie();
      // movie2.Title = "LOL2";
      //
      //
      // this.movies = [];
      // this.movies.push(movie1);
      // this.movies.push(movie2);

    })


    this.movieService.GetMovieDetails("cw0086190").then((movie) => {
      this.movie = movie;

    })



    // this.transactionService.getTransactions().then((transactions) => {
    //   this.transactions = transactions
    // })
  }

}
