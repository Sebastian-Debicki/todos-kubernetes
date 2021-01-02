import * as React from 'react';

import { Container, TextField, Button, Grid } from '@material-ui/core';
import { useRequest, Error, Todo, Modal } from 'common';
import { restApiRoutes } from 'core';
import { TodoCard } from '../components/TodoCard';

export const Todos = () => {
  const [todos, setTodos] = React.useState<Todo[]>([]);
  const [title, setTitle] = React.useState('');

  const { doRequest: addTodoRequest, error, cleanError } = useRequest<
    Omit<Todo, 'id'>,
    Todo,
    void
  >({
    method: 'post',
    url: () => restApiRoutes.todos,
    body: {
      title,
      description: 'todo description',
      important: false,
      subject: 'trening',
    },
    onSuccess: (todo) => {
      setTodos([...todos, todo]);
      setTitle('');
    },
  });

  const { doRequest: getTodosRequest } = useRequest<{}, Todo[], void>({
    method: 'get',
    url: () => restApiRoutes.todos,
    body: {},
    onSuccess: (todos) => setTodos(todos),
  });

  const { doRequest: deleteTodoRequest } = useRequest<{}, void, string>({
    method: 'delete',
    url: (id) => `${restApiRoutes.todos}/${id}`,
    body: {},
    onSuccess: (res, id) => {
      const filteredTodos = todos.filter((todo) => todo.id !== id);
      setTodos(filteredTodos);
    },
  });

  React.useEffect(() => {
    getTodosRequest();
  }, []);

  return (
    <Container>
      <Button
        style={{ marginTop: 20, marginBottom: 20 }}
        onClick={() => addTodoRequest()}
        variant="contained"
        color="secondary"
      >
        Add todo
      </Button>

      <Grid container spacing={3}>
        {todos.map((todo) => (
          <Grid key={todo.id} item xs={12} sm={6} md={4}>
            <TodoCard todo={todo} onDelete={() => deleteTodoRequest(todo.id)} />
          </Grid>
        ))}
      </Grid>

      <Modal>
        <form>
          <TextField />
          <Button
            style={{ marginTop: 20, marginBottom: 20 }}
            onClick={() => addTodoRequest()}
            variant="outlined"
            color="secondary"
            type="submit"
          >
            Add todo
          </Button>
        </form>
      </Modal>

      <Error error={error} onClose={cleanError} />
    </Container>
  );
};
