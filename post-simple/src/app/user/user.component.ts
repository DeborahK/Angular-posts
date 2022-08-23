import { Component } from '@angular/core';
import { catchError, combineLatest, EMPTY, map } from 'rxjs';
import { UserService } from './user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {
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

  usersWithTodos$ = this.userService.usersWithTodos$.pipe(
    catchError(err => {
      this.errorMessage = err;
      return EMPTY;
    })
  )

  vm$ = combineLatest([
    this.selectedUser$,
    this.todos$
  ]).pipe(
    map(([user, todos]) => ({ user, todos }))
  );

  constructor(private userService: UserService) { }

  onSelected(userId: number): void {
    this.userService.onSelected(userId);
  }
}
