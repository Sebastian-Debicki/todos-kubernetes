import express, { Request, Response } from 'express';
import { Todo, TodoDoc } from '../models/todo';

const router = express.Router();

router.get('/api/todos', async (req: Request, res: Response) => {
  const todos = await Todo.find({});

  const onlyCurrentUserTodos = todos.filter(
    (todo: TodoDoc) => todo.userId === req.currentUser?.id
  );

  res.send(onlyCurrentUserTodos);
});

export { router as indexTodoRouter };
