import { createMuiTheme } from '@material-ui/core/styles';

export const theme = (isDarkTheme: boolean) =>
  createMuiTheme({
    palette: {
      type: isDarkTheme ? 'dark' : 'light',
      primary: {
        main: '#604554',
      },
      secondary: {
        main: '#51705f',
      },
    },
  });
