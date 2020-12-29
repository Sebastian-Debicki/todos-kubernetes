import * as React from 'react';
import Cookies from 'js-cookie';

import { useRequest, Error, Routes } from 'common';
import { restApiRoutes } from 'core';
import { useHistory } from 'react-router-dom';

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
      history.push(Routes.Todos);
    },
  });

  const onSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    await doRequest()
      .then((res) => Cookies.set('token', res.token))
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <header>
        <h2>{isLoginForm ? 'Login' : 'Register'}</h2>
      </header>
      <form onSubmit={onSubmitForm}>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="text"
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
        />
        <button>{isLoginForm ? 'Login' : 'Register'}</button>
      </form>
      <button onClick={() => setIsLoginForm(!isLoginForm)}>
        {`Switch to ${isLoginForm ? 'Registration' : 'Login'} form`}
      </button>

      {errors && <Error errors={errors} />}
    </div>
  );
};
