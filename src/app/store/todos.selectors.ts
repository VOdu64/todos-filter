import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TodoState } from './todos.reducer';
import * as routerReducer from '@ngrx/router-store';
import { MyRouterState } from './router.helper';

export const todosSelector = createFeatureSelector<TodoState>('todos');
export const routerSelector = createFeatureSelector<routerReducer.RouterReducerState<MyRouterState>>('router');

export const todoListSelector = createSelector(
  todosSelector,
  (todosState: TodoState) => {
    return todosState;
  }
);

export const myRouterStateSelector = createSelector(
  routerSelector,
  (routerState) => {
    return routerState.state;
  }
);

export const selectedTodoSelector = createSelector(
  todoListSelector,
  myRouterStateSelector,
  (todosState: TodoState, myRouterState: MyRouterState) => {
    const todoId = myRouterState.params.id;
    if (todoId && todosState.datas) {
      return todosState.datas.filter(t => t.id === todoId)[0];
    } else {
      return null;
    }
  }
);
