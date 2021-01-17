import express from 'express';
import cookieSession from 'cookie-session';
import { json } from 'body-parser';
import { currentUser, errorHandler, NotFoundError } from '@ssebaa9/common';

import { periodsListRouter } from './routes/index';
import { periodRouter } from './routes/newPeriod';

const app = express();

app.set('trust proxy', true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: false,
  })
);
app.use(currentUser);

app.use(periodsListRouter);
app.use(periodRouter);

app.all('*', async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
