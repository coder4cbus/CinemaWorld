import {Alert, GetType} from "./Alert";
import {MovieDetails} from "./MovieDetails";
export class ExceptionHelper {
  static CreateAlert(error: any, movieInfo:MovieDetails, getType:GetType): Alert {
    let alert = new Alert();
    alert.message = error.toString();
    alert.getType = getType;
    alert.type = "danger";

    if (getType == GetType.Details) {
      alert.movieInfo = movieInfo;

      let title: string = "the selected movie";
      if (movieInfo.Title) {
        title = movieInfo.Title;
      }

      if (error.status == 404) {
        alert.message = "Sorry, " + title + " cannot be found in the server. Please click this alert or refresh this page to try again.";
      }
      else {
        alert.message = "Sorry, " + title + " cannot be displayed at this moment. Please click this alert or refresh this page to try again.";
        if (error.status != 503) {
          //Assumption: for error 500, internal error message is not displayed in the UI because this might scare the user. the error details will be logged instead.
          log(error.toString());
        }
      }
    }
    else if (getType == GetType.List) {
      alert.message = "Sorry, Movie list cannot be displayed at this moment. Please click this alert or refresh this page to try again.";
    }

    return alert;
  }
}
