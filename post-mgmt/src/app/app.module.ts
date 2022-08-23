import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PostListComponent } from './posts/post-list.component';
import { AppData } from './app-data';
import { PostsForUserComponent } from './posts-for-user/posts-for-user.component';
import { PostsGroupbyComponent } from './posts-groupby/posts-groupby.component';

@NgModule({
  declarations: [
    AppComponent,
    PostListComponent,
    PostsForUserComponent,
    PostsGroupbyComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    InMemoryWebApiModule.forRoot(AppData),
    NgbModule,
    AppRoutingModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
