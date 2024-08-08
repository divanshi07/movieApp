import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { MovieCardsComponent } from './features/movies/movie-cards/movie-cards.component';
import { MovieListComponent } from './features/movies/movie-list/movie-list.component';
import { MovieDetailsComponent } from './features/movies/movie-details/movie-details.component';

const routes: Routes = [
  {
    path: "", component: HomeComponent,
  },
  {
    path: "movies", component: MovieCardsComponent,
  },
  {
    path: "movies-list", component: MovieListComponent,
  },
  {
    path: 'movie/:id', component: MovieDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
