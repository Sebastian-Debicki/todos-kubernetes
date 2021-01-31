import express, { Response, Request } from 'express';

import { Weight } from './../models/weight';

const router = express.Router();

router.get('/api/weights', async (req: Request, res: Response) => {
  const weights = await Weight.find({
    userId: req.currentUser?.id,
  });

  res.send(weights);
});

export { router as weightsRouter };
