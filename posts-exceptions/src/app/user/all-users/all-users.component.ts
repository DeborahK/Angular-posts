import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { catchError, EMPTY } from 'rxjs';
import { AllUsersService } from './all-users.service';

@Component({
  selector: 'app-all-users',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.css']
})
export class AllUsersComponent {
  errorMessage = '';

  usersWithTodos$ = this.userService.usersWithTodos$.pipe(
    catchError(err => {
      this.errorMessage = err;
      return EMPTY;
    })
  )

  constructor(private userService: AllUsersService) { }

}
