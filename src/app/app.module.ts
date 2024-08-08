import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './features/home/home.component';
import { MovieListComponent } from './features/movies/movie-list/movie-list.component';
import { MovieDetailsComponent } from './features/movies/movie-details/movie-details.component';
import { MovieCardsComponent } from './features/movies/movie-cards/movie-cards.component';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { HttpClientModule, provideHttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RatingModalComponent } from './shared/components/rating-modal/rating-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MovieListComponent,
    MovieDetailsComponent,
    MovieCardsComponent,
    NavbarComponent,
    FooterComponent,
    RatingModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [provideHttpClient()],
  bootstrap: [AppComponent]
})
export class AppModule { }
