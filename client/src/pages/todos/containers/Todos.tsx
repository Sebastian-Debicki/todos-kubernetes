import * as React from 'react';
import { Container, Button, Grid, makeStyles } from '@material-ui/core';

import { Todo, Modal, TodoBody, ConfirmModal, todosService } from 'common';
import { TodoCard } from '../components/TodoCard';
import { TodoForm } from '../components/TodoForm';

export const Todos = () => {
  const [todos, setTodos] = React.useState<Todo[]>([]);
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

  const classes = useStyles();

  const addTodoRequest = async () => {
    await todosService.addTodo(todo).then(({ data: todo }) => {
      setIsAddModalOpen(false);
      setTodos([...todos, todo]);
    });
    setTodo({
      title: '',
      description: '',
      subject: '',
      important: false,
    });
  };

  const editTodoRequest = async (id: string) => {
    if (!pickedTodo) return;
    await todosService.editTodo(pickedTodo, id).then(({ data: editedTodo }) => {
      const editedTodos = todos.map((todo) =>
        todo.id === editedTodo.id ? (todo = editedTodo) : todo
      );
      console.log(editedTodos);
      setTodos(editedTodos);
      setIsEditModalOpen(false);
    });
  };

  const deleteTodoRequest = async (id: string) => {
    await todosService.deleteTodo(id).then(() => {
      const filteredTodos = todos.filter((todo) => todo.id !== id);
      setTodos(filteredTodos);
    });
  };

  React.useEffect(() => {
    todosService.getTodos().then(({ data }) => setTodos(data));
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

      <Grid container spacing={3}>
        {todos.map((todo) => (
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
          onSubmit={() => pickedTodo && editTodoRequest(pickedTodo.id)}
        />
      </Modal>

      <ConfirmModal
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        onConfirm={(isConfirmed) => {
          if (!isConfirmed) return;
          pickedTodo && deleteTodoRequest(pickedTodo.id);
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
