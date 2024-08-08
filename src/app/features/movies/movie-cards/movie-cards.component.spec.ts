import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieCardsComponent } from './movie-cards.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RatingModalComponent } from '../../../shared/components/rating-modal/rating-modal.component';
import { FormsModule } from '@angular/forms';

describe('MovieCardsComponent', () => {
  let component: MovieCardsComponent;
  let fixture: ComponentFixture<MovieCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, FormsModule],
      declarations: [MovieCardsComponent, RatingModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovieCardsComponent);
    
    component = fixture.componentInstance;

    component.movie = {
      id: 1,
      movie: "The Shawshank Redemption",
      rating: 9.2,
      image: "images/shawshank.jpg",
      imdb_url: "https://www.imdb.com/title/tt0111161/" 
    };
    
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
