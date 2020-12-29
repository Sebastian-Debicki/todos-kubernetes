import express, { Request, Response } from 'express';
import { Todo } from '../models/todo';

const router = express.Router();

router.get('/api/todos', async (req: Request, res: Response) => {
  const todos = await Todo.find({});

  res.send(todos);
});

export { router as indexTodoRouter };
