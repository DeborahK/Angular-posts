import { Component, OnInit } from '@angular/core';
import { PostService } from '../posts/post.service';

@Component({
  templateUrl: './posts-groupby.component.html',
  styleUrls: ['./posts-groupby.component.css']
})
export class PostsGroupbyComponent implements OnInit {
  title = 'All Posts Grouped by Category';

  // Provide array of tuples
  postsGroupedByCategory$ = this.postService.postsGroupedByCategory$;

  // Alternate: Provide key/value pairs
  postsGroupedByCategoryKeyValue$ = this.postService.postsGroupedByCategoryKeyValue$;

  constructor(private postService: PostService) { }

  ngOnInit(): void {
  }

}
