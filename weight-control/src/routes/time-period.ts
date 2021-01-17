import express, { Response, Request } from 'express';

const router = express.Router();

router.get('/api/time-period', (req: Request, res: Response) => {
  res.send({
    timePeriod: [],
  });
});

export { router as timePeriodRouter };
