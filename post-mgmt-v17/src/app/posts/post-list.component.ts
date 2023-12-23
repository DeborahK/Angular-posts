import { Component, inject } from '@angular/core';
import { PostCategory } from '../post-categories/post-category';
import { PostCategoryService } from '../post-categories/post-category.service';
import { PostService } from './post.service';
import { FormsModule } from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';
import { Post } from './post';

@Component({
  selector: 'pm-post-list',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent {
  title = 'Posts';

  postService = inject(PostService);
  postCategoryService = inject(PostCategoryService);

  categories = toSignal(this.postCategoryService.allCategoriesSorted$, { initialValue: [] as PostCategory[] });
  categories$ = this.postCategoryService.allCategoriesSorted$;
  selectedCategory: PostCategory | undefined;

  posts = toSignal(this.postService.postsForCategory$, { initialValue: [] as Post[] });
  postsForCategory$ = this.postService.postsForCategory$;

  categorySelected(categoryId: number): void {
    this.postService.selectedCategoryChanged(Number(categoryId));
  }

}
