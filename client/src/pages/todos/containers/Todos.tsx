import * as React from 'react';

import { Container, TextField, Button, Grid } from '@material-ui/core';
import { useRequest, Error, Todo, Card } from 'common';
import { restApiRoutes } from 'core';

export const Todos = () => {
  const [todos, setTodos] = React.useState<Todo[]>([]);
  const [todoTitle, setTodoTitle] = React.useState('');

  const { doRequest: addTodoRequest, error, setError } = useRequest<Todo, Todo>(
    {
      method: 'post',
      url: restApiRoutes.todos,
      body: {
        title: todoTitle,
      },
      onSuccess: () => {
        setTodoTitle('');
      },
    }
  );

  const { doRequest: getTodosRequest } = useRequest<{}, Todo[]>({
    method: 'get',
    url: restApiRoutes.todos,
    body: {},
    onSuccess: (todos) => setTodos(todos),
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
        value={todoTitle}
        onChange={(e) => setTodoTitle(e.target.value)}
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

      <Grid container spacing={3}>
        {todos.map((todo) => (
          <Grid item xs={12} sm={6} md={4}>
            <Card title={todo.title} />
          </Grid>
        ))}
      </Grid>

      <Error error={error} onClose={() => setError(null)} />
    </Container>
  );
};
