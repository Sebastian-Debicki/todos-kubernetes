import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import { routes } from 'core';
import { Credentials } from 'common';
import { Auth } from 'pages/auth/containers/Auth';
import { Todos } from 'pages/todos/containers/Todos';

interface Props {
  isUserLoggedIn: boolean;
  onLogin: (credentials: Credentials, isLoginForm: boolean) => void;
}

export const Router: React.FC<Props> = ({ isUserLoggedIn, onLogin }) => {
  const basicRoutes = (
    <Route path={routes.auth}>{() => <Auth onLogin={onLogin} />}</Route>
  );

  const protectedRoutes = <Route path={routes.todos} component={Todos} />;

  return (
    <BrowserRouter>
      <Redirect to={isUserLoggedIn ? routes.todos : routes.auth} />
      <Switch>{isUserLoggedIn ? protectedRoutes : basicRoutes}</Switch>
    </BrowserRouter>
  );
};
