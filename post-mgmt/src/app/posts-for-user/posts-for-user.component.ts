import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Post } from '../posts/post';
import { PostService } from '../posts/post.service';

@Component({
  templateUrl: './posts-for-user.component.html',
  styleUrls: ['./posts-for-user.component.css']
})
export class PostsForUserComponent implements OnInit {
  title = 'Posts for User';
  userName = '';

  private errorMessageSubject = new Subject<string>();
  errorMessage$ = this.errorMessageSubject.asObservable();

  postsForUser$ = this.postService.postsForUser$.pipe(
    map(posts => {
      if (posts.length === 0) {
        this.setErrorMessage('No posts found for this user. (Sample data: wizard1, witch1, wiccan1)');
        return [] as Post[];
      }
      this.setErrorMessage('');
      return posts;
    }),
    catchError(err => {
      this.setErrorMessage(err);
      return [];
    })
  );

  constructor(private postService: PostService) { }

  ngOnInit(): void {
  }

  getPosts(): void {
    this.postService.selectedUserChanged(this.userName);
  }

  setErrorMessage(message: string): void {
    this.errorMessageSubject.next(message);
  }
}
