import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from "./Components/home.component";
import {MovieDetailsComponent} from "./Components/movie-details.component";
import {CheapestMoviesComponent} from "./Components/cheapest-movies.component";

const routes: Routes =
    [
    {
        path: 'home',
        component:HomeComponent
    },
    {
      path: 'movie-details/:id/:provider',
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
