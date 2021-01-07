import * as React from 'react';

import { useAuthReducer } from 'common';
import { routes } from 'core';
import { useHistory } from 'react-router-dom';
import {
  Avatar,
  Button,
  Container,
  TextField,
  Typography,
  makeStyles,
  Box,
} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

export const Auth: React.FC = () => {
  const [isLoginForm, setIsLoginForm] = React.useState(true);
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const history = useHistory();

  const { asyncActions } = useAuthReducer();

  const classes = useStyles();

  const onSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    asyncActions.auth({ email, password }, isLoginForm);
    history.push(routes.todos);
  };

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {isLoginForm ? 'Login' : 'Register'}
        </Typography>

        <form
          className={classes.form}
          onSubmit={onSubmitForm}
          autoComplete="off"
        >
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />

          <Button
            variant="contained"
            color="primary"
            fullWidth
            type="submit"
            className={classes.submit}
          >
            {isLoginForm ? 'Login' : 'Register'}
          </Button>
        </form>
      </div>

      <Button
        fullWidth
        variant="outlined"
        color="default"
        onClick={() => setIsLoginForm(!isLoginForm)}
      >{`Switch to ${isLoginForm ? 'Registration' : 'Login'} form`}</Button>

      <Box mt={8}>
        <Typography variant="body2" color="textSecondary" align="center">
          {'Copyright © '}
          Todos Sebastian Dębicki {new Date().getFullYear()}
        </Typography>
      </Box>

      {/* <Error error={error} onClose={cleanError} /> */}
    </Container>
  );
};

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));
