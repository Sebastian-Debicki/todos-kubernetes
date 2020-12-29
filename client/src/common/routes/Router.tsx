import React, { useEffect, useState } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Cookies from 'js-cookie';
import jwt_decode from 'jwt-decode';

import { Auth } from 'pages/auth/containers/Auth';
import { Todos } from 'pages/todos/containers/Todos';

export enum Routes {
  Login = '/auth',
  Todos = '/',
}

export const Router = () => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  useEffect(() => {
    const token = Cookies.get('token');

    const user = token && jwt_decode(token);

    setIsUserLoggedIn(user ? true : false);
  }, []);

  const routes = (
    <Route path={Routes.Login}>
      {() => <Auth onLoginSucceed={() => setIsUserLoggedIn(true)} />}
    </Route>
  );

  const protectedRoutes = <Route path={Routes.Todos} component={Todos} />;

  return (
    <BrowserRouter>
      <Redirect to={isUserLoggedIn ? Routes.Todos : Routes.Login} />
      <Switch>{isUserLoggedIn ? protectedRoutes : routes}</Switch>
    </BrowserRouter>
  );
};
