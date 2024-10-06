import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Blogs} from "../../Models/Blogs";
import {BlogService} from "../../services/blog.service";
import * as bootstrap from 'bootstrap';
import {Categories} from "../../Models/Categories";
import {CategoryService} from "../../services/category.service";
import {PositionService} from "../../services/position.service";
import {Position} from "../../Models/Position";

@Component({
  selector: 'list-blog',
  templateUrl: './list-blog.component.html',
  styleUrl: './list-blog.component.css'
})
export class ListBlogComponent implements OnInit {

  @Output()
  listCategoriesAndPositions: EventEmitter<{ list1: Categories[], list2: Position[] }> = new EventEmitter<{
    list1: Categories[],
    list2: Position[]
  }>();

  blogs: Blogs[] = []
  categories: Categories[] = []
  positions: Position[] = []
  isLoading: boolean = true;
  selectedBlogId: number = 0;

  constructor(private blogService: BlogService,
              private categoryService: CategoryService,
              private positionService: PositionService) {
  }

  sendData() {
    const data = {
      list1: this.categories,
      list2: this.positions
    }

    this.listCategoriesAndPositions.emit(data);
  }

  loadPositions(): void {
    this.positionService.getPositions().subscribe(
      {
        next: value => this.positions = value,
        error: err => console.log(err)
      }
    )
  }

  loadCategories(): void {
    this.categoryService.getCategories().subscribe(
      {
        next: value => {
          this.categories = value;
          console.log(this.categories)
        },
        error: err => console.log(err)
      }
    )
  }

  loadBlogs(): void {
    this.blogService.getBlogs().subscribe(
      {
        next: value => {
          this.blogs = value;
          this.blogs.forEach(b => console.log(b.id, b.title, b.des, b.detail))
          this.isLoading = false;
        },
        error: error => {
          console.error('Error fetching blogs:', error);
          this.blogs = [];
          this.isLoading = false;
        }
      }
    );
  }

  ngOnInit(): void {
    this.loadBlogs();
    this.loadCategories();
    this.loadPositions();
  }

  openConfirmModal(id: number): void {
    this.selectedBlogId = id; // Lưu ID của blog sẽ xóa
    // Mở modal xác nhận xóa
    const modal = document.getElementById('confirmDeleteModal');
    console.log(modal)
    if (modal) {
      const bsModal = new bootstrap.Modal(modal);
      bsModal.show();
    }
  }

  closeModal(): void {
    const modal = document.getElementById('confirmDeleteModal');
    if (modal) {
      const bsModal = bootstrap.Modal.getInstance(modal);
      if (bsModal) {
        bsModal.hide(); // Gọi hide() chỉ khi bsModal không phải là null
      }
    }
  }

  deleteBlog(id: number) {
    this.blogService.deleteBlog(id).subscribe(
      {
        next: value => {
          console.log(value)
          this.loadBlogs()
        },
        error: error => {
          console.error(error);
        }
      }
    )
    this.closeModal();
  }

}
