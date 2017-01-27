
import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Params} from "@angular/router";
import {MovieService} from "./movie.service";
import {MovieDetails} from "./Movie";
@Component({
  moduleId : module.id,
  selector: 'movie-details',
  templateUrl:'movie-details.component.html',
  styleUrls:['movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit
{
  id: string;
  m: MovieDetails;
  checkIfHaveNullProperties(): boolean
  {
    for (var property in MovieDetails) {
      if (MovieDetails.hasOwnProperty(property)) {
        if(!property)
        {
          return false;
        }
      }
      return true;
    }
  }



  constructor(private route: ActivatedRoute,
    private movieService: MovieService){
    this.m = new MovieDetails();
  }

  ngOnInit(){
    this.route.params.forEach((params: Params) => {
      this.id = params['id'];
      this.movieService.GetMovieDetails2(this.id).subscribe((response) => {
          this.m = response;
        }
      );
    });
  }

}
