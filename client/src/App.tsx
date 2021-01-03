import * as React from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import { Router } from './Router';
import { restApiRoutes, theme } from 'core';
import { Navbar, useRequest, Error, CurrentUser } from 'common';

function App() {
  const [isUserLoggedIn, setIsUserLoggedIn] = React.useState(false);
  const [isDarkTheme, setIsDarkTheme] = React.useState(true);

  const { doRequest, error, cleanError } = useRequest<{}, CurrentUser, void>({
    url: () => restApiRoutes.currentUser,
    method: 'get',
    body: {},
    onSuccess: ({ currentUser }) =>
      setIsUserLoggedIn(currentUser ? true : false),
  });

  React.useEffect(() => {
    doRequest();
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
        <Error error={error} onClose={cleanError} />
      </ThemeProvider>
    </>
  );
}

export default App;
