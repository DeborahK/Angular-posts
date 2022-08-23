import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { User } from './user';

// OR the functionality can be in its own User Service
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private usersUrl = 'api/users';

  getUserId(userName: string): Observable<number> {
    // Get the users that match the defined user name.
    // (There should only be one)
    // Use regex ^ and $ to find exact matches.
    // If there are no matches, return an id of 0
    return this.http.get<User[]>(`${this.usersUrl}?userName=^${userName}$`).pipe(
      catchError(this.handleError),
      map(users => (users.length === 0) ? 0 : users[0].id)
    );
  }

  constructor(private http: HttpClient) { }

  private handleError(err: any): Observable<never> {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;
    }
    console.error(err);
    return throwError(errorMessage);
  }
}
