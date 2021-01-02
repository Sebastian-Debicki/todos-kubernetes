import { createMuiTheme } from '@material-ui/core/styles';
import { blueGrey, grey } from '@material-ui/core/colors';

export const theme = (isDarkTheme: boolean) =>
  createMuiTheme({
    palette: {
      type: isDarkTheme ? 'dark' : 'light',
      primary: {
        main: blueGrey[500],
      },
      secondary: {
        main: grey[800],
      },
    },
  });
