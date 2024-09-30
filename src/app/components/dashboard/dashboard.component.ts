import {Component, OnInit} from '@angular/core';
import {Movie} from "../../../model/movie";
import {MovieService} from "../../services/movie.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {

  movies: Movie[] = []


  constructor(private movieService: MovieService) {
  }

  getMovie(): void {
    this.movieService.getMovie().subscribe(movies => this.movies = movies.slice(1, 5))
  }

  ngOnInit(): void {
    this.getMovie()
  }

}
