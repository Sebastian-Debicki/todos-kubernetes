import * as React from 'react';
import Cookies from 'js-cookie';

import { useRequest, Error } from 'common';
import { restApiRoutes, routes } from 'core';
import { useHistory } from 'react-router-dom';
import {
  Button,
  CardHeader,
  Container,
  Grid,
  TextField,
} from '@material-ui/core';

interface Props {
  onLoginSucceed: () => void;
}

export const Auth: React.FC<Props> = ({ onLoginSucceed }) => {
  const [isLoginForm, setIsLoginForm] = React.useState(true);
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const history = useHistory();

  const { doRequest, errors } = useRequest({
    method: 'post',
    url: isLoginForm ? restApiRoutes.signin : restApiRoutes.signup,
    body: {
      email,
      password,
    },
    onSuccess: () => {
      onLoginSucceed();
      history.push(routes.todos);
    },
  });

  const onSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    await doRequest()
      .then((res) => Cookies.set('token', res.token))
      .catch((err) => console.log(err));
  };

  return (
    <Grid
      style={{ height: '100vh' }}
      container
      direction="column"
      justify="center"
      alignItems="center"
    >
      <CardHeader title={isLoginForm ? 'Login' : 'Register'} />

      <Grid spacing={10} justify="center" alignItems="center">
        <form onSubmit={onSubmitForm} noValidate autoComplete="off">
          <TextField
            fullWidth
            id="outlined-basic"
            label="Email"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="text"
          />

          <TextField
            fullWidth
            id="outlined-basic"
            label="Password"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
          />

          <Button variant="outlined" color="secondary" fullWidth>
            {isLoginForm ? 'Login' : 'Register'}
          </Button>
        </form>

        <Button
          fullWidth
          variant="outlined"
          color="primary"
          onClick={() => setIsLoginForm(!isLoginForm)}
        >{`Switch to ${isLoginForm ? 'Registration' : 'Login'} form`}</Button>

        {errors && <Error errors={errors} />}
      </Grid>
    </Grid>
  );
};
