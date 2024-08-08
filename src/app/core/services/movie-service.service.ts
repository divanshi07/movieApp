import { Injectable } from '@angular/core';
import { Movie } from '../models/movie';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class MovieServiceService {

  // he API key for accessing The Movie Database (TMDB) API.
  private apiKey: string = '63529cf7e4ba018a240f6891f24631e6'
  //The base URL for accessing The Movie Database (TMDB) API.
  private apiUrl: string = 'https://api.themoviedb.org/3/find/';
  //The URL for fetching movies from a dummy API.
  private imdbUrl: string = 'https://dummyapi.online/api/movies'
  //A list of movies.
  movieList: Movie[] = []

  //A BehaviorSubject that::
  //holds the current search term.
  private searchTermSubject = new BehaviorSubject<string>('');
  //holds the current movie ID.
  private movieIdSource = new BehaviorSubject<number>(1);
  //holds the list of movies.
  private movieListSubject = new BehaviorSubject<Movie[]>([]);

  // An observable that:: 
  //emits the current movie ID.
  currentMovieId = this.movieIdSource.asObservable();
  //emits the current search term.
  searchTerm$ = this.searchTermSubject.asObservable();
  //emits the current list of movies
  movies$ = this.movieListSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadMovies()
  }

  /**
   * Fetches a list of movies from the IMDB URL.
   * 
   * @returns {Observable<Movie[]>} An observable containing an array of movies.
   * @throws Will throw an error if the movies cannot be fetched.
  */
  getMovies(): Observable<Movie[]> {
    try {
      // Make an HTTP GET request to fetch the list of movies from the IMDB URL.
      return this.http.get<Movie[]>(this.imdbUrl)
    }
    catch {
      // Throw an error if the HTTP request fails.
      throw new Error("Cannot fetch movies")
    }
  }

  /**
 * Loads movies and updates the movie list subject.
 * Subscribes to the observable returned by getMovies().
 * On success, updates the movieListSubject with the fetched data.
 * On error, logs the error to the console.
 */
  private loadMovies() {
    this.getMovies().subscribe(
      (data) => {
        this.movieListSubject.next(data);
        this.movieList = data;
      },
      error => console.error('Error fetching movies:', error)
    );
  }

  /**
   * Retrieves a movie by its ID.
   * 
   * @param {number} id - The ID of the movie to retrieve.
   * @returns {Observable<Movie>} An observable containing the movie.
   * @throws Will throw an error if the movie cannot be found.
   */
  getMovie(id: number): Observable<Movie> {
    const movie = this.movieList.find(movie => movie.id === id)
    if (movie) {
      return of(movie)
    }
    else {
      throw new Error("Could not find the movie")
    }
  }

  /**
 * Updates the rating of a specified movie.
 * 
 * @param {number} movieId - The ID of the movie to update.
 * @param {number} rating - The new rating to set for the movie.
 */
  updateMovieRating(movieId: number, rating: number): void {
    const movies = this.movieListSubject.value;
    const movie = movies.find(m => m.id === movieId);
    if (movie) {
      movie.rating = rating;
      //this subject updates the movie-list so the same could be reflected in ui
      this.movieListSubject.next(movies);
    }
  }

  /**
 * Searches for movies by a search term.
 * 
 * @param {string} term - The search term to filter movies.
 * @returns {Observable<Movie[]>} An observable containing the filtered movies.
 */
  searchMovies(term: string): Observable<Movie[]> {
    if (!term.trim()) {
      return of(this.movieList);
    }
    const filteredMovies = this.movieList.filter(movie =>
      movie.movie.toLowerCase().includes(term.toLowerCase())
    );
    return of(filteredMovies);
  }

  /**
 * Sets the search term for filtering movies.
 * 
 * @param {string} term - The search term to set.
 */
  setSearchTerm(term: string): void {
    this.searchTermSubject.next(term);
  }

  /**
 * Retrieves the movie poster URL from the IMDB URL.
 * 
 * @param {string} imdbUrl - The IMDB URL of the movie.
 * @returns {Observable<string>} An observable containing the movie poster URL.
 */
  getMoviePoster(imdbUrl: string): Observable<string> {
    const imdbId = this.extractImdbId(imdbUrl);
    const url = `${this.apiUrl}${imdbId}?api_key=${this.apiKey}&external_source=imdb_id`;
    return this.http.get<any>(url).pipe(
      map(response => this.constructPosterUrl(response))
    );
  }

  /**
 * Extracts the IMDB ID from a given URL.
 * 
 * @param {string} url - The URL to extract the IMDB ID from.
 * @returns {string} The extracted IMDB ID.
 */
  private extractImdbId(url: string): string {
    const regex = /\/title\/(tt\d+)/;
    const matches = url.match(regex);
    return matches ? matches[1] : '';
  }

  /**
   * Constructs the movie poster URL from the API response.
   * 
   * @param {any} response - The API response containing movie data.
   * @returns {string} The constructed movie poster URL.
   */
  private constructPosterUrl(response: any): string {
    const posterPath = response.movie_results[0]?.poster_path;
    return posterPath ? `http://image.tmdb.org/t/p/w780${posterPath}` : '';
  }

  // Sets the current movie ID.
 
  setMovieId(id: number) {
    this.movieIdSource.next(id);
  }
}
