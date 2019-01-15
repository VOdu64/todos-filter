import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { Todo, TodoFilter } from '../../todo.model';
import { Store, select } from '@ngrx/store';
import { State } from '../../store';
import * as todosAction from '../../store/todos.actions';
import { TodoState } from '../../store/todos.reducer';
import { takeUntil } from 'rxjs/operators';
import { todoListSelector, selectedTodoSelector } from '../../store/todos.selectors';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})

export class TodoListComponent implements OnInit, OnDestroy {
  private unsubscribe$: Subject<void> = new Subject<void>();
  //  public todos$: Observable<Todo[]> = this.store.pipe(select(todoListSelector));
  public selectedTodo$: Observable<Todo> = this.store.pipe(select(selectedTodoSelector));
  public todos: TodoState;
  public message: string;

  constructor(private store: Store<State>) { }

  ngOnInit(): void {
    this.store.dispatch(new todosAction.FetchTodo());
    this.store
      .pipe(
        select(todoListSelector),
        takeUntil(this.unsubscribe$)
      )
      .subscribe(todos => {
        this.todos = todos;
        this.store.dispatch(new todosAction.TodoPersist({ todos }));
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  get filteredTodos() {
    const filter = this.todos.filter;
    if (filter === 'ALL') {
      return this.todos.datas;
    } else {
      const predicate = filter === 'DONE' ? t => t.done : t => !t.done;
      return this.todos.datas.filter(predicate);
    }
  }

  public addTodo() {
    this.store.dispatch(new todosAction.CreateTodo({ message: this.message, done: false }));
  }

  public toggleTodo(index: number) {
    this.store.dispatch(new todosAction.ToggleTodo(index));
  }

  public deleteTodo(index: number) {
    this.store.dispatch(new todosAction.DeleteTodo(index));
  }

  public filterTodos(filter: TodoFilter) {
    this.store.dispatch(new todosAction.FilterTodo({ filter }));
  }

}
