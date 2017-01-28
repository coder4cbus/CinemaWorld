import {Component} from "@angular/core";
import {MovieService} from "./movie.service";
import {Router} from "@angular/router";
import {Alert, GetType} from "./Classes/Alert";
import {MovieDetails} from "./Classes/MovieDetails";

@Component({
  moduleId: module.id,
  selector: 'cheapest-movies',
  templateUrl: 'cheapest-movies.component.html',
  styleUrls:['cheapest-movies.component.css']
})
export class CheapestMoviesComponent
{
  moviesWithDetails: MovieDetails[];
  private router: Router;
  alerts: Array<Alert>;

  constructor(private movieService: MovieService, router: Router){
    this.router = router
    this.moviesWithDetails = [];
    this.alerts = [];
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
      this.pushMovieDetail(alert.id, alert.title);
    }
    else
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
          this.pushMovieDetail(movie.ID, movie.Title);
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

  private pushMovieDetail(movieID: string, title: string):void
  {
    this.movieService.GetMovieDetails2(movieID).subscribe(d=>{
      this.moviesWithDetails.push(d);

      this.moviesWithDetails.sort((a:MovieDetails, b: MovieDetails)=>{
        if (+a.Price < +b.Price)
          return -1;
        if (+a.Price > +b.Price)
          return 1;
        return 0;
      })

    }, error=>{

      if(error.status=503)
      {
        let alert = new Alert();
        alert.getType = GetType.Details;
        alert.id=movieID
        alert.type = "danger";
        alert.message= "Sorry, " + title + " cannot be displayed at this moment. Please click this alert or refresh this page to try again.";
        this.alerts.push(alert);
      }
      else
      {
        this.handlerGeneralErrors(error);
      }
    });
  }

  private handlerGeneralErrors(error:any):void
  {
    let alert = new Alert();
    alert.type = "danger";
    alert.message = error.toString();
    this.alerts.push()
  }

}
