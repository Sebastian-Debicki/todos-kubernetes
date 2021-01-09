import React from 'react';
import { Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';

interface Props {
  error: string | undefined;
  onClose: () => void;
}

export const Error: React.FC<Props> = ({ error, onClose }) => (
  <Snackbar
    open={!!error}
    autoHideDuration={5000}
    onClose={onClose}
    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
  >
    <MuiAlert variant="filled" severity="error">
      {error}
    </MuiAlert>
  </Snackbar>
);
