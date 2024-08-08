import { Component, OnInit } from '@angular/core';
import { Movie } from '../../../core/models/movie';
import { MovieServiceService } from '../../../core/services/movie-service.service';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrl: './movie-list.component.css'
})
export class MovieListComponent implements OnInit{
  movies: Movie[] = []
  filteredMovies: Movie[] = [] 
  isLoading: boolean = true;
  noMovieFound: boolean = false;

  constructor(private movieService: MovieServiceService){}

  ngOnInit(): void {     
    this.getMovies()
  }

  getMovies(){  
    this.movieService.movies$.subscribe(movies => {
      this.movies = movies;
      this.filteredMovies = movies;
      setTimeout(()=>{
        this.isLoading = false;
      },1000)
    });

    this.movieService.searchTerm$.subscribe(term => {
      this.movieService.searchMovies(term).subscribe(filteredMovies => {
        this.filteredMovies = filteredMovies;
      });
    });    
  }

}
