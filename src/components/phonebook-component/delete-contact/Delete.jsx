// Імпорт бібліотек
import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from '@mui/material';
// Основна функція компоненту
const DeleteConfirmationModal = ({ open, handleClose, handleConfirmation }) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Delete Contact</DialogTitle>
      <DialogContent>
        Are you sure you want to delete this contact?
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleConfirmation} color="primary" autoFocus>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};
// Експорт
export default DeleteConfirmationModal;
