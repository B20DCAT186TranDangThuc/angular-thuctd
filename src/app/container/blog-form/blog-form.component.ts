import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {BlogService} from '../../services/blog.service';
import {CategoryService} from '../../services/category.service';
import {PositionService} from '../../services/position.service';
import {Categories} from '../../Models/Categories';
import {Position} from '../../Models/Position';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-blog-form',
  templateUrl: './blog-form.component.html',
  styleUrls: ['./blog-form.component.css'] // Đã sửa 'styleUrl' thành 'styleUrls'
})
export class BlogFormComponent implements OnInit {
  blogId: number | null = null;
  blogForm: FormGroup;
  isLoading: boolean = false;
  selectedImageUrl: string = ''; // URL để hiển thị hình ảnh đã chọn

  categories: Categories[] = []; // Danh sách các danh mục
  positions: Position[] = []; // Danh sách các vị trí

  constructor(
    private fb: FormBuilder,
    private blogService: BlogService,
    private categoryService: CategoryService,
    private positionService: PositionService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    // Khởi tạo form với các trường cần thiết và ràng buộc validators
    this.blogForm = this.fb.group({
      title: ['', Validators.required],
      des: ['', Validators.required],
      detail: ['', Validators.required],
      thumbs: null,
      category: [null, Validators.required], // Danh mục
      position: [[]], // Vị trí
      public: [false], // Công khai
      data_public: [new Date()] // Ngày công khai
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      this.blogId = id ? +id : null; // Chuyển đổi từ string sang number
    })
    if (this.blogId) {
      this.loadBlog(); // Nếu có blogId, tải blog để cập nhật
    }
    console.log(this.blogId);
    this.loadPositions(); // Tải danh sách vị trí
    this.loadCategories(); // Tải danh sách danh mục
  }

  // Tải danh sách vị trí từ service
  loadPositions(): void {
    this.positionService.getPositions().subscribe({
      next: value => this.positions = value,
      error: err => console.log('Lỗi khi tải danh sách vị trí:', err)
    });
  }

  // Tải danh sách danh mục từ service
  loadCategories(): void {
    this.categoryService.getCategories().subscribe({
      next: value => this.categories = value,
      error: err => console.log('Lỗi khi tải danh sách danh mục:', err)
    });
  }

  // Tải dữ liệu blog theo ID
  loadBlog(): void {
    this.blogService.getBlogById(this.blogId!).subscribe({
      next: (blog) => {
        this.blogForm.patchValue(blog); // Điền dữ liệu blog vào form
      },
      error: (error) => {
        console.error('Lỗi khi lấy blog:', error);
        this.isLoading = false;
      }
    });
  }

  // Hiển thị hình ảnh đã chọn từ input file
  displaySelectedImage(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.selectedImageUrl = e.target?.result as string; // Cập nhật URL hình ảnh
      };
      reader.readAsDataURL(fileInput.files[0]);
    }
  }

  // Submit form để tạo mới hoặc cập nhật blog
  submitForm(): void {
    if (this.blogForm.invalid) {
      return; // Nếu form không hợp lệ, không submit
    }

    const blogData = this.blogForm.value;


    blogData.category = Number(blogData.category); // Chuyển đổi category thành number
    blogData.position = blogData.position.map((pos: string) => Number(pos)); // Chuyển đổi mỗi phần tử trong position thành number


    if (this.blogId) {
      // Cập nhật blog
      this.blogService.updateBlog(this.blogId, blogData).subscribe({
        next: (response) => {
          console.log('Blog đã được cập nhật:', response);
          this.router.navigate(['/list']);
        },
        error: (error) => {
          console.error('Lỗi khi cập nhật blog:', error);
        }
      });
    } else {
      // Tạo mới blog
      this.blogService.createBlog(blogData).subscribe({
        next: (response) => {
          console.log('Blog đã được tạo mới:', response);
          this.router.navigate(['/list']);
        },
        error: (error) => {
          console.error('Lỗi khi tạo blog:', error);
        }
      });
    }
  }

  onPositionChange(event: any): void {
    const positionId = event.target.value;
    const positionsArray = this.blogForm.value.position;

    if (event.target.checked) {
      positionsArray.push(positionId); // Thêm vị trí nếu checkbox được chọn
    } else {
      const index = positionsArray.indexOf(Number(positionId));
      if (index > -1) {
        positionsArray.splice(index, 1); // Xóa vị trí nếu checkbox bị bỏ chọn
      }
    }

    this.blogForm.patchValue({position: positionsArray}); // Cập nhật giá trị form
  }
}
