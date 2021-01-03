import React, { Dispatch, SetStateAction } from 'react';
import { Button, makeStyles, TextField } from '@material-ui/core';

import { TodoBody } from 'common';

interface Props {
  todo: TodoBody;
  setTodo: Dispatch<SetStateAction<TodoBody>>;
  onAddTodo: () => void;
}

export const AddTodoForm: React.FC<Props> = ({ todo, setTodo, onAddTodo }) => {
  const classes = useStyles();

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddTodo();
  };

  return (
    <form autoComplete="off" onSubmit={onSubmit}>
      <div className={classes.paper}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="title"
          label="Title"
          name="title"
          onChange={(e) => setTodo({ ...todo, title: e.target.value })}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="description"
          label="Description"
          name="description"
          onChange={(e) => setTodo({ ...todo, description: e.target.value })}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="subject"
          label="Subject"
          name="subject"
          onChange={(e) => setTodo({ ...todo, subject: e.target.value })}
        />
        <Button
          className={classes.submit}
          variant="contained"
          color="secondary"
          type="submit"
        >
          Add todo
        </Button>
      </div>
    </form>
  );
};

const useStyles = makeStyles((theme) => ({
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));
