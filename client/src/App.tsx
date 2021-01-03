import * as React from 'react';
import Cookies from 'js-cookie';
import jwt_decode from 'jwt-decode';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import { Router } from './Router';
import { theme } from 'core';
import { Navbar } from 'common';

function App() {
  const [isUserLoggedIn, setIsUserLoggedIn] = React.useState(false);
  const [isDarkTheme, setIsDarkTheme] = React.useState(true);

  React.useEffect(() => {
    const token = Cookies.get('token');

    const user = token && jwt_decode(token);

    setIsUserLoggedIn(user ? true : false);
  }, []);

  const onChangeTheme = (theme: boolean) => {
    setIsDarkTheme(theme);
  };

  return (
    <>
      <ThemeProvider theme={theme(isDarkTheme)}>
        <CssBaseline />
        <Navbar onChangeTheme={onChangeTheme} isDarkTheme={isDarkTheme} />
        <Router
          onLoginSucceed={() => setIsUserLoggedIn(true)}
          isUserLoggedIn={isUserLoggedIn}
        />
      </ThemeProvider>
    </>
  );
}

export default App;
