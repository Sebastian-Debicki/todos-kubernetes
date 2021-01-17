import * as React from 'react';
import {
  Button,
  createStyles,
  makeStyles,
  Theme,
  Typography,
} from '@material-ui/core';

import { Modal } from './Modal';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (isConfirmed: boolean) => void;
}

export const ConfirmModal: React.FC<Props> = ({
  isOpen,
  onClose,
  onConfirm,
}) => {
  const classes = useStyles();

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className={classes.container}>
        <Typography className={classes.title} variant="h5" align="center">
          Are you sure?
        </Typography>
        <Button
          className={classes.leftButton}
          color="primary"
          variant="contained"
          onClick={() => {
            onConfirm(true);
            onClose();
          }}
          size="small"
        >
          Yes
        </Button>
        <Button
          color="primary"
          variant="contained"
          onClick={() => {
            onConfirm(false);
            onClose();
          }}
          size="small"
        >
          No
        </Button>
      </div>
    </Modal>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
    },
    title: {
      width: '100%',
      marginBottom: theme.spacing(3),
    },
    leftButton: {
      marginRight: theme.spacing(3),
    },
  })
);
