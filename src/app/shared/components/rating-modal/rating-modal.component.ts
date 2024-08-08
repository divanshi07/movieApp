import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MovieServiceService } from '../../../core/services/movie-service.service';
declare var bootstrap: any;

@Component({
  selector: 'app-rating-modal',
  templateUrl: './rating-modal.component.html',
  styleUrl: './rating-modal.component.css'
})


export class RatingModalComponent implements OnInit{

  @Input() movieId!: number; //holds selcted movie's id
  @Output() ratingUpdated = new EventEmitter<{ movieId: number, rating: number }>(); //emits updated rating

  rating!: number;
  stars: boolean[] = Array(10).fill(false);

  constructor(private movieService: MovieServiceService){
    this.movieService.currentMovieId.subscribe(id => this.movieId = id);
  }

  ngOnInit(): void {

  }

  //opens rating modal and sets up stars
  open(movieId: number) {
    this.movieService.setMovieId(movieId)
    this.rating = 0;
    this.updateStars();
    const modalElement = document.getElementById('ratingModal');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }   
  }

  //sets rating on basis of stars selected
  setRating(rating: number) {
    this.rating = rating;
    this.updateStars();
  }

  updateStars() {
    this.stars = this.stars.map((_, i) => i < this.rating);
  }

  //submits updated rating and emits updated value
  submitRating() {
    if (this.rating >= 1 && this.rating <= 10) {
      this.movieService.updateMovieRating(this.movieId, this.rating);
      this.ratingUpdated.emit({ movieId: this.movieId, rating: this.rating });
      const modalElement = document.getElementById('ratingModal');
      if (modalElement) {
        const modal = bootstrap.Modal.getInstance(modalElement);
        modal.hide();
      }
    }
  }
}
