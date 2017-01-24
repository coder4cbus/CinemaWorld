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
