import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { UserProceduralComponent } from './user-procedural/user-procedural.component';

@NgModule({
  imports: [BrowserModule, FormsModule,
    HttpClientModule],
  declarations: [AppComponent, UserComponent, UserProceduralComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
