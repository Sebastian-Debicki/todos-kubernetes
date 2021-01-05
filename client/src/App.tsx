import * as React from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import { Router } from './Router';
import { theme } from 'core';
import { Navbar, authService } from 'common';

function App() {
  const [isUserLoggedIn, setIsUserLoggedIn] = React.useState(false);
  const [isDarkTheme, setIsDarkTheme] = React.useState(true);

  React.useEffect(() => {
    authService
      .getCurrentUser()
      .then(({ data }) => setIsUserLoggedIn(data.currentUser ? true : false));
  }, []);

  const onLogout = async () => {
    await authService.logout().then(() => setIsUserLoggedIn(false));
  };

  const onChangeTheme = (theme: boolean) => {
    setIsDarkTheme(theme);
  };

  return (
    <>
      <ThemeProvider theme={theme(isDarkTheme)}>
        <CssBaseline />
        <Navbar
          onChangeTheme={onChangeTheme}
          isDarkTheme={isDarkTheme}
          onLogout={() => onLogout()}
        />
        <Router
          isUserLoggedIn={isUserLoggedIn}
          onLoginSucceed={() => setIsUserLoggedIn(true)}
        />
        {/* <Error error={error} onClose={cleanError} /> */}
      </ThemeProvider>
    </>
  );
}

export default App;
