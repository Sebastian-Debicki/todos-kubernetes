import express, { Request, Response } from 'express';
import { NotFoundError } from '@ssebaa9/common';
import { Todo } from '../models/todo';

const router = express.Router();

router.get('/api/todos/:id', async (req: Request, res: Response) => {
  const todo = await Todo.findById(req.params.id);

  if (!todo) {
    throw new NotFoundError();
  }

  res.send(todo);
});

export { router as showTodoRouter };
