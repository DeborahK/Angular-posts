import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, of, Subject, switchMap } from 'rxjs';
import { ToDo, ToDoData, User } from '../user';

@Injectable({
  providedIn: 'root'
})
export class SingleUserWithMessageService {
  userUrl = User.userUrl;
  userUrlErr = User.userUrlErr;

  // Action stream
  private userSelectedSubject = new Subject<number>();
  userSelectedAction$ = this.userSelectedSubject.asObservable();

  // All Users
  users$ = this.http.get<User[]>(this.userUrl).pipe(
    catchError(User.handleError)
  );

  // Selected user
  selectedUser$ = this.userSelectedAction$.pipe(
    switchMap(userId =>
      this.http.get<User>(`${this.userUrl}/${userId}`).pipe(
        catchError(User.handleError)
      ))
  );

  // Todos for selected user (action stream)

  // Catch and continue with message
  // If an error occurs, return an empty array of todos
  // Add a wrapper for a message to the UI
  todosWithMessage$ = this.userSelectedAction$.pipe(
    switchMap((userId) =>
      this.http.get<ToDo[]>(`${this.userUrl}/${userId}/todos`).pipe(
        map(todos => ({
          todos,
          message: ''
        } as ToDoData)),
        catchError(err => of({
          todos: [],
          message: `Error retrieving todos for user`
        } as ToDoData))
      ))
  );

  constructor(private http: HttpClient) { }

  onSelected(userId: number): void {
    this.userSelectedSubject.next(userId);
  }
}
