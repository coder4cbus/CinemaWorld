import {Component} from "@angular/core";
import {MovieDetails} from "./Movie";
import {MovieService} from "./movie.service";
import {Router} from "@angular/router";


/**
 * Created by jaype on 1/24/2017.
 */


@Component({
  moduleId: module.id,
  selector: 'cheapest-movies',
  templateUrl: 'cheapest-movies.component.html',
  styleUrls:['cheapest-movies.component.css']
})
export class CheapestMoviesComponent
{
  moviesWithDetails: MovieDetails[];
  router: Router;

  constructor(private movieService: MovieService, router: Router){
    this.router = router
    this.moviesWithDetails = [];
  }


  ngOnInit(){
    this.moviesWithDetails = [];
    this.movieService.GetMovies2().subscribe(movies=>{
      if(movies)
      {
        movies.forEach(movie=>{
          this.movieService.GetMovieDetails2(movie.ID).subscribe(d=>{
            this.moviesWithDetails.push(d);

            this.moviesWithDetails.sort((a:MovieDetails, b: MovieDetails)=>{
              if (+a.Price < +b.Price)
                return -1;
              if (+a.Price > +b.Price)
                return 1;
              return 0;
            })
          }, error=>{ alert(error + " Title:" + movie.Title);});
        })
      }
    },error=>{ alert(error);})

  }

  GoToDetails(id:string):void
  {
     this.router.navigate(['/movie-details', id]);
  }



}
