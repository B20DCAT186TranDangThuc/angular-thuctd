import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MoviesComponent } from './components/movies/movies.component';
import {FormsModule} from "@angular/forms";
import { MovieDetailComponent } from './components/movie-detail/movie-detail.component';
import {MovieService} from "./services/movie.service";
import { MessagesComponent } from './components/messages/messages.component';
import {MessagesService} from "./services/messages.service";
import { DashboardComponent } from './components/dashboard/dashboard.component';
import {HttpClientModule} from "@angular/common/http";

@NgModule({
  declarations: [
    AppComponent,
    MoviesComponent,
    MovieDetailComponent,
    MessagesComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    MovieService,
    MessagesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
