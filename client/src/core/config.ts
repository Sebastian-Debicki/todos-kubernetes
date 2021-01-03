export const baseUrl = '/api';

export const restApiRoutes = {
  signup: `${baseUrl}/users/signup`,
  signin: `${baseUrl}/users/signin`,
  currentUser: `${baseUrl}/users/currentuser`,
  todos: `${baseUrl}/todos`,
};

export const routes = {
  login: '/auth',
  todos: '/',
};
