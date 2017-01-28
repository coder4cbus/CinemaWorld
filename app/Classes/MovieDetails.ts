import {Movie} from "./Movie";

export class MovieDetails extends Movie{
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Metascore: string;
  Rating: string;
  Votes: string;
  Price: string;
}

interface Greeter {
  (message: string): void;
}
