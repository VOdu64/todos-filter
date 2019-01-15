import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { TodoService } from './todo.service';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { TodosEffects } from './store/todos.effects';
import { MyRouterStateSerializer } from './store/router.helper';

import { reducers } from './store'; // par défaut va chercher le fichier index.ts
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule, RouterStateSerializer } from '@ngrx/router-store';

import { SharedModule } from './shared';

@NgModule({
  declarations: [
    AppComponent,
    TodoListComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule,
    RouterModule.forRoot([
      {
        path: '', redirectTo: 'todos', pathMatch: 'full'
      },
     {
        path: 'todos', component: TodoListComponent
      },
      {
        path: 'todos/:id', component: TodoListComponent
      }
    ]),
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([TodosEffects]),
    StoreRouterConnectingModule,
    StoreDevtoolsModule.instrument({
      name: 'to do'
    })
  ],
  providers: [
    TodoService,
    {
      provide: RouterStateSerializer,
      useClass: MyRouterStateSerializer
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
