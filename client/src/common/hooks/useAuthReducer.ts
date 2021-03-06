import { useReducer } from 'react';

import { Credentials, ErrorResponse } from '../models';
import { authService } from '../services';
import { handleError } from '../helpers';

enum ActionTypes {
  USER_AUTH = 'USER_AUTH',
  USER_AUTH_ERRORED = 'USER_AUTH_ERRORED',
  GET_CURRENT_USER = 'GET_CURRENT_USER',
  GET_CURRENT_USER_ERRORED = 'GET_CURRENT_USER_ERRORED',
  LOGOUT = 'LOGOUT',
  LOGOUT_ERRORED = 'LOGOUT_ERRORED',
  CLEAN_ERROR = 'CLEAN_ERROR',
}

type Action =
  | { type: ActionTypes.USER_AUTH }
  | { type: ActionTypes.USER_AUTH_ERRORED; payload: { error: string } }
  | { type: ActionTypes.GET_CURRENT_USER }
  | { type: ActionTypes.GET_CURRENT_USER_ERRORED; payload: { error: string } }
  | { type: ActionTypes.LOGOUT }
  | { type: ActionTypes.LOGOUT_ERRORED; payload: { error: string } }
  | { type: ActionTypes.CLEAN_ERROR };

interface State {
  isUserLoggedIn: boolean;
  error?: string;
}

export const useAuthReducer = () => {
  const initialState: State = {
    isUserLoggedIn: false,
  };

  const reducer = (state: State, action: Action) => {
    switch (action.type) {
      case ActionTypes.USER_AUTH:
        return { ...state, isUserLoggedIn: true };
      case ActionTypes.USER_AUTH_ERRORED:
        return { ...state, error: action.payload.error };
      case ActionTypes.GET_CURRENT_USER:
        return { ...state, isUserLoggedIn: true };
      case ActionTypes.GET_CURRENT_USER_ERRORED:
        return { ...state, error: action.payload.error };
      case ActionTypes.LOGOUT:
        return { ...state, isUserLoggedIn: false };
      case ActionTypes.LOGOUT_ERRORED:
        return { ...state, error: action.payload.error };
      case ActionTypes.CLEAN_ERROR:
        return { ...state, error: undefined };
      default:
        throw new Error();
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const auth = (credentials: Credentials, isLoginForm: boolean) => {
    const { email, password } = credentials;
    return authService
      .login({ email, password }, isLoginForm)
      .then(() => dispatch({ type: ActionTypes.USER_AUTH }))
      .catch((err: ErrorResponse) => {
        dispatch({
          type: ActionTypes.USER_AUTH_ERRORED,
          payload: { error: handleError(err) },
        });
      });
  };

  const getCurrentUser = () => {
    authService
      .getCurrentUser()
      .then(
        ({ data }) =>
          data.currentUser && dispatch({ type: ActionTypes.GET_CURRENT_USER })
      )
      .catch((err: ErrorResponse) =>
        dispatch({
          type: ActionTypes.GET_CURRENT_USER_ERRORED,
          payload: { error: handleError(err) },
        })
      );
  };

  const logout = () => {
    authService
      .logout()
      .then(() => dispatch({ type: ActionTypes.LOGOUT }))
      .catch((err: ErrorResponse) =>
        dispatch({
          type: ActionTypes.LOGOUT_ERRORED,
          payload: { error: handleError(err) },
        })
      );
  };

  const cleanError = () => {
    dispatch({ type: ActionTypes.CLEAN_ERROR });
  };

  return { state, cleanError, asyncActions: { auth, getCurrentUser, logout } };
};
