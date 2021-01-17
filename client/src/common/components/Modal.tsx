import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import MaterialModal from '@material-ui/core/Modal';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const Modal: React.FC<Props> = ({ children, isOpen, onClose }) => {
  const classes = useStyles();

  return (
    <div>
      <MaterialModal className={classes.modal} open={isOpen} onClose={onClose}>
        <div className={classes.container}>{children}</div>
      </MaterialModal>
    </div>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      padding: theme.spacing(3),
      backgroundColor: theme.palette.background.default,
      borderRadius: theme.shape.borderRadius,
      outline: 'none',
      minWidth: '90%',
      [theme.breakpoints.up('sm')]: {
        padding: theme.spacing(4),
        minWidth: 420,
      },
    },
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
  })
);
