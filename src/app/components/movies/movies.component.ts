import {Component, OnInit} from '@angular/core';
import {Movie} from '../../../model/movie';
import {fakeMovies} from "../../fake-movie";
import {MovieService} from "../../services/movie.service";

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.css'
})

export class MoviesComponent implements OnInit {

  // movie: Movie = {
  //   id: 1,
  //   name: 'Star War',
  //   releaseYear: 2018
  // }

  movies: Movie[] = [];

  constructor(private movieService: MovieService) {

  }

  getMovieFromService() {
    //this.movies = this.movieService.getMovie();

    this.movieService.getMovie().subscribe(movies => this.movies = movies)
  }

  ngOnInit(): void {
    this.getMovieFromService()
  }

  // selectedMovie: Movie | null = null;
  //
  // onSelect(movie: Movie) {
  //   this.selectedMovie = movie;
  // }

}
