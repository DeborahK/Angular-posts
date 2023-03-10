import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, of, Subject, switchMap, tap } from "rxjs";
import { ToDo, User } from "../user";

@Injectable({ providedIn: 'root' })
export class SingleUserService {
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

  // Try 1: Catch and rethrow
  // If an error occurs, the Observable is terminated
  // Can no longer display another user
  todos1$ = this.userSelectedAction$.pipe(
    switchMap((userId) =>
      this.http.get<ToDo[]>(`${this.userUrl}/${userId}/todos`).pipe(
        catchError(User.handleError)
      ))
  );

  // Try 2: Catch and continue
  // If an error occurs, return an empty array of todos
  // Observable continues
  // Message no longer appears in the UI
  todos$ = this.userSelectedAction$.pipe(
    switchMap((userId) =>
      this.http.get<ToDo[]>(`${this.userUrl}/${userId}/todos`).pipe(
        // Return an empty array if an error occurs
        catchError(err => of([]))
      ))
  );

  constructor(private http: HttpClient) { }

  onSelected(userId: number): void {
    this.userSelectedSubject.next(userId);
  }

}
