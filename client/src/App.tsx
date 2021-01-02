import * as React from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import { Router } from './Router';
import { theme } from 'core';
import { Navbar } from 'common';

function App() {
  const [isDarkTheme, setIsDarkTheme] = React.useState(true);

  const onChangeTheme = (theme: boolean) => {
    setIsDarkTheme(theme);
  };

  return (
    <>
      <ThemeProvider theme={theme(isDarkTheme)}>
        <CssBaseline />
        <Navbar onChangeTheme={onChangeTheme} isDarkTheme={isDarkTheme} />
        <Router />
      </ThemeProvider>
    </>
  );
}

export default App;
