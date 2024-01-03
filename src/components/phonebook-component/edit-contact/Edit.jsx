// Імпорт бібліотек
import React, { Component } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
// Основний клас застосунку
class EditContact extends Component {
  state = {
    editedName: this.props.contact.name,
    editedNumber: this.props.contact.number,
  };

  handleNameChange = e => {
    this.setState({ editedName: e.target.value });
  };

  handleNumberChange = e => {
    this.setState({ editedNumber: e.target.value });
  };

  handleSave = () => {
    const { contact, handleSaveEdit, handleClose } = this.props;
    const { editedName, editedNumber } = this.state;

    const editedContact = {
      ...contact,
      name: editedName.trim(),
      number: editedNumber.trim(),
    };

    handleSaveEdit(editedContact);
    handleClose();
  };
  // Рендер
  render() {
    const { contact, handleClose } = this.props;
    const { editedName, editedNumber } = this.state;

    return (
      <Dialog open={true} onClose={handleClose}>
        <DialogTitle>Edit Contact</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Edit the details of {contact.name}.
          </DialogContentText>
          <TextField
            label="Name"
            variant="outlined"
            value={editedName}
            onChange={this.handleNameChange}
            required
            sx={{ width: '100%', marginBottom: '10px' }}
          />
          <TextField
            label="Number"
            variant="outlined"
            type="tel"
            value={editedNumber}
            onChange={this.handleNumberChange}
            required
            sx={{ width: '100%', marginBottom: '10px' }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={this.handleSave} color="primary" autoFocus>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}
// Експорт
export default EditContact;
