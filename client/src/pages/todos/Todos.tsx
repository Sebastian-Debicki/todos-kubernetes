import * as React from 'react';
import {
  Container,
  Button,
  Grid,
  makeStyles,
  Typography,
} from '@material-ui/core';

import { Todo, Modal, TodoBody, ConfirmModal, Error } from 'common';
import { TodoCard } from './components/TodoCard';
import { TodoForm } from './components/TodoForm';
import { useTodosReducer } from 'common/hooks/useTodosReducer';

export const Todos = () => {
  const [pickedTodo, setPickedTodo] = React.useState<Todo | null>(null);
  const [todo, setTodo] = React.useState<TodoBody>({
    title: '',
    description: '',
    subject: '',
    important: false,
  });
  const [isAddModalOpen, setIsAddModalOpen] = React.useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = React.useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = React.useState(false);

  const { state, asyncActions, cleanError } = useTodosReducer();

  const classes = useStyles();

  const addTodoRequest = () => {
    asyncActions.addTodo(todo);
    setIsAddModalOpen(false);
    setTodo({
      title: '',
      description: '',
      subject: '',
      important: false,
    });
  };

  const editTodoRequest = async () => {
    if (!pickedTodo) return;
    asyncActions.editTodo(pickedTodo);
    setIsEditModalOpen(false);
  };

  React.useEffect(() => {
    asyncActions.getTodos();
  }, []);

  return (
    <Container>
      <Button
        className={classes.button}
        onClick={() => setIsAddModalOpen(true)}
        variant="contained"
        color="secondary"
      >
        Add todo
      </Button>

      {state.todos.length ? (
        <Grid container spacing={3}>
          {state.todos.map((todo) => (
            <Grid key={todo.id} item xs={12} sm={6} md={4}>
              <TodoCard
                todo={todo}
                onDelete={() => {
                  setPickedTodo(todo);
                  setIsConfirmModalOpen(true);
                }}
                onEdit={() => {
                  setPickedTodo(todo);
                  setIsEditModalOpen(true);
                }}
              />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography variant="h6" className={classes.noTodoText}>
          You have nothing to do...
        </Typography>
      )}

      <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)}>
        <TodoForm
          todo={todo}
          onChangeTodo={(key: keyof TodoBody, value: string | boolean) =>
            setTodo({ ...todo, [key]: value })
          }
          onSubmit={() => addTodoRequest()}
        />
      </Modal>

      <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
        <TodoForm
          todo={pickedTodo}
          onChangeTodo={(key: keyof TodoBody, value: string | boolean) =>
            pickedTodo && setPickedTodo({ ...pickedTodo, [key]: value })
          }
          onSubmit={() => editTodoRequest()}
        />
      </Modal>

      <ConfirmModal
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        onConfirm={(isConfirmed) => {
          if (!isConfirmed) return;
          pickedTodo && asyncActions.deleteTodo(pickedTodo.id);
        }}
      />

      <Error error={state.error} onClose={cleanError} />
    </Container>
  );
};

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(3, 0),
  },
  noTodoText: {
    fontStyle: 'italic',
  },
}));
