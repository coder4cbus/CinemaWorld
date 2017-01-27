//this wis act as interceptor in angular js 2

import { Injectable } from '@angular/core';
import {Http, Headers,} from '@angular/http';
import constants = require('./constants');
import 'rxjs/Rx';

@Injectable()
export class HttpClient {
    constructor(private http: Http) { }

    get(url: string) {
        let headers = new Headers();
        headers.append('x-access-token', constants.token);

        return this.http.get(url,  {
            headers: headers
        }).retry(3);
    }
}
