import {Injectable} from "@angular/core";
import {Movie, MovieDetails} from "./Movie";
import {HttpClient} from "./http-client.service";
import 'rxjs/add/operator/toPromise';
import {urlPrefix} from "./constants";
/**
 * Created by jaype on 1/22/2017.
 */

@Injectable()
export class MovieService {
  constructor(private httpClient: HttpClient) {
  }

  GetMovies(): Promise<Movie[]> {
    return this.httpClient.get(urlPrefix + '/api/cinemaworld/movies').toPromise().then(response => {
      return response.json().Movies as Movie[];
    }).catch(this.handleError);
  }


  GetMovieDetails(movies: Movie[]): Promise<MovieDetails[]>
  {
    var promises:Promise<MovieDetails>[] = [];
    movies.forEach(movie=>{
      promises.push(this.GetMovie(movie.ID));
    })

    // return Promise.all(promises).then(results=>{
    //   return results;
    // });
    return Promise.all(promises);
  }

  GetMoviesWithFullDetails():Promise<MovieDetails[]>
  {
    return this.GetMovies().then(movies=>{

      //put all of the get movie promises to an array list
      var promises:Promise<MovieDetails>[] = [];
      movies.forEach(movie=>{
        promises.push(this.GetMovie(movie.ID));
      })

      //resolve the get movie promises
      return Promise.all(promises);

    }).catch(this.handleError);
  }

  // GetMoviesWithFullDetails(): Promise<MovieDetails[]> {
  //   let movieDetails:MovieDetails[] = [];
  //   this.GetMovies().then((response)=>{
  //   return Promise.all([response,  ])
  //   })
  //
  //   // this.GetMovies().then((response)=>{
  //   //
  //   //   response.forEach(function(movie) {
  //   //     this.GetMovie(movie.ID).then((response:MovieDetails) => {
  //   //
  //   //     });
  //   //   });
  //   //
  //   //
  //   //
  //   // })
  //
  // }


  // GetMoviesWithFullDetails2(): Promise<MovieDetails[]> {
  //  let movieDetails:MovieDetails[] = [];
  //  this.GetMovies().then((response)=>{
  //
  //    response.forEach(function(movie) {
  //
  //
  //
  //
  //      this.GetMovie(movie.ID).then((response:MovieDetails) => {
  //
  //        }
  //      );
  //
  //
  //
  //    });
  //    return Promise.resolve(movieDetails);
  //  })
  // }

  GetMovie(id: string): Promise<MovieDetails> {
    return this.httpClient.get(urlPrefix + '/api/cinemaworld/movie/' + id).toPromise().then(response => {
      return response.json() as MovieDetails;
    }).catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
