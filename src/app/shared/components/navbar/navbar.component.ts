import { Component, OnInit } from '@angular/core';
import { MovieServiceService } from '../../../core/services/movie-service.service';
import { Movie } from '../../../core/models/movie';
import { Subject, debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  movies: Movie[] = [] //list of movies
  searchTerm: string = ''; //search term for filtering movie list
  private searchSubject: Subject<string> = new Subject<string>();

  constructor(private movieService: MovieServiceService){}

  ngOnInit(): void {
    this.movieService.movies$.subscribe(movies => {
      this.movies = movies;
    });

    // debounced search for limiting search calls
    this.searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(term => {
      this.movieService.setSearchTerm(term);
    });
  }

  //searches movie and returns result
  onSearch(): void {
    this.movieService.setSearchTerm(this.searchTerm);
  }

  onKeyup(event: KeyboardEvent): void {
    const target = event.target as HTMLInputElement;
    this.searchSubject.next(target.value);
  }
}
