import express, { Response, Request } from 'express';

const router = express.Router();

router.get('/api/periods', (req: Request, res: Response) => {
  res.send({
    periods: [],
  });
});

export { router as periodsListRouter };
