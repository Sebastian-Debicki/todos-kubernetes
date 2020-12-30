import * as React from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import { Router } from './Router';
import { theme } from 'core';

function App() {
  return (
    <>
      <ThemeProvider theme={theme()}>
        <CssBaseline />
        <Router />
      </ThemeProvider>
    </>
  );
}

export default App;
