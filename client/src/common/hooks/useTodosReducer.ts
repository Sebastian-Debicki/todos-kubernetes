import { useReducer } from 'react';

import { todosService } from '../services';
import { Todo, TodoBody, ErrorResponse } from '../models';
import { handleError } from '../helpers';

enum ActionTypes {
  GET_TODO = 'GET_TODO',
  GET_TODO_ERRORED = 'GET_TODO_ERRORED',
  ADD_TODO = 'ADD_TODO',
  ADD_TODO_ERRORED = 'ADD_TODO_ERRORED',
  DELETE_TODO = 'DELETE_TODO',
  DELETE_TODO_ERRORED = 'DELETE_TODO_ERRORED',
  EDIT_TODO = 'EDIT_TODO',
  EDIT_TODO_ERRORED = 'EDIT_TODO_ERRORED',
  CLEAN_ERROR = 'CLEAN_ERROR',
}

type Action =
  | { type: ActionTypes.GET_TODO; payload: { todos: Todo[] } }
  | { type: ActionTypes.GET_TODO_ERRORED; payload: { error: string } }
  | { type: ActionTypes.ADD_TODO; payload: { todo: Todo } }
  | { type: ActionTypes.ADD_TODO_ERRORED; payload: { error: string } }
  | { type: ActionTypes.DELETE_TODO; payload: { id: string } }
  | { type: ActionTypes.DELETE_TODO_ERRORED; payload: { error: string } }
  | { type: ActionTypes.EDIT_TODO; payload: { todo: Todo } }
  | { type: ActionTypes.EDIT_TODO_ERRORED; payload: { error: string } }
  | { type: ActionTypes.CLEAN_ERROR };

interface State {
  todos: Todo[];
  error?: string;
}

export const useTodosReducer = () => {
  const initialState: State = {
    todos: [],
  };

  const reducer = (state: State, action: Action) => {
    switch (action.type) {
      case ActionTypes.GET_TODO:
        return { ...state, todos: action.payload.todos };
      case ActionTypes.GET_TODO_ERRORED:
        return { ...state, error: action.payload.error };
      case ActionTypes.ADD_TODO:
        return {
          todos: [...state.todos, action.payload.todo],
        };
      case ActionTypes.ADD_TODO_ERRORED:
        return { ...state, error: action.payload.error };
      case ActionTypes.DELETE_TODO:
        return {
          todos: state.todos.filter((todo) => todo.id !== action.payload.id),
        };
      case ActionTypes.EDIT_TODO:
        return {
          todos: state.todos.map((todo) =>
            todo.id === action.payload.todo.id
              ? (todo = action.payload.todo)
              : todo
          ),
        };
      case ActionTypes.CLEAN_ERROR:
        return { ...state, error: undefined };
      default:
        throw new Error();
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const getTodos = async () => {
    await todosService
      .getTodos()
      .then(({ data }) =>
        dispatch({ type: ActionTypes.GET_TODO, payload: { todos: data } })
      )
      .catch((err: ErrorResponse) =>
        dispatch({
          type: ActionTypes.GET_TODO_ERRORED,
          payload: { error: handleError(err) },
        })
      );
  };

  const addTodo = async (todo: TodoBody) => {
    await todosService
      .addTodo(todo)
      .then(({ data }) => {
        dispatch({ type: ActionTypes.ADD_TODO, payload: { todo: data } });
      })
      .catch((err: ErrorResponse) => {
        dispatch({
          type: ActionTypes.ADD_TODO_ERRORED,
          payload: { error: handleError(err) },
        });
      });
  };

  const deleteTodo = async (id: string) => {
    await todosService
      .deleteTodo(id)
      .then(() => {
        dispatch({ type: ActionTypes.DELETE_TODO, payload: { id } });
      })
      .catch((err: ErrorResponse) =>
        dispatch({
          type: ActionTypes.DELETE_TODO_ERRORED,
          payload: { error: handleError(err) },
        })
      );
  };

  const editTodo = async (todo: Todo) => {
    await todosService
      .editTodo(todo)
      .then(({ data }) => {
        dispatch({
          type: ActionTypes.EDIT_TODO,
          payload: { todo: data },
        });
      })
      .catch((err: ErrorResponse) =>
        dispatch({
          type: ActionTypes.ADD_TODO_ERRORED,
          payload: { error: handleError(err) },
        })
      );
  };

  const cleanError = () => {
    dispatch({ type: ActionTypes.CLEAN_ERROR });
  };

  return {
    state,
    cleanError,
    asyncActions: { getTodos, addTodo, deleteTodo, editTodo },
  };
};
