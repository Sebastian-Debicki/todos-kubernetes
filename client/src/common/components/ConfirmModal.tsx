import * as React from 'react';
import { Button, Typography } from '@material-ui/core';

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
}) => (
  <Modal isOpen={isOpen} onClose={onClose}>
    <Typography>Are you sure?</Typography>
    <Button
      onClick={() => {
        onConfirm(true);
        onClose();
      }}
      size="small"
    >
      Yes
    </Button>
    <Button
      onClick={() => {
        onConfirm(false);
        onClose();
      }}
      size="small"
    >
      No
    </Button>
  </Modal>
);
