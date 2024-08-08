import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieServiceService } from '../../../core/services/movie-service.service';
import { Movie } from '../../../core/models/movie';
import { RatingModalComponent } from '../../../shared/components/rating-modal/rating-modal.component';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrl: './movie-details.component.css'
})
export class MovieDetailsComponent implements OnInit {

  movieId!: string

  movieDetails!: Movie

  posterUrl!: string

  @ViewChild('ratingModal') ratingModal!: RatingModalComponent;

  constructor(private route: ActivatedRoute, private movieService: MovieServiceService, private router: Router){
  }

  ngOnInit(): void {
   //loads movie details on the basis of id fetched from route
    this.route.paramMap.subscribe(params => {
      const id = params.get('id')
      if(id){
        this.movieId = id
        this.getMovieDetails(Number(this.movieId))
      }
    });
    if(!this.movieDetails){
      this.router.navigate([''])
    }
    this.movieService.getMoviePoster(this.movieDetails.imdb_url).subscribe(posterUrl => {
      this.posterUrl = posterUrl;
    });
  }

  //Fetches movie details based on id
  getMovieDetails(id: number){
    this.movieService.getMovie(id).subscribe((res)=>{
      if(res){
        this.movieDetails = res
      }
    })
  }

  //Opens rating modal for rating the movie
  openRatingModal(movieId: number) {
    this.ratingModal.open(movieId);
  }

  //Updates rating of movie
  onRatingUpdated(event: { movieId: number, rating: number }) {
    if (this.movieDetails.id === event.movieId) {
      this.movieDetails.rating = event.rating;
    }
  }

}
