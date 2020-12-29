import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';
import { errorHandler, NotFoundError, currentUser } from '@ssebaa9/common';

import { createTodoRouter } from './routes/new';
import { showTodoRouter } from './routes/show';
import { indexTodoRouter } from './routes/index';
import { updateTodoRouter } from './routes/update';

const app = express();
app.set('trust proxy', true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== 'test',
  })
);
app.use(currentUser);

app.use(createTodoRouter);
app.use(showTodoRouter);
app.use(indexTodoRouter);
app.use(updateTodoRouter);

app.all('*', async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
