import {Component, OnInit, Input} from '@angular/core';
import {Movie} from "../../../model/movie";
import {ActivatedRoute} from "@angular/router";
import {MovieService} from "../../services/movie.service";
import {Location} from "@angular/common";

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrl: './movie-detail.component.css'
})
export class MovieDetailComponent implements OnInit {
  @Input() movie: Movie | null = null;

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService,
    private location: Location) {
  }

  ngOnInit(): void {
    this.getMovieFromRouter()
  }

  getMovieFromRouter() {
  const id = +this.route.snapshot.paramMap.get("id")!;
  console.log(`this router snapshot: ${JSON.stringify(this.route.snapshot.paramMap)}`);

  this.movieService.getMovieFromId(id).subscribe(movie => this.movie = movie)
  }

  goBack() {
    this.location.back();
  }


  save() {
    this.movieService.updateMovie(this.movie!).subscribe(() => this.goBack())
  }
}
