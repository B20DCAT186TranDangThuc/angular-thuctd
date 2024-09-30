import {Injectable} from '@angular/core';
import {Movie} from "../../model/movie";
import {fakeMovies} from "../fake-movie";
import {catchError, Observable, of, tap} from "rxjs";
import {MessagesService} from "./messages.service";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {log} from "@angular-devkit/build-angular/src/builders/ssr-dev-server";

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private moviesUrl = 'http://localhost:3000/movies';

  constructor(
    private http: HttpClient,
    private messageService: MessagesService) {
  }

  getMovie(): Observable<Movie[]> {
    return this.http.get<Movie[]>(this.moviesUrl).pipe(
      tap(movies => console.log(movies)),
      catchError(error => of([]))
    );
  }

  getMovieFromId(id: number): Observable<Movie> {
    // return of(fakeMovies.find(movie => movie.id === id)!);
    const url = `${this.moviesUrl}/${id}`;

    return this.http.get<Movie>(url).pipe(
      tap(movie => console.log(movie)),
      catchError(error => of(new Movie()))
    );
  }

  updateMovie(movie: Movie): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.put<Movie>(`${this.moviesUrl}/${movie.id}`, movie, httpOptions).pipe(
      tap(updatedMovie => console.log(`updated movie = ${JSON.stringify(updatedMovie)}`)),
      catchError(error => of(new Movie()))
    )
  }
}
