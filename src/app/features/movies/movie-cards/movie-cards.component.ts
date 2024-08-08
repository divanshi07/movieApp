import { ChangeDetectorRef, Component, Input, OnInit, ViewChild } from '@angular/core';
import { Movie } from '../../../core/models/movie';
import { MovieServiceService } from '../../../core/services/movie-service.service';
import { Router } from '@angular/router';
import { RatingModalComponent } from '../../../shared/components/rating-modal/rating-modal.component';

@Component({
  selector: 'app-movie-cards',
  templateUrl: './movie-cards.component.html',
  styleUrl: './movie-cards.component.css'
})
export class MovieCardsComponent implements OnInit {

  @Input() movie!: Movie //stores individual movie details

  @ViewChild('ratingModal') ratingModal!: RatingModalComponent; //Modal popup for rating movie

  posterUrl!: string; //Image url variable

  constructor(private movieService: MovieServiceService, private router: Router, private cdr: ChangeDetectorRef){}

  ngOnInit(): void {
    //Retrievs image url from given imdb_url of movie
    this.movieService.getMoviePoster(this.movie.imdb_url).subscribe(posterUrl => {
      this.posterUrl = posterUrl;
    });
  }

  //Fetched movie details on click
  getMovie(id: number){
    this.router.navigate(['/movie', id]);
  }

  //Opens rating modal
  openRatingModal(movieId: number) {
    this.ratingModal.open(movieId);
  }

  //Updates rating of movie
  onRatingUpdated(event: { movieId: number, rating: number }) {
    if (this.movie.id === event.movieId) {
      this.movie.rating = event.rating;
      this.cdr.detectChanges(); // Manually trigger change detection
    }
  }
}
