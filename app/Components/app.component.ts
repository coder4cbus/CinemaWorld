import {Component} from '@angular/core';
import {MovieService} from "../Services/movie.service";
import {HttpClient} from "../Services/http-client.service";
import {MoviesCacheService} from "../Services/movies-cache.service";

@Component({
    moduleId: module.id,
    selector: 'my-app',
    templateUrl: 'app.component.html',
    styleUrls:['app.component.css'],
    providers:[MovieService, HttpClient, MoviesCacheService],
})
export class AppComponent{}
