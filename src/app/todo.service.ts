import { Injectable } from '@angular/core';
import { Todo } from './todo.model';
import { Observable, timer } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class TodoService {

  constructor() {}

  public getTodos(): Observable<Todo[]> {
    return timer(500).pipe(
      map( () => [
        {
          id: '1',
          message: 'work',
          done: false
        },
        {
          id: '2',
          message: 'movie',
          done: false
        }
      ])
    );
  }

}
