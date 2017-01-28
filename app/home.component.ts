import {Component, OnInit} from "@angular/core";
import {MovieService} from "./movie.service";
import {Movie} from "./Classes/Movie";

@Component({
  moduleId: module.id,
  selector: 'home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css']

})
export class HomeComponent implements OnInit{
  movies: Movie[];

  constructor(private movieService: MovieService){
    this.movies = [];
  }

  ngOnInit(){
    this.movieService.GetMovies().subscribe((movies) => {
      this.movies = movies;
    })

  }
}
