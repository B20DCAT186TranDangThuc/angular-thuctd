import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Blogs} from "../Models/Blogs";

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private apiUrl = 'http://localhost:3000/blogs';

  constructor(private http: HttpClient) {
  }

  getBlogs(): Observable<Blogs[]> {
    return this.http.get<Blogs[]>(this.apiUrl)
  }

  deleteBlog(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getBlogById(number: number): Observable<Blogs> {
    return this.http.get<Blogs>(`${this.apiUrl}/${number}`);
  }

  updateBlog(blogId: number, blogData: Blogs): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${blogId}`, blogData);
  }

  createBlog(blogData: Blogs): Observable<void> {
    return this.http.post<void>(this.apiUrl, blogData);

  }
}
