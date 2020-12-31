import { createMuiTheme } from '@material-ui/core/styles';
import { blueGrey } from '@material-ui/core/colors';

export const theme = () =>
  createMuiTheme({
    palette: {
      type: 'dark',
      primary: {
        main: blueGrey[500],
      },
    },
  });
