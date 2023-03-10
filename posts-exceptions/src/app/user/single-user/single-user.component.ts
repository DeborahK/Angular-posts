import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { catchError, EMPTY } from 'rxjs';
import { SingleUserService } from './single-user.service';

@Component({
  selector: 'app-single-user',
  templateUrl: './single-user.component.html',
  standalone: true,
  imports: [CommonModule],
  styleUrls: ['./single-user.component.css']
})
export class SingleUserComponent {
  errorMessage = '';

  todos$ = this.userService.todos$.pipe(
    catchError(err => {
      this.errorMessage = err;
      return EMPTY;
    })
  );

  selectedUser$ = this.userService.selectedUser$.pipe(
    catchError(err => {
      this.errorMessage = err;
      return EMPTY;
    })
  );

  users$ = this.userService.users$.pipe(
    catchError(err => {
      this.errorMessage = err;
      return EMPTY;
    })
  );

  constructor(private userService: SingleUserService) { }

  onSelected(userId: number): void {
    this.userService.onSelected(userId);
  }
}
