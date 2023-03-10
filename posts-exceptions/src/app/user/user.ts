import { HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError } from "rxjs";

// Utility user class
export class User {
  static todoUrl = 'https://jsonplaceholder.typicode.com/todos';
  static userUrl = 'https://jsonplaceholder.typicode.com/users';
  static userUrlErr = 'https://jsonplaceholder.typicode.com/users/abc';

  static handleError(err: HttpErrorResponse): Observable<never> {
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

export interface ToDoData {
  todos: ToDo[];
  message: string;
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
  message?: string;
}
