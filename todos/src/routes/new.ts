import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { requireAuth, validateRequest } from '@ssebaa9/common';
import { Todo } from '../models/todo';

const router = express.Router();

router.post(
  '/api/todos',
  requireAuth,
  [body('title').not().isEmpty().withMessage('Title is required')],
  validateRequest,
  async (req: Request, res: Response) => {
    const { title } = req.body;

    const todo = Todo.build({
      title,
      userId: req.currentUser!.id,
    });
    await todo.save();

    res.status(201).send(todo);
  }
);

export { router as createTodoRouter };
