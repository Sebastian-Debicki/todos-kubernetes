import { AxiosPromise } from 'axios';

import { restApiRoutes } from 'core';
import { HttpService } from './HttpService';
import { Todo, TodoBody } from '../models';

export class TodosService {
  constructor(private httpService: HttpService) {}

  getTodos(): AxiosPromise<Todo[]> {
    return this.httpService.GET(restApiRoutes.todos);
  }

  addTodo(todo: TodoBody): AxiosPromise<Todo> {
    return this.httpService.POST(restApiRoutes.todos, todo);
  }

  editTodo(todo: Todo): AxiosPromise<Todo> {
    return this.httpService.POST(`${restApiRoutes.todos}/${todo.id}`, todo);
  }

  deleteTodo(id: string): AxiosPromise<void> {
    return this.httpService.DELETE(`${restApiRoutes.todos}/${id}`);
  }
}
