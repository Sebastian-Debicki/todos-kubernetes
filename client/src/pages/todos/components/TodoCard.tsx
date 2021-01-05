import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import { Todo } from 'common/models';

interface Props {
  todo: Todo;
  onDelete: () => void;
  onEdit: () => void;
}

export const TodoCard: React.FC<Props> = ({ todo, onDelete, onEdit }) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography
          className={classes.subject}
          color="textSecondary"
          gutterBottom
        >
          {todo.subject}
        </Typography>
        <Typography variant="h5" component="h2">
          {todo.title}
        </Typography>
        <Typography variant="body2" component="p">
          {todo.description}
        </Typography>
        {todo.important && (
          <Typography
            className={classes.important}
            variant="overline"
            component="p"
            color="error"
          >
            ! Important
          </Typography>
        )}
      </CardContent>
      <CardActions>
        <Button onClick={onDelete} size="small">
          Delete
        </Button>
        <Button onClick={onEdit} size="small">
          Edit
        </Button>
      </CardActions>
    </Card>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 275,
  },
  subject: {
    fontSize: 14,
  },
  important: {
    marginTop: theme.spacing(1),
  },
}));
