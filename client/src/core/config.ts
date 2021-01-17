export const baseUrl = '/api';

export const restApiRoutes = {
  signup: `${baseUrl}/users/signup`,
  signin: `${baseUrl}/users/signin`,
  logout: `${baseUrl}/users/signout`,
  currentUser: `${baseUrl}/users/currentuser`,
  todos: `${baseUrl}/todos`,
};

export const routes = {
  auth: '/',
  todos: '/todos',
};
