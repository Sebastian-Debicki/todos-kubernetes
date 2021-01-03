import * as React from 'react';
import { Container, Button, Grid, makeStyles } from '@material-ui/core';

import { useRequest, Error, Todo, Modal, TodoBody, ConfirmModal } from 'common';
import { restApiRoutes } from 'core';
import { TodoCard } from '../components/TodoCard';
import { AddTodoForm } from '../components/AddTodoForm';

export const Todos = () => {
  const [todos, setTodos] = React.useState<Todo[]>([]);
  const [pickedTodo, setPickedTodo] = React.useState<Todo | null>(null);
  const [todo, setTodo] = React.useState<TodoBody>({
    title: '',
    description: '',
    subject: '',
    important: false,
  });
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const classes = useStyles();

  const { doRequest: addTodoRequest, error, cleanError } = useRequest<
    TodoBody,
    Todo,
    void
  >({
    method: 'post',
    url: () => restApiRoutes.todos,
    body: {
      title: todo.title,
      description: todo.description,
      subject: todo.subject,
      important: todo.important,
    },
    onSuccess: (newTodo) => {
      setTodos([...todos, newTodo]);
      setTodo({
        title: '',
        description: '',
        subject: '',
        important: false,
      });
      setIsModalOpen(false);
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
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Container>
      <Button
        className={classes.button}
        onClick={() => setIsModalOpen(true)}
        variant="contained"
        color="secondary"
      >
        Add todo
      </Button>

      <Grid container spacing={3}>
        {todos.map((todo) => (
          <Grid key={todo.id} item xs={12} sm={6} md={4}>
            <TodoCard todo={todo} onDelete={() => setPickedTodo(todo)} />
          </Grid>
        ))}
      </Grid>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <AddTodoForm
          todo={todo}
          setTodo={setTodo}
          onAddTodo={() => addTodoRequest()}
        />
      </Modal>

      <ConfirmModal
        isOpen={!!pickedTodo}
        onClose={() => setPickedTodo(null)}
        onConfirm={(isConfirmed) => {
          if (!isConfirmed) return;
          pickedTodo && deleteTodoRequest(pickedTodo.id);
        }}
      />

      <Error error={error} onClose={cleanError} />
    </Container>
  );
};

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(3, 0),
  },
}));
