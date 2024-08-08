import { Component, OnInit } from '@angular/core';
import { MovieServiceService } from '../../core/services/movie-service.service';
import { Movie } from '../../core/models/movie';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  movies: Movie[] = [] //List of all movie
  filteredMovies: Movie[] = [] //Filtered list of movies post search
  isLoading: boolean = true; //To display spinner until all data is fetched

  constructor(private movieService: MovieServiceService){}

  ngOnInit(): void {     
    this.getMovies()
  }

  //Fetches list of movies
  getMovies(){  
    this.movieService.movies$.subscribe(movies => {
      this.movies = movies;
      this.filteredMovies = movies;
      setTimeout(()=>{
        this.isLoading = false; //To display loader
      },1000)
    });

    // Searches movie from navbar
    this.movieService.searchTerm$.subscribe(term => {
      this.movieService.searchMovies(term).subscribe(filteredMovies => {
        this.filteredMovies = filteredMovies;
      });
    });    
  }
}
