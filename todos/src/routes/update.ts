import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import {
  validateRequest,
  NotFoundError,
  requireAuth,
  NotAuthorizedError,
} from '@ssebaa9/common';
import { Todo } from '../models/todo';

const router = express.Router();

router.put(
  '/api/todos/:id',
  requireAuth,
  [body('title').not().isEmpty().withMessage('Title is required')],
  validateRequest,
  async (req: Request, res: Response) => {
    const todo = await Todo.findById(req.params.id);

    if (!todo) {
      throw new NotFoundError();
    }

    if (todo.userId !== req.currentUser!.id) {
      throw new NotAuthorizedError();
    }

    todo.set({
      title: req.body.title,
    });
    await todo.save();

    res.send(todo);
  }
);

export { router as updateTodoRouter };
