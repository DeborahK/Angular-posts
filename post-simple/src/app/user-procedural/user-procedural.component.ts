import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ToDo, User, UserProceduralService } from './user-procedural.service';
import { tap, switchMap } from "rxjs";

@Component({
  selector: 'app-user-procedural',
  templateUrl: './user-procedural.component.html',
  styleUrls: ['./user-procedural.component.css']
})
export class UserProceduralComponent implements OnInit {
  errorMessage = '';
  users: User[] = [];
  selectedUser?: User;
  todos: ToDo[] = [];

  constructor(private userService: UserProceduralService, private http: HttpClient) { }

  ngOnInit(): void {
    this.userService.getUsers().subscribe(
      users => this.users = users
    )
  }

  // Nested subscribes 🚫
  onSelectedx(userId: number): void {
    this.http.get<User>(`${this.userService.userUrl}/${userId}`).pipe(
      tap(user => this.selectedUser = user),
      tap(user => this.http.get<ToDo[]>(`${this.userService.todoUrl}?userId=${user.id}`).pipe(
        tap(todos => this.todos = todos)
      ).subscribe(data => console.log('todos:', data))
      ),
    ).subscribe(data => console.log('user:', data));
  }

  // Higher order mapping operator ➕
  onSelected(userId: number): void {
    this.http.get<User>(`${this.userService.userUrl}/${userId}`).pipe(
      tap(user => this.selectedUser = user),
      switchMap(user =>
        this.http.get<ToDo[]>(`${this.userService.todoUrl}?userId=${user.id}`).pipe(
          tap(todos => this.todos = todos)
        ))
    ).subscribe();
  }

}
