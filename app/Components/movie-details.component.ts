
import {Component, OnInit, OnDestroy} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {MovieService} from "../Services/movie.service";
import {MovieDetails} from "../Classes/MovieDetails";
import {Alert, GetType} from "../Classes/Alert";
import {MoviesCacheService} from "../Services/movies-cache.service";
import {Subscription} from "rxjs";
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
  isLoading:boolean;
  movieDetailSubsriber: Subscription;

  constructor(private route: ActivatedRoute,
              private movieService: MovieService,
              private movieCacheService: MoviesCacheService){
    this.movieDetails = new MovieDetails();
    this.alert = null;
    this.isLoading = false;
  }

  ngOnInit(){
    this.route.params.subscribe(params => {
      this.id = params['id'];

      let cachedMovie = this.movieCacheService.getMovieDetails(this.id); //check if id is in the movie details cache

      if(cachedMovie==null) //if not found in the cache, get from server
      {
        this.getMovieDetails(this.id);
      }
      else //if found in the cache, use the one from cache.
      {
        this.movieDetails = cachedMovie;
      }
    });
  }

  ngOnDestroy() {
    if (this.movieDetailSubsriber) {
      this.movieDetailSubsriber.unsubscribe();
    }
  }

  private handlerGeneralErrors(error:any):void
  {
    let alert = new Alert();
    alert.type = "danger";
    alert.message = error.toString();
    this.alert = alert;
  }

  private getMovieDetails(id:string):void
  {
    this.isLoading = true;

    this.movieDetailSubsriber = this.movieService.GetMovieDetails(id).subscribe((response) => {
        this.movieDetails = response;
        this.isLoading = false;
      }, error => {
        if (error.status = 503) {
          let alert = new Alert();
          alert.type = "danger";
          alert.getType=GetType.Details;

          let cachedMovie = this.movieCacheService.getMovie(id);

          if(cachedMovie) { //if null means not found in the cache.
            alert.movieInfo = cachedMovie as MovieDetails;
            alert.message = "Sorry, " + cachedMovie.Title + " cannot be displayed at this moment. Please click this alert or refresh this page to try again.";
          }
          else
          {
            let movie = new MovieDetails();
            movie.ID = id;
            alert.movieInfo = movie;
            alert.message = "Sorry, the selected movie cannot be displayed at this moment. Please click this alert or refresh this page to try again.";
          }

          this.alert = alert;
        }
        else {
          this.handlerGeneralErrors(error);
        }

        this.isLoading = false;
      }
    )
  }

  clickAlert(alert:Alert)
  {
    if(alert.getType == GetType.Details)
    {
      this.getMovieDetails(alert.movieInfo.ID);
      this.alert=null;
    }
  }

  closeAlert(alert:Alert)
  {
    this.alert=null;
  }

  buyMovie()
  {
    let alert = new Alert();
    alert.type = "info";
    alert.message = "Sorry, unable to buy this movie right now. Thi functionality is still under construction."
    this.alert = alert;

  }
}
