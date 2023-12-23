import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { Todo } from "./todo";

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  // Hard-coded for simplicity for the demo
  getTodosForUser(userId: number): Observable<Todo[]> {
    return of([
      {
        id: 1,
        title: 'Finish the talk',
        userId: 1
      },
      {
        id: 2,
        title: 'Call your Mom',
        userId: 1
      },
      {
        id: 3,
        title: 'Write a blog post',
        userId: 1
      },
    ]);
  }
}