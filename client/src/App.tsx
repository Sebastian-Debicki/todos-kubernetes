import * as React from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import { Router } from './Router';
import { theme } from 'core';
import { Navbar, useAuthReducer } from 'common';

function App() {
  const [isDarkTheme, setIsDarkTheme] = React.useState(true);
  const { state, asyncActions } = useAuthReducer();

  React.useEffect(() => {
    asyncActions.getCurrentUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onChangeTheme = (theme: boolean) => {
    setIsDarkTheme(theme);
  };

  console.log(state.isUserLoggedIn);

  return (
    <>
      <ThemeProvider theme={theme(isDarkTheme)}>
        <CssBaseline />
        <Navbar
          onChangeTheme={onChangeTheme}
          isDarkTheme={isDarkTheme}
          onLogout={() => asyncActions.logout()}
        />
        <Router isUserLoggedIn={state.isUserLoggedIn} />
        {/* <Error error={error} onClose={cleanError} /> */}
      </ThemeProvider>
    </>
  );
}

export default App;
