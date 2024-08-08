import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieDetailsComponent } from './movie-details.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MovieServiceService } from '../../../core/services/movie-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Movie } from '../../../core/models/movie';
import { of, throwError } from 'rxjs';
import { RatingModalComponent } from '../../../shared/components/rating-modal/rating-modal.component';

describe('MovieDetailsComponent', () => {
  let component: MovieDetailsComponent;
  let fixture: ComponentFixture<MovieDetailsComponent>;
  let movieService: MovieServiceService;
  let router: jasmine.SpyObj<Router>;
  let activatedRoute: ActivatedRoute;
  let mockMovie: Movie;

  beforeEach(async () => {
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    mockMovie =   {
      id: 1,
      movie: "The Shawshank Redemption",
      rating: 9.2,
      image: "images/shawshank.jpg",
      imdb_url: "https://www.imdb.com/title/tt0111161/"
    },

    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      declarations: [MovieDetailsComponent, RatingModalComponent],
      providers: [
        MovieServiceService,
        { provide: Router, useValue: routerSpy },
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of({ get: () => '1' }) // Mock paramMap to always return an id of '1'
          }
        }
      ]
    })
    .compileComponents();

    movieService = TestBed.inject(MovieServiceService);
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    activatedRoute = TestBed.inject(ActivatedRoute);

    spyOn(movieService, 'getMovie').and.returnValue(of(mockMovie));

    fixture = TestBed.createComponent(MovieDetailsComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set movieId and fetch movie details on init', () => {
    expect(component.movieDetails.id).toBe(1);
    expect(movieService.getMovie).toHaveBeenCalledWith(1);
    expect(component.movieDetails).toEqual(mockMovie);
  });

  it('should fetch the movie poster URL on init', () => {
    spyOn(movieService, 'getMoviePoster').and.returnValue(of('https://image.tmdb.org/t/p/w780/9cqNxx0GxF0bflZmeSMuL5tnGzr.jpg'));
    component.ngOnInit();
    expect(movieService.getMoviePoster).toHaveBeenCalledWith(mockMovie.imdb_url);
    expect(component.posterUrl).toBe('https://image.tmdb.org/t/p/w780/9cqNxx0GxF0bflZmeSMuL5tnGzr.jpg');
  });

  it('should open the rating modal when openRatingModal is called', () => {
    component.ratingModal = jasmine.createSpyObj('RatingModalComponent', ['open']);
    component.openRatingModal(mockMovie.id);
    expect(component.ratingModal.open).toHaveBeenCalledWith(mockMovie.id);
  });

  it('should update the movie rating when onRatingUpdated is called', () => {
    component.movieDetails = mockMovie;
    component.onRatingUpdated({ movieId: mockMovie.id, rating: 5 });
    expect(component.movieDetails.rating).toBe(5);
  });
});
