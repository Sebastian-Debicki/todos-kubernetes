import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import { Button } from '@material-ui/core';

interface Props {
  onChangeTheme: (isDarkTheme: boolean) => void;
  onLogout: () => void;
  isDarkTheme: boolean;
  isUserLoggedIn: boolean;
}

export const Navbar: React.FC<Props> = ({
  onChangeTheme,
  isDarkTheme,
  onLogout,
  isUserLoggedIn,
}) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Todos
          </Typography>
          <FormGroup>
            <FormControlLabel
              control={
                <Switch
                  color="secondary"
                  checked={isDarkTheme}
                  onChange={(e) => onChangeTheme(e.target.checked)}
                  aria-label="theme switch"
                />
              }
              label="Theme"
            />
          </FormGroup>
          {isUserLoggedIn && (
            <Button color="inherit" onClick={onLogout}>
              Logout
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));
