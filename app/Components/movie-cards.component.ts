import {Component, Input, OnInit, OnDestroy} from "@angular/core";
import {MovieService} from "../Services/movie.service";
import {Router} from "@angular/router";
import {Alert, GetType} from "../Classes/Alert";
import {MovieDetails} from "../Classes/MovieDetails";
import {Movie} from "../Classes/Movie";
import {MoviesCacheService} from "../Services/movies-cache.service";
import {Observable, Subscription} from "rxjs";
import {subscribeOn} from "rxjs/operator/subscribeOn";

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

  @Input()
  isQuickLoading:boolean;

  @Input()
  topMarkerText:string;

  @Input()
  sortingLogic:(a: MovieDetails, b: MovieDetails) => number;

  constructor(private movieService: MovieService, router: Router, private movieCacheService:MoviesCacheService){
    this.router = router
    this.moviesWithDetails = [];
    this.alerts = [];
    this.subscriptions=[];
    this.isQuickLoading = false;
    this.isLoading = false;
  }

  ngOnInit(){
    this.populateCheapestMovies();
  }

  goToDetails(id:string):void
  {
    this.router.navigate(['/movie-details', id]);
  }

  closeAlert(alert: Alert) {
    const index: number = this.alerts.indexOf(alert);
    this.alerts.splice(index, 1);
  }

  clickAlert(alert:Alert)
  {
    if(alert.getType == GetType.Details)
    {
      this.getAndPushMovieDetail(alert.movieInfo);
    }
    else if(alert.getType == GetType.List)
    {
      this.populateCheapestMovies();
    }
    this.closeAlert(alert);
  }

  private populateCheapestMovies():void
  {
    this.moviesWithDetails = [];
    this.isLoading = true;
    let subscription = this.movieService.GetMovies().subscribe(movies=>{
      if(movies)
      {
        movies.forEach(movie=>{
          this.getAndPushMovieDetail(movie);
        })
      }
      this.isLoading = false;
    },error=>{

      if(error.status=503) {
        let alert = new Alert();
        alert.getType = GetType.List;
        alert.type = "danger";
        alert.message = "Sorry, Movie list cannot be displayed at this moment. Please click this alert or refresh this page to try again.";
        this.alerts.push(alert);
      }
      else
      {
        this.handlerGeneralErrors(error);
      }
      this.isLoading = false;
    });

    this.subscriptions.push(subscription);
  }

  private getAndPushMovieDetail(movieInfo: Movie):void {

    if (this.isQuickLoading == false) {
      let subscription = this.movieService.GetMovieDetails(movieInfo.ID).subscribe(d => {
        this.moviesWithDetails.push(d);
        this.movieCacheService.updateMovieDetails(d); //this is a full movie details. Store to cache.
      }, error => {

        if (error.status = 503) {
          let alert = new Alert();
          alert.getType = GetType.Details;
          alert.movieInfo = movieInfo;
          alert.type = "danger";
          alert.message = "Sorry, " + movieInfo.Title + " cannot be displayed at this moment. Please click this alert or refresh this page to try again.";
          this.alerts.push(alert);
        }
        else {
          this.handlerGeneralErrors(error);
        }
      });
      this.subscriptions.push(subscription);
    }
    else
    {
      this.moviesWithDetails.push(movieInfo as MovieDetails);
      this.movieCacheService.updateMovie(movieInfo); //this is a partial movie, add to cache
    }

    this.moviesWithDetails.sort(this.sortingLogic);
  }

  private handlerGeneralErrors(error:any):void
  {
    let alert = new Alert();
    alert.type = "danger";
    alert.message = error.toString();
    this.alerts.push()
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription=>{
      subscription.unsubscribe();
      let index = this.subscriptions.indexOf(subscription);
      this.subscriptions.splice(index,1)
    })
  }

}
