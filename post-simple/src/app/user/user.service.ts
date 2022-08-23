import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, combineLatest, forkJoin, map, mergeMap, Observable, of, Subject, switchMap, tap, throwError, zip } from "rxjs";

@Injectable({ providedIn: 'root' })
export class UserService {
  todoUrl = 'https://jsonplaceholder.typicode.com/todos';
  userUrl = 'https://jsonplaceholder.typicode.com/users';

  // Action stream
  private userSelectedSubject = new Subject<number>();
  userSelectedAction$ = this.userSelectedSubject.asObservable();

  // All Users
  users$ = this.http.get<User[]>(this.userUrl).pipe(
    // tap(data => console.log(JSON.stringify(data))),
    catchError(this.handleError)
  );

  // All Users with their todos in one data structure
  usersWithTodos$ = this.http.get<User[]>(this.userUrl).pipe(
    mergeMap(users => forkJoin(users.map(user =>
      this.http.get<ToDo[]>(`${this.todoUrl}?userId=${user.id}`)
        .pipe(
          map(todos => ({
            user,
            todos
          } as UserData))
        ))
    )),
    // tap(data => console.log(JSON.stringify(data)))
  );

  // Selected user
  selectedUser$ = this.userSelectedAction$.pipe(
    switchMap(userId =>
      this.http.get<User>(`${this.userUrl}/${userId}`).pipe(
        // tap(data => console.log(JSON.stringify(data))),
        catchError(this.handleError)
      ))
  );

  // Todos for selected user
  todos$ = this.userSelectedAction$.pipe(
    switchMap((userId) =>
      this.http.get<ToDo[]>(`${this.todoUrl}?userId=${userId}`).pipe(
        // tap((todos) =>
        //   console.log("User's Todos:", JSON.stringify(todos))
        // ),
        catchError(this.handleError)
      ))
  );

  constructor(private http: HttpClient) {
    const a$ = of(1, 2, 3, 4);
    const b$ = of('a', 'b', 'c');

    // forkJoin example
    const c$ = forkJoin([a$, b$]).subscribe(console.log);

    // combineLatest example
    const d$ = combineLatest([a$, b$]).subscribe(console.log);

    // zip example
    const z$ = zip(a$, b$).subscribe(console.log);
  }

  onSelected(userId: number): void {
    this.userSelectedSubject.next(userId);
  }

  private handleError(err: HttpErrorResponse): Observable<never> {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Backend returned code ${err.status}: ${err.message}`;
    }
    console.error(err);
    return throwError(() => errorMessage);
  }

}

export interface ToDo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  website: string;
}

export interface UserData {
  user: User;
  todos: ToDo[];
}
