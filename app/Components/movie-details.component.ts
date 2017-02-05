import {Component, OnInit, OnDestroy} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {MovieService} from "../Services/movie.service";
import {MovieDetails} from "../Classes/MovieDetails";
import {Alert, GetType} from "../Classes/Alert";
import {MoviesCacheService} from "../Services/movies-cache.service";
import {Subscription} from "rxjs";
import {ExceptionHelper} from "../Classes/ExceptionHelper";

//Component to display movie details
@Component({
  moduleId : module.id,
  selector: 'movie-details',
  templateUrl:'movie-details.component.html',
  styleUrls:['movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit,OnDestroy
{
  movieDetails: MovieDetails;
  router:Router;
  alert:Alert;
  id:string;
  provider:string;
  isLoading:boolean;
  isSuccessGet:boolean;
  movieDetailSubsriber: Subscription;

  constructor(private route: ActivatedRoute,
              private movieService: MovieService,
              private movieCacheService: MoviesCacheService)
  {
    this.movieDetails = new MovieDetails();
    this.alert = null;
    this.isLoading = false;
  }

  ngOnInit()
  {
    this.route.params.subscribe(params => {
      this.id = params['id'];// get id from route
      this.provider = params['provider'];// get id from route

      let cachedMovie = this.movieCacheService.getMovieDetails(this.id); //check if id is in the movie details cache

      if(cachedMovie==null) //if not found in the cache, get from server
      {
        this.getMovieDetails(this.id, this.provider);
      }
      else //if found in the cache, use the one from cache.
      {
        this.isSuccessGet = false;
        this.movieDetails = cachedMovie;
        this.isSuccessGet = true;
      }
    });
  }

  //stop the ongoing http request if change to another
  ngOnDestroy()
  {
    if (this.movieDetailSubsriber) {
      this.movieDetailSubsriber.unsubscribe();
    }
  }

  //tries to get the movie details again form the server
  clickAlert(alert:Alert)
  {
    if(alert.getType == GetType.Details) //only for alerts with details type
    {
      this.getMovieDetails(alert.movieInfo.ID, alert.movieInfo.Provider);
      this.alert=null; //hides the alert
    }
  }

  //closes the alert box when X is clicked.
  closeAlert(alert:Alert)
  {
    this.alert=null;
  }

  buyMovie()
  {
    let alert = new Alert();
    alert.type = "info";
    alert.message = "Sorry, unable to buy this movie right now. This functionality is still under construction."
    this.alert = alert;
  }

  //get movie details from the server
  private getMovieDetails(id:string, provider:string):void
  {
    this.isLoading = true;
    this.isSuccessGet = false;
    this.movieDetailSubsriber = this.movieService.GetMovieDetails(id, provider).subscribe((response) => {
        this.movieDetails = response;
        this.movieDetails.Provider = provider;
        this.isLoading = false;
        this.isSuccessGet = true;
        this.movieCacheService.updateMovieDetails(response);
      }, error => {

        let alert = new Alert();
        let cachedMovie = this.movieCacheService.getMovie(id);
        if (cachedMovie) //if null means not found in the cache.
        {
          alert = (ExceptionHelper.CreateAlert(error, cachedMovie as MovieDetails, GetType.Details));
        }
        else {
          //if not found in the cache, display a generic message
          let movie = new MovieDetails();
          movie.ID = id;
          movie.Provider = provider;
          alert.movieInfo = movie;
          alert = (ExceptionHelper.CreateAlert(error, movie as MovieDetails, GetType.Details));
        }
        this.alert = alert;
        this.isLoading = false;
      }
    )
  }

  public encodeURIComponent(url:string):string
  {
    return encodeURIComponent(url)
  }

  public GetPosterUrl(url:string):string
  {
    return this.movieService.GetMoviePosterUrl(url);
  }
}
