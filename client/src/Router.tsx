import React, { useEffect, useState } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Cookies from 'js-cookie';
import jwt_decode from 'jwt-decode';

import { routes } from './core';
import { Auth } from 'pages/auth/containers/Auth';
import { Todos } from 'pages/todos/containers/Todos';

export const Router = () => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  useEffect(() => {
    const token = Cookies.get('token');

    const user = token && jwt_decode(token);

    setIsUserLoggedIn(user ? true : false);
  }, []);

  const basicRoutes = (
    <Route path={routes.login}>
      {() => <Auth onLoginSucceed={() => setIsUserLoggedIn(true)} />}
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
