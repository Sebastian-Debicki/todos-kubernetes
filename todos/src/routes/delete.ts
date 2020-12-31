import express, { Request, Response } from 'express';
import {
  NotAuthorizedError,
  NotFoundError,
  requireAuth,
  validateRequest,
} from '@ssebaa9/common';

import { Todo } from '../models/todo';

const router = express.Router();

router.delete(
  '/api/todos/:id',
  requireAuth,
  validateRequest,
  async (req: Request, res: Response) => {
    const todo = await Todo.findById(req.params.id);

    if (!todo) {
      throw new NotFoundError();
    }

    if (todo.userId !== req.currentUser!.id) {
      throw new NotAuthorizedError();
    }

    await Todo.findByIdAndDelete(todo.id);

    res.status(204).send();
  }
);

export { router as deleteTodoRouter };
