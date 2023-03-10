import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { catchError, EMPTY, tap } from 'rxjs';
import { SingleUserWithMessageService } from './single-user-with-message.service';

@Component({
  selector: 'app-single-user-with-message',
  templateUrl: './single-user-with-message.component.html',
  standalone: true,
  imports: [CommonModule],
  styleUrls: ['./single-user-with-message.component.css']
})
export class SingleUserWithMessageComponent {
  errorMessage = '';

  selectedUser$ = this.userService.selectedUser$.pipe(
    catchError(err => {
      this.errorMessage = err;
      return EMPTY;
    })
  );

  todosWithMessage$ = this.userService.todosWithMessage$.pipe(
    // Assign the message to the errorMessage property
    tap(todoData => this.errorMessage = todoData.message),
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

  constructor(private userService: SingleUserWithMessageService) { }

  onSelected(userId: number): void {
    this.userService.onSelected(userId);
  }

}
