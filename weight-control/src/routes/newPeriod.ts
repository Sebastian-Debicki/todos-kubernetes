import express, { Request, Response } from 'express';

import { Period } from '../models/period';

const router = express.Router();

router.post('/api/period', async (req: Request, res: Response) => {
  const { name, from, to, bodyWeights } = req.body;

  const period = await Period.build({
    name,
    from,
    to,
    bodyWeights,
    userId: req.currentUser!.id,
  });

  res.send(period);
});

export { router as periodRouter };
