import {Component, Input} from "@angular/core";
import {MovieService} from "../Services/movie.service";
import {Router} from "@angular/router";
import {Alert, GetType} from "../Classes/Alert";
import {MovieDetails} from "../Classes/MovieDetails";
import {Movie} from "../Classes/Movie";

@Component({
  moduleId: module.id,
  selector: 'movie-cards',
  templateUrl: 'movie-cards.component.html',
  styleUrls:['movie-cards.component.css']
})
export class MovieCardsComponent
{
  moviesWithDetails: MovieDetails[];
  private router: Router;
  alerts: Array<Alert>;

  @Input()
  isQuickLoading:boolean;

  @Input()
  topMarkerText:string;

  @Input()
  sortingLogic:(a: MovieDetails, b: MovieDetails) => number;

  constructor(private movieService: MovieService, router: Router){
    this.router = router
    this.moviesWithDetails = [];
    this.alerts = [];
    this.isQuickLoading = false;
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
    this.movieService.GetMovies().subscribe(movies=>{
      if(movies)
      {
        movies.forEach(movie=>{
          this.getAndPushMovieDetail(movie);
        })
      }
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
    })
  }

  private getAndPushMovieDetail(movieInfo: Movie):void {

    if (this.isQuickLoading == false) {
      this.movieService.GetMovieDetails(movieInfo.ID).subscribe(d => {
        this.moviesWithDetails.push(d);
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
    }
    else
    {
      this.moviesWithDetails.push(movieInfo as MovieDetails);
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

}
