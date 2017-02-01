import {Config} from "../constants";
import { Injectable } from '@angular/core';
import {Http, Headers,} from '@angular/http';
import constants = require('../constants');
import 'rxjs/Rx';

@Injectable()
export class HttpClient {
  constructor(private http: Http) { }

  get(url: string) {
    let headers = new Headers();
    headers.append('x-access-token', Config.token);

    return this.http.get(url,  {
      headers: headers
    }).share()
    .retry(3);
  }
}
