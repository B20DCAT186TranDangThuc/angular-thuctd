import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { NavHeaderComponent } from './header/nav-header/nav-header.component';
import { ContainerComponent } from './container/container.component';
import { LeftMenuComponent } from './left-menu/left-menu.component';
import { ListBlogComponent } from './container/list-blog/list-blog.component';
import { SearchBlogComponent } from './container/search-blog/search-blog.component';
import {HttpClientModule} from "@angular/common/http";
import { LoaderComponent } from './loader/loader.component';
import { BlogFormComponent } from './container/blog-form/blog-form.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { SearchComponent } from './container/list-blog/search/search.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NavHeaderComponent,
    ContainerComponent,
    LeftMenuComponent,
    ListBlogComponent,
    SearchBlogComponent,
    LoaderComponent,
    BlogFormComponent,
    SearchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
