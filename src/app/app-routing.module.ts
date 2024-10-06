import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ListBlogComponent} from "./container/list-blog/list-blog.component";
import {SearchBlogComponent} from "./container/search-blog/search-blog.component";
import {BlogFormComponent} from "./container/blog-form/blog-form.component";

const routes: Routes = [
  { path: 'list', component: ListBlogComponent},
  { path: 'new', component: BlogFormComponent },
  { path: 'search', component: SearchBlogComponent },
  { path: 'edit/:id', component: BlogFormComponent },
  { path: '', redirectTo: '/list', pathMatch: 'full' }, // Redirect mặc định
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
