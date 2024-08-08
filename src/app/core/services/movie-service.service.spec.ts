import { TestBed } from '@angular/core/testing';

import { MovieServiceService } from './movie-service.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('MovieServiceService', () => {
  let movieService: MovieServiceService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MovieServiceService]
    });
    movieService = TestBed.inject(MovieServiceService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(movieService).toBeTruthy();
  });

  it('should retrieve all movies', ()=>{
    const constructorReq = httpTestingController.expectOne('https://dummyapi.online/api/movies');
    expect(constructorReq.request.method).toEqual("GET");

    movieService.getMovies()
    .subscribe(movies => {
      expect(movies).toBeTruthy()
      expect(movies.length).toBe(100)

      const movie = movies.find(movie => movie.id == 1)
      expect(movie?.movie).toBe("The Shawshank Redemption")
    })

    const req = httpTestingController.expectOne('https://dummyapi.online/api/movies')

    expect(req.request.method).toEqual("GET")
  })
});
