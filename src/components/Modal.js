import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function Modal({
  title,
  body,
  cancelButton,
  confirmButton,
  handleClose,
  handleConfirm,
  open,
}) {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {body}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          data-testid="cancel-modal-button"
          onClick={handleClose}
          color="primary"
        >
          {cancelButton}
        </Button>
        <Button
          data-testid="confirm-modal-button"
          onClick={handleConfirm}
          color="primary"
          autoFocus
        >
          {confirmButton}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
