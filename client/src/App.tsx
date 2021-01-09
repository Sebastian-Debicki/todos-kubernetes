import * as React from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import { Router } from './Router';
import { theme } from 'core';
import { Credentials, Navbar, useAuthReducer } from 'common';

const App: React.FC = () => {
  const [isDarkTheme, setIsDarkTheme] = React.useState(true);
  const { state, asyncActions } = useAuthReducer();

  React.useEffect(() => {
    asyncActions.getCurrentUser();
  }, []);

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
          onLogout={() => asyncActions.logout()}
        />
        <Router
          isUserLoggedIn={state.isUserLoggedIn}
          onLogin={(credentials: Credentials, isLoginForm: boolean) =>
            asyncActions.auth(credentials, isLoginForm)
          }
        />
        {/* <Error error={error} onClose={cleanError} /> */}
      </ThemeProvider>
    </>
  );
};

export default App;
