import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import MaterialModal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const Modal: React.FC<Props> = ({ children, isOpen, onClose }) => {
  const classes = useStyles();

  return (
    <div>
      <MaterialModal
        className={classes.modal}
        open={isOpen}
        onClose={onClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <div className={classes.container}>{children}</div>
      </MaterialModal>
    </div>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      padding: theme.spacing(3),
      outline: 'none',
      borderRadius: 8,
      minWidth: '90%',
      backgroundColor: theme.palette.secondary.main,
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
