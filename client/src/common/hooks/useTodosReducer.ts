import { useReducer } from 'react';

import { todosService } from '../services';
import { Todo, TodoBody } from '../models';

enum ActionTypes {
  GET_TODO = 'GET_TODO',
  GET_TODO_ERRORED = 'GET_TODO_ERRORED',
  ADD_TODO = 'ADD_TODO',
  ADD_TODO_ERRORED = 'ADD_TODO_ERRORED',
  DELETE_TODO = 'DELETE_TODO',
  DELETE_TODO_ERRORED = 'DELETE_TODO_ERRORED',
  EDIT_TODO = 'EDIT_TODO',
  EDIT_TODO_ERRORED = 'EDIT_TODO_ERRORED',
}

type Action =
  | { type: ActionTypes.GET_TODO; payload: { todos: Todo[] } }
  | { type: ActionTypes.GET_TODO_ERRORED; payload: { error: string } }
  | { type: ActionTypes.ADD_TODO; payload: { todo: Todo } }
  | { type: ActionTypes.ADD_TODO_ERRORED; payload: { error: string } }
  | { type: ActionTypes.DELETE_TODO; payload: { id: string } }
  | { type: ActionTypes.DELETE_TODO_ERRORED; payload: { error: string } }
  | { type: ActionTypes.EDIT_TODO; payload: { todo: Todo } }
  | { type: ActionTypes.EDIT_TODO_ERRORED; payload: { error: string } };

interface State {
  todos: Todo[];
  error?: any;
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
      .catch((err) =>
        dispatch({
          type: ActionTypes.GET_TODO_ERRORED,
          payload: { error: err },
        })
      );
  };

  const addTodo = async (todo: TodoBody) => {
    await todosService
      .addTodo(todo)
      .then(({ data }) => {
        dispatch({ type: ActionTypes.ADD_TODO, payload: { todo: data } });
      })
      .catch((err) => {
        dispatch({
          type: ActionTypes.ADD_TODO_ERRORED,
          payload: { error: err.errors },
        });
      });
  };

  const deleteTodo = async (id: string) => {
    await todosService
      .deleteTodo(id)
      .then(() => {
        dispatch({ type: ActionTypes.DELETE_TODO, payload: { id } });
      })
      .catch((err) =>
        dispatch({
          type: ActionTypes.DELETE_TODO_ERRORED,
          payload: { error: err },
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
      .catch((err) =>
        dispatch({
          type: ActionTypes.ADD_TODO_ERRORED,
          payload: { error: err },
        })
      );
  };

  return { state, asyncActions: { getTodos, addTodo, deleteTodo, editTodo } };
};
