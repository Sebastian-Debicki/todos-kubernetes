import { useReducer } from 'react';

import { todosService } from '../services';
import { Todo, TodoBody } from '../models';

enum ActionTypes {
  GET_TODO = 'GET_TODO',
  ADD_TODO = 'ADD_TODO',
  DELETE_TODO = 'DELETE_TODO',
  EDIT_TODO = 'EDIT_TODO',
}

type Action =
  | { type: ActionTypes.GET_TODO; payload: Todo[] }
  | { type: ActionTypes.ADD_TODO; payload: Todo }
  | { type: ActionTypes.DELETE_TODO; payload: string }
  | { type: ActionTypes.EDIT_TODO; payload: { todo: Todo } };

interface State {
  todos: Todo[];
}

export const useTodosReducer = () => {
  const initialState: State = {
    todos: [],
  };

  const reducer = (state: State, action: Action) => {
    switch (action.type) {
      case ActionTypes.GET_TODO:
        return { todos: action.payload };
      case ActionTypes.ADD_TODO:
        return {
          todos: [...state.todos, action.payload],
        };
      case ActionTypes.DELETE_TODO:
        return {
          todos: state.todos.filter((todo) => todo.id !== action.payload),
        };
      case ActionTypes.EDIT_TODO:
        return {
          todos: state.todos.map((todo) =>
            todo.id === action.payload.todo.id
              ? (todo = action.payload.todo)
              : todo
          ),
        };
      default:
        throw new Error();
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const getTodos = async () => {
    await todosService
      .getTodos()
      .then(({ data }) =>
        dispatch({ type: ActionTypes.GET_TODO, payload: data })
      );
  };

  const addTodo = async (todo: TodoBody) => {
    await todosService.addTodo(todo).then(({ data: todo }) => {
      dispatch({ type: ActionTypes.ADD_TODO, payload: todo });
    });
  };

  const deleteTodo = async (id: string) => {
    await todosService.deleteTodo(id).then(() => {
      dispatch({ type: ActionTypes.DELETE_TODO, payload: id });
    });
  };

  const editTodo = async (todo: Todo) => {
    await todosService.editTodo(todo).then(({ data }) => {
      dispatch({
        type: ActionTypes.EDIT_TODO,
        payload: { todo: data },
      });
    });
  };

  return { state, getTodos, addTodo, deleteTodo, editTodo };
};
