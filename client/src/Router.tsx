import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import { routes } from './core';
import { Auth } from 'pages/auth/containers/Auth';
import { Todos } from 'pages/todos/containers/Todos';

interface Props {
  isUserLoggedIn: boolean;
  onLoginSucceed: () => void;
}

export const Router: React.FC<Props> = ({ isUserLoggedIn, onLoginSucceed }) => {
  const basicRoutes = (
    <Route path={routes.login}>
      {() => <Auth onLoginSucceed={onLoginSucceed} />}
    </Route>
  );

  const protectedRoutes = <Route path={routes.todos} component={Todos} />;

  return (
    <BrowserRouter>
      <Redirect to={isUserLoggedIn ? routes.todos : routes.login} />
      <Switch>{isUserLoggedIn ? protectedRoutes : basicRoutes}</Switch>
    </BrowserRouter>
  );
};
