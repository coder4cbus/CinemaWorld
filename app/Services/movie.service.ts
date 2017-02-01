import {Injectable} from "@angular/core";
import {Movie} from "../Classes/Movie";
import {HttpClient} from "./http-client.service";
import 'rxjs/add/operator/toPromise';
import {Observable} from "rxjs";
import 'rxjs/Rx';
import {MovieDetails} from "../Classes/MovieDetails";
import {Config} from "../constants";


@Injectable()
export class MovieService {
  constructor(private httpClient: HttpClient) {
  }

  GetMovies(): Observable<Movie[]>
  {
    return this.httpClient.get(Config.urlPrefix + '/movies').map(o=>o.json().Movies as Movie[]);
  }

  GetMovieDetails(id: string): Observable<MovieDetails> {
    return this.httpClient.get(Config.urlPrefix + '/movie/' + id).map(response => {
      return response.json() as MovieDetails;
    })
  }
}
