import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostsForUserComponent } from './posts-for-user/posts-for-user.component';
import { PostsGroupbyComponent } from './posts-groupby/posts-groupby.component';
import { PostListComponent } from './posts/post-list.component';

const routes: Routes = [
  { path: 'posts', component: PostListComponent },
  { path: 'posts/grouped', component: PostsGroupbyComponent},
  { path: 'posts/user', component: PostsForUserComponent},
  { path: '', redirectTo: 'posts', pathMatch: 'full' },
  { path: '**', component: PostListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
