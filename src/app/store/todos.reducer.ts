import { Action } from '@ngrx/store';
import { Todo, TodoFilter } from '../todo.model';
import * as todosAction from './todos.actions';

export interface TodoState {
  datas: Todo[];
  loading: boolean;
  loaded: boolean;
  error: any;
  filter: TodoFilter;
}

export const initialState: TodoState = {
  datas: null,
  loading: false,
  loaded: false,
  error: null,
  filter: 'ALL'
};

export function todosReducer(
  state: TodoState = initialState,
  action: todosAction.TodosActionType
): TodoState {
  switch (action.type) {

    case todosAction.FETCH_TODO:
      return {
        ...state,
        loading: true
      };

    case todosAction.FETCH_TODO_SUCCESS:
      return {
        ...state,
        datas: action.payload,
        loading: false,
        loaded: true,
        error: null
      };

    case todosAction.FETCH_TODO_ERROR:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.payload
      };

    case todosAction.TODO_CREATE:
      return {
        ...state,
        datas: [...state.datas, action.payload]
      };

    case todosAction.TODO_DELETE:
      return {
        ...state,
        datas: state.datas.filter((t, i) => i !== action.payload)
      };

    case todosAction.TODO_TOGGLE:
      const selectedTodo = state.datas[action.payload];
      selectedTodo.done = !selectedTodo.done;
      const newTodos = [...state.datas];
      newTodos[action.payload] = selectedTodo;
      return {
        ...state,
        datas: newTodos
      };

    case todosAction.TODO_FILTER:
      return {
        ...state,
        filter: action.payload.filter
      };

    default:
      return state;
  }

}
