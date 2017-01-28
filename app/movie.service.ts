import {Injectable} from "@angular/core";
import {Movie, MovieDetails} from "./Classes/Movie";
import {HttpClient} from "./http-client.service";
import 'rxjs/add/operator/toPromise';
import {urlPrefix} from "./constants";
import {Observable} from "rxjs";
import 'rxjs/Rx';
/**
 * Created by jaype on 1/22/2017.
 */

@Injectable()
export class MovieService {
  constructor(private httpClient: HttpClient) {
  }

  GetMovies(): Observable<Movie[]>
  {
    return this.httpClient.get(urlPrefix + '/movies').map(o=>o.json().Movies as Movie[]);
  }

  GetMovieDetails2(id: string): Observable<MovieDetails> {
    return this.httpClient.get(urlPrefix + '/movie/' + id).map(response => {
      return response.json() as MovieDetails;
    })
  }

  // private handleError(error: any): Promise<any> {
  //   console.error('An error occurred', error); // for demo purposes only
  //   return Promise.reject(error.message || error);
  // }
}
