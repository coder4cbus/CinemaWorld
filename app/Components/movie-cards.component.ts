import {Component, Input, OnInit, OnDestroy, EventEmitter, Output} from "@angular/core";
import {MovieService} from "../Services/movie.service";
import {Router} from "@angular/router";
import {Alert, GetType} from "../Classes/Alert";
import {MovieDetails} from "../Classes/MovieDetails";
import {Movie} from "../Classes/Movie";
import {MoviesCacheService} from "../Services/movies-cache.service";
import {Subscription} from "rxjs";
import {ExceptionHelper} from "../Classes/ExceptionHelper";

//Component that creates card display for movies
@Component({
  moduleId: module.id,
  selector: 'movie-cards',
  templateUrl: 'movie-cards.component.html',
  styleUrls:['movie-cards.component.css']
})
export class MovieCardsComponent implements OnInit,OnDestroy
{
  moviesWithDetails: MovieDetails[];
  private router: Router;
  alerts: Array<Alert>;
  subscriptions:Subscription[];
  isLoading:boolean;

  //set to true to retrieve only the movie list. Set to false to retrieve the full details for each movie.
  @Input()
  isQuickLoading:boolean;

  //set text of top marker.
  @Input()
  topMarkerText:string;

  //set delagate for sorting logic.
  @Input()
  sortingLogic:(a: MovieDetails, b: MovieDetails) => number;

  constructor(private movieService: MovieService, router: Router, private movieCacheService:MoviesCacheService)
  {
    this.router = router
    this.moviesWithDetails = [];
    this.alerts = [];
    this.subscriptions=[];
    this.isQuickLoading = false;
    this.isLoading = false;
  }

  ngOnInit(){
    this.getMovies();
  }

  //navigates to movie detail.
  goToDetails(id:string, provider:string):void {
    this.router.navigate(['/movie-details', id, provider]);
  }

  //closes the alert box
  closeAlert(alert: Alert)
  {
    const index: number = this.alerts.indexOf(alert);
    this.alerts.splice(index, 1);
  }

  //closes the alert box and tries to retrieve again the movie list/ details.
  clickAlert(alert:Alert)
  {
    if(alert.getType == GetType.Details) //alert box when get movie details has error.
    {
      this.getMovieDetails(alert.movieInfo); //get the movie details again.
    }
    else if(alert.getType == GetType.List) //alert box when get movie list has error.
    {
      this.getMovies(); //get the movie list again.
    }
    this.closeAlert(alert);
  }

  //when switch to another component, this will stop all of the ongoing http requests.
  ngOnDestroy()
  {
    this.subscriptions.forEach(subscription=>{
      subscription.unsubscribe();
      let index = this.subscriptions.indexOf(subscription);
      this.subscriptions.splice(index,1)
    })
  }

  buyMovie()
  {
    let alert = new Alert();
    alert.type = "info";
    alert.message = "Sorry, unable to buy this movie right now. Thi functionality is still under construction."
    this.alerts.push(alert);

  }

  //retrieves all movie list.
  private getMovies():void
  {
    this.moviesWithDetails = [];
    this.isLoading = true;
    let subscription = this.movieService.GetMovies().subscribe(movieSets=>
    {
      if(movieSets)
      {
        movieSets.forEach(movieSet=>
        {
          let movies:Movie[] = JSON.parse(movieSet.Movies).Movies as Movie[];
          movies.forEach(movie =>{
            movie.Provider = movieSet.Provider;
            this.getMovieDetails((movie));
          })
        })
      }
      this.isLoading = false;
    },error=>
    {
      this.alerts.push(ExceptionHelper.CreateAlert(error, null, GetType.List));
      this.isLoading = false;
    });
    this.subscriptions.push(subscription);
  }

  //retrieves the details fo each movie from the server
  private getMovieDetails(movieInfo: Movie):void
  {
    if (this.isQuickLoading == false) //if isQuickLoading is false, retrieves the details of each movie from the server.
    {
      this.isLoading=true;
      let subscription = this.movieService.GetMovieDetails(movieInfo.ID, movieInfo.Provider).subscribe(movieDetails => {
        movieDetails.Provider = movieInfo.Provider;
        this.updateMovies(movieDetails);
        this.movieCacheService.updateMovieDetails(movieDetails); //add to cache.
        this.isLoading=false;
      }, error =>
      {
        this.alerts.push(ExceptionHelper.CreateAlert(error, movieInfo as MovieDetails, GetType.Details));
        this.isLoading=false;
      });
      this.subscriptions.push(subscription);
    }
    else  //if isQuickLoading is true, display cards using partial information.
    {
      this.updateMovies(movieInfo as MovieDetails);
      this.movieCacheService.updateMovie(movieInfo); //add to cache
    }
  }

  //displays the movie in the UI and registers also to the cache.
  private updateMovies(movieInfo:MovieDetails)
  {
    this.moviesWithDetails.push(movieInfo as MovieDetails); //display to UI
    this.moviesWithDetails.sort(this.sortingLogic); // perform sorting
  }

  //handles generic error.
  private handlerGeneralErrors(error:any):void
  {
    let alert = new Alert();
    alert.type = "danger";
    alert.message = error.toString();
    this.alerts.push(alert)
  }
}
