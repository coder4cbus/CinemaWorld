import { Injectable } from '@angular/core';
import {Http,} from '@angular/http';
import constants = require('../constants');
import 'rxjs/Rx';

@Injectable()
export class HttpClient {
  constructor(private http: Http) { }

  get(url: string) {
    return this.http.get(url,  {
    }).share()
     .retry(3);
  }
}
