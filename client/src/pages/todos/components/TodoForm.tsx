import React from 'react';
import {
  Button,
  Checkbox,
  FormControlLabel,
  makeStyles,
  TextField,
} from '@material-ui/core';

import { TodoBody } from 'common';

interface Props {
  todo: TodoBody | null;
  onChangeTodo: (key: keyof TodoBody, value: string | boolean) => void;
  onSubmit: () => void;
}

export const TodoForm: React.FC<Props> = ({ todo, onSubmit, onChangeTodo }) => {
  const classes = useStyles();

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form autoComplete="off" onSubmit={submitHandler}>
      <div className={classes.paper}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="subject"
          label="Subject"
          name="subject"
          onChange={(e) => onChangeTodo('subject', e.target.value)}
          value={todo?.subject}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="title"
          label="Title"
          name="title"
          onChange={(e) => onChangeTodo('title', e.target.value)}
          value={todo?.title}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="description"
          label="Description"
          name="description"
          onChange={(e) => onChangeTodo('description', e.target.value)}
          multiline
          rows={3}
          value={todo?.description}
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={todo?.important}
              onChange={(e) => onChangeTodo('important', e.target.checked)}
              name="important"
              color="primary"
              value={todo?.important}
            />
          }
          label="Important"
        />
        <Button
          className={classes.submit}
          variant="contained"
          color="secondary"
          type="submit"
        >
          Submit
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
