import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';

import { Observable } from 'rxjs';

@Injectable()
export class ToDoRequestInterceptor implements HttpInterceptor {
  userUrl = 'https://jsonplaceholder.typicode.com/users';

  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {

    let newRequest = req;

    // Only change the request if it is for the user todos
    if (req.url.includes('todos')) {

      // Build the endpoint URL
      const endpointURL = this.buildEndPoint(newRequest.url);

      // Create a new request
      newRequest = req.clone({
        url: endpointURL
      });

      console.log('Endpoint URL', endpointURL);
    }
    return next.handle(newRequest);
  }

  // Randomly cause an error
  private buildEndPoint(url: string): string {
    let endPoint = url;
    // 30% of the time, generate an error
    if (Math.random() < 0.3) {
      // Generate a 404 error
      endPoint = `https://jsonplaceholder.typicode.com/abc`;
    }
    return endPoint;
  }
}