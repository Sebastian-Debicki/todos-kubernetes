import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { requireAuth, validateRequest } from '@ssebaa9/common';

import { Weight } from '../models/weight';

const router = express.Router();

router.post(
  '/api/weights',
  requireAuth,
  [
    body('weight').not().isEmpty().withMessage('Weight is required'),
    body('date').not().isEmpty().withMessage('Date is required'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const weight = await Weight.build({
      weight: req.body.weight,
      date: req.body.date,
      userId: req.currentUser!.id,
    });
    await weight.save();

    res.send(weight);
  }
);

export { router as newWeightRouter };
