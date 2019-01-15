import { Action } from '@ngrx/store';
import { Todo, TodoFilter } from '../todo.model';
import { TodoState } from './todos.reducer';

export const TODO_CREATE = '[todo] create';
export const TODO_DELETE = '[todo] delete';
export const TODO_TOGGLE = '[todo] toggle';
export const FETCH_TODO = '[todo] fetch';
export const FETCH_TODO_SUCCESS = '[todo] fetch success';
export const FETCH_TODO_ERROR = '[todo] fetch error';
export const TODO_FILTER = '[todo] filter';
export const TODO_PERSIST = '[todo] persist';


export class CreateTodo implements Action {
  readonly type = '[todo] create';
  constructor(public payload: Todo) { }
}

export class DeleteTodo implements Action {
  readonly type = TODO_DELETE;
  constructor(public payload: number) { }
}

export class ToggleTodo implements Action {
  readonly type = TODO_TOGGLE;
  constructor(public payload: number) { }
}

export class FetchTodo implements Action {
  readonly type = FETCH_TODO;
}

export class FetchTodoSuccess implements Action {
  readonly type = FETCH_TODO_SUCCESS;
  constructor(public payload: Todo[]) { }
}

export class FetchTodoError implements Action {
  readonly type = FETCH_TODO_ERROR;
  constructor(public payload: any) { }
}

export class FilterTodo implements Action {
  readonly type = TODO_FILTER;
  constructor(public readonly payload: { filter: TodoFilter }) {}
}

export class TodoPersist implements Action {
  readonly type = TODO_PERSIST;
  constructor(readonly payload: { todos: TodoState }) {}
}

export type TodosActionType =
  | CreateTodo
  | DeleteTodo
  | ToggleTodo
  | FetchTodo
  | FetchTodoSuccess
  | FetchTodoError
  | FilterTodo
  | TodoPersist;

