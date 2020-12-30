import React from 'react';
import { Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';

interface Props {
  error: string | null;
}

export const Error: React.FC<Props> = ({ error }) => (
  <Snackbar
    open={!!error}
    // autoHideDuration={1000}
    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
  >
    <MuiAlert variant="filled" severity="error">
      {error}
    </MuiAlert>
  </Snackbar>
);
