import {NavigationExtras, ActivatedRoute, Params} from "@angular/router";
import {Observable} from "rxjs/Rx";

export class RouterStub {
  navigateByUrl(url: string) { return url; }
  navigate(commands: any[], extras?: NavigationExtras) { }
}

export class ActivatedRouteStub extends ActivatedRoute {
  params: Observable<Params>

  constructor(parameters?: { [key: string]: any; }) {
    super();
    this.params = Observable.of(parameters);
  }
}
