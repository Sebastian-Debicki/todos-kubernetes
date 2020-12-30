import * as React from 'react';

import { Container, TextField, Button } from '@material-ui/core';
import { useRequest, Error, Todo } from 'common';
import { restApiRoutes } from 'core';

export const Todos = () => {
  const [todos, setTodos] = React.useState<Todo[]>([]);
  const [todo, setTodo] = React.useState('');

  const { doRequest: addTodoRequest, error, setError } = useRequest<Todo, Todo>(
    {
      method: 'post',
      url: restApiRoutes.todos,
      body: {
        title: todo,
      },
      onSuccess: () => {
        setTodo('');
      },
    }
  );

  const { doRequest: getTodosRequest } = useRequest<{}, Todo[]>({
    method: 'get',
    url: restApiRoutes.todos,
    body: {},
    onSuccess: (res) => setTodos(res),
  });

  React.useEffect(() => {
    getTodosRequest();
  }, []);

  return (
    <Container>
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="todo"
        label="Todo"
        name="todo"
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
      />
      <Button
        onClick={() => addTodoRequest()}
        variant="contained"
        color="primary"
        fullWidth
        type="submit"
      >
        Add
      </Button>

      {todos.map((todo) => (
        <p>{todo.title}</p>
      ))}

      <Error error={error} onClose={() => setError(null)} />
    </Container>
  );
};
