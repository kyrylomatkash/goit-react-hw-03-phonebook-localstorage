// Імпорт бібліотек
import React, { Component } from 'react';
import List from '@mui/material/List';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';

// Імпорт стилів
import {
  StyledList,
  StyledListItem,
  EditButton,
  DeleteButton,
} from './contactliststyles';

// Функція листу контактів
class ContactList extends Component {
  state = {
    editContact: null,
  };

  handleDeleteConfirmationClose = () => {
    this.setState({ editContact: null });
  };

  // Видалення контакту
  handleDeleteContact = contact => {
    this.props.deleteContact(contact.id);
    this.handleDeleteConfirmationClose();
  };

  // Рендер
  render() {
    const { contacts, filter, handleEditClick } = this.props;
    const { editContact } = this.state;

    // Пошук контакту
    const filteredContacts = contacts
      .filter(contact =>
        contact.name.toLowerCase().includes(filter.toLowerCase())
      )
      .sort((a, b) => a.name.localeCompare(b.name));

    return (
      <StyledList>
        {filteredContacts.length > 0 ? (
          <List>
            {filteredContacts.map(contact => (
              <StyledListItem key={contact.id}>
                {contact.name} - {contact.number}
                <EditButton onClick={() => handleEditClick(contact)}>
                  Edit
                </EditButton>
                <DeleteButton onClick={() => this.handleDeleteContact(contact)}>
                  Delete
                </DeleteButton>
              </StyledListItem>
            ))}
          </List>
        ) : (
          <p>There are no contacts.</p>
        )}

        {editContact && (
          <Dialog
            open={true}
            onClose={this.handleDeleteConfirmationClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">Edit Contact</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Edit the details of {editContact.name}.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={this.handleDeleteConfirmationClose}
                color="primary"
              >
                Cancel
              </Button>
            </DialogActions>
          </Dialog>
        )}
      </StyledList>
    );
  }
}

// Експорт
export default ContactList;
