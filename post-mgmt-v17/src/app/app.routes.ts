import { Routes } from '@angular/router';
import { PostListComponent } from './posts/post-list.component';

export const routes: Routes = [
  { path: 'posts', component: PostListComponent },
  {
    path: 'posts/grouped',
    loadComponent: () =>
      import('./posts-groupby/posts-groupby.component').then(c => c.PostsGroupbyComponent),
  },
  {
    path: 'posts/user',
    loadComponent: () =>
      import('./posts-for-user/posts-for-user.component').then(c => c.PostsForUserComponent)
  },
  { path: '', redirectTo: 'posts', pathMatch: 'full' },
  { path: '**', component: PostListComponent }
];
