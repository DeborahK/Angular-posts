import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, delayWhen, forkJoin, map, mergeMap, of, retry, retryWhen, scan, Subject, tap, timer } from "rxjs";
import { ToDo, User, UserData } from "../user";

@Injectable({
  providedIn: 'root'
})
export class AllUsersService {
  userUrl = User.userUrl;
  userUrlErr = User.userUrlErr;

  // All Users with their todos in one data structure

  // Try 1: Catch and rethrow, outer pipe
  // If an error occurs, doesn't display any data
  usersWithTodos1$ = this.http.get<User[]>(this.userUrl).pipe(
    mergeMap(users => forkJoin(users.map(user =>
      this.http.get<ToDo[]>(`${this.userUrl}/${user.id}/todos`)
        .pipe(
          map(todos => ({
            user,
            todos
          } as UserData))))
    )),
    catchError(User.handleError)
  );

  // Try 2: Catch and rethrow, both pipes
  // If an error occurs, doesn't display any data
  usersWithTodos2$ = this.http.get<User[]>(this.userUrl).pipe(
    mergeMap(users => forkJoin(users.map(user =>
      this.http.get<ToDo[]>(`${this.userUrl}/${user.id}/todos`)
        .pipe(
          map(todos => ({
            user,
            todos
          } as UserData)),
          catchError(User.handleError)))
    )),
    catchError(User.handleError)
  );

  // Try 3: Catch and continue
  // If an error occurs, displays data for user with no todos
  // Will *not* recatch in the UI to display a message
  usersWithTodos3$ = this.http.get<User[]>(this.userUrl).pipe(
    mergeMap(users => forkJoin(users.map(user =>
      this.http.get<ToDo[]>(`${this.userUrl}/${user.id}/todos`)
        .pipe(
          map(todos => ({
            user,
            todos
          } as UserData)),
          catchError(err => of({
            user,
            todos: []
          } as UserData))))
    )));

  // Try 4: Catch and continue and return message to UI
  usersWithTodos$ = this.http.get<User[]>(this.userUrl).pipe(
    mergeMap(users => forkJoin(users.map(user =>
      this.http.get<ToDo[]>(`${this.userUrl}/${user.id}/todos`)
        .pipe(
          map(todos => ({
            user,
            todos
          } as UserData)),
          catchError(err => of({
            user,
            todos: [],
            message: `Error retrieving todos for user: ${user.name}`
          } as UserData))))
    )));

  // Try 5: Retry
  usersWithTodos5$ = this.http.get<User[]>(this.userUrl).pipe(
    mergeMap(users => forkJoin(users.map(user =>
      this.http.get<ToDo[]>(`${this.userUrl}/${user.id}/todos`)
        .pipe(
          map(todos => ({
            user,
            todos
          } as UserData)),
          retry(3),
          catchError(err => {
            return of({
              user,
              todos: [],
              message: `Error retrieving todos for user: ${user.name}`
            } as UserData);
          }
          )))
    )));

  // Try 6: RetryWhen
  usersWithTodos6$ = this.http.get<User[]>(this.userUrl).pipe(
    mergeMap(users => forkJoin(users.map(user =>
      this.http.get<ToDo[]>(`${this.userUrl}/${user.id}/todos`)
        .pipe(
          map(todos => ({
            user,
            todos
          } as UserData)),
          retryWhen(error =>
            error.pipe(
              scan((acc, error) => {
                if (acc > 3) {
                  throw error;
                }
                return acc + 1;
              }, 1),
              // Extend the delay between retries
              delayWhen(value => timer(value * 500)),
              tap(value => console.log("Retry: ", value))
            )
          ),
          catchError(err => {
            console.log("Caught error");
            return of({
              user,
              todos: [],
              message: `Error retrieving todos for user: ${user.name}`
            } as UserData);
          }
          )))
    )));

  constructor(private http: HttpClient) { }
}
