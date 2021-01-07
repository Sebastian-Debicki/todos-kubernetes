import * as React from 'react';
import { Container, Button, Grid, makeStyles } from '@material-ui/core';

import { Todo, Modal, TodoBody, ConfirmModal } from 'common';
import { TodoCard } from '../components/TodoCard';
import { TodoForm } from '../components/TodoForm';
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

  const { state, asyncActions } = useTodosReducer();

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log(state.error);

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

      <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)}>
        <TodoForm
          todo={todo}
          setTodo={setTodo}
          onSubmit={() => addTodoRequest()}
        />
      </Modal>

      <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
        <TodoForm
          todo={pickedTodo}
          setTodo={setPickedTodo}
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

      {/* <Error error={error} onClose={cleanError} /> */}
    </Container>
  );
};

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(3, 0),
  },
}));
