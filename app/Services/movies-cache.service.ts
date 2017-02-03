import {Injectable} from "@angular/core";
import {MovieDetails} from "../Classes/MovieDetails";
import {Movie} from "../Classes/Movie";

//This service is created to make loading of movie details faster if already retrieved.

@Injectable()
export class MoviesCacheService
{
  private movieDetailsCache: MovieDetails[];
  private movieCache: Movie[];

  constructor(){
    this.movieDetailsCache = [];
    this.movieCache = [];
  }
  updateMovieDetails(latestMovieVersion: MovieDetails)
  {
    if(this.movieDetailsCache) {
      this.movieDetailsCache.forEach(cachedMovie => {
        if (cachedMovie.ID == latestMovieVersion.ID) //search for the ID
        {
          const index: number = this.movieDetailsCache.indexOf(cachedMovie); //get the index of the match
          this.movieDetailsCache.splice(index, 1); //remove the match
        }
      });
    }

    this.movieDetailsCache.push(latestMovieVersion);
  }

  updateMovie(latestMovieVersion: Movie)
  {
    if(this.movieCache) {
      this.movieCache.forEach(cachedMovie => {
        if (cachedMovie.ID == latestMovieVersion.ID) //search for the ID
        {
          const index: number = this.movieCache.indexOf(cachedMovie); //get the index of the match
          this.movieCache.splice(index, 1); //remove the match
        }
      });
    }

    this.movieCache.push(latestMovieVersion);
  }

  getMovieDetails(id:string):MovieDetails
  {
    let cachedMovie:MovieDetails = null;

    this.movieDetailsCache.forEach(movie=>{
      if(movie.ID==id)
      {
        cachedMovie =  movie;
      }
    });

    return cachedMovie;
  }

  getMovie(id:string):Movie
  {
    let cachedMovie:Movie = null;

    this.movieCache.forEach(movie=>{
      if(movie.ID==id)
      {
        cachedMovie =  movie;
      }
    });

    return cachedMovie;
  }
}
