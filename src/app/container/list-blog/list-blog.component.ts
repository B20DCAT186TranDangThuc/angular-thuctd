import {Component, OnInit} from '@angular/core';
import {Blogs} from "../../Models/Blogs";
import {BlogService} from "../../services/blog.service";
import * as bootstrap from 'bootstrap';
import {Categories} from "../../Models/Categories";
import {CategoryService} from "../../services/category.service";
import {Position} from "../../Models/Position";

@Component({
  selector: 'list-blog',
  templateUrl: './list-blog.component.html',
  styleUrl: './list-blog.component.css'
})
export class ListBlogComponent implements OnInit {

  blogs: Blogs[] = []
  filteredBlogs: Blogs[] = [];
  categories: Categories[] = []
  positions: Position[] = [
    {
      "id": 0,
      "name": "Việt Nam"
    },
    {
      "id": 1,
      "name": "Châu Á"
    },
    {
      "id": 2,
      "name": "Châu Âu"
    },
    {
      "id": 3,
      "name": "Châu Mỹ"
    }
  ]
  isLoading: boolean = true;
  selectedBlogId: number = 0;

  constructor(private blogService: BlogService,
              private categoryService: CategoryService,) {
  }

  loadCategories(): void {
    this.categoryService.getCategories().subscribe(
      {
        next: value => {
          this.categories = value;
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
          this.blogs.forEach(b => console.log(b.id, b.title))
          this.filteredBlogs = this.blogs;
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
    this.loadCategories();
    this.loadBlogs();
  }

  getCategoryName(categoryId: number): string {
    const category = this.categories.find(c => c.id === categoryId);
    return category ? category.name : 'N/A';
  }

  getPositionName(positionId: number): string {
    const position = this.positions.find(p => p.id === positionId);
    return position ? position.name : 'N/A';
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

  onSearchChange(searchTerm: string): void {

    let textTarget = searchTerm.trim();

    if (!textTarget) {
      this.filteredBlogs = this.blogs; // Nếu ô tìm kiếm trống, hiển thị tất cả blog
    } else {
      this.filteredBlogs = this.blogs.filter(blog =>
        blog.title.toLowerCase().includes(textTarget.toLowerCase()) ||
        blog.des.toLowerCase().includes(textTarget.toLowerCase()) ||
        this.categories[blog.category].name.toLowerCase().includes(textTarget.toLowerCase())
      );
    }
  }


}
