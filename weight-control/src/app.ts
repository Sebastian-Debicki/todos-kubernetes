import express from 'express';

import { timePeriodRouter } from './routes';

const app = express();

app.use(timePeriodRouter);

export { app };
