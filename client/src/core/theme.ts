import { createMuiTheme } from '@material-ui/core/styles';
import { blueGrey, green, grey, purple } from '@material-ui/core/colors';

export const theme = (isDarkTheme: boolean) =>
  createMuiTheme({
    palette: {
      type: isDarkTheme ? 'dark' : 'light',
      primary: {
        main: purple[500],
      },
      secondary: {
        main: green['A700'],
      },
    },
  });
