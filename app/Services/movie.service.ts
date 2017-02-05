import {Injectable} from "@angular/core";
import {HttpClient} from "./http-client.service";
import 'rxjs/add/operator/toPromise';
import {Observable} from "rxjs";
import 'rxjs/Rx';
import {MovieDetails} from "../Classes/MovieDetails";
import {Config} from "../constants";
import {MovieSet} from "../Classes/MovieSet";


@Injectable()
export class MovieService {
  constructor(private httpClient: HttpClient) {
  }
  GetMovies(): Observable<MovieSet[]>
  {
    return this.httpClient.get(Config.urlPrefix + '/movies').map(
      o=>o.json() as MovieSet[]
    );
}

  GetMovieDetails(id: string, provider: string): Observable<MovieDetails> {
    return this.httpClient.get(Config.urlPrefix + '/movies/' + id + "/" + provider).map(
      response => {
      return response.json() as MovieDetails;
    })
  }

  GetMoviePosterUrl(id: string): string {
    return Config.urlPrefix + '/MoviePosters?id=' + encodeURIComponent(id);
  }
}
