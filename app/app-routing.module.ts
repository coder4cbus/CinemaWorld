import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from "./home.component";
import {MovieDetailsComponent} from "./movie-details.component";
import {CheapestMoviesComponent} from "./cheapest-movies.component";

const routes: Routes =
    [
    {
        path: 'home',
        component:HomeComponent
    },
    {
      path: 'movie-details/:id',
      component: MovieDetailsComponent
    },
    {
        path: 'cheapest-movies',
        component: CheapestMoviesComponent
    },
    {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
    }];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]

})
export class AppRoutingModule {
}
