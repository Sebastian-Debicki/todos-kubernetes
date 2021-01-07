import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import { routes } from './core';
import { Auth } from 'pages/auth/containers/Auth';
import { Todos } from 'pages/todos/containers/Todos';

interface Props {
  isUserLoggedIn: boolean;
}

export const Router: React.FC<Props> = ({ isUserLoggedIn }) => {
  const basicRoutes = <Route path={routes.login} component={Auth} />;

  const protectedRoutes = <Route path={routes.todos} component={Todos} />;

  return (
    <BrowserRouter>
      <Redirect to={isUserLoggedIn ? routes.todos : routes.login} />
      <Switch>{isUserLoggedIn ? protectedRoutes : basicRoutes}</Switch>
    </BrowserRouter>
  );
};
