// Імпорт компонентів і бібліотек
import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import ContactForm from './phonebook-component/contact-form/ContactForm';
import ContactList from './phonebook-component/contact-list/ContactList';
import EditContact from './phonebook-component/edit-contact/Edit';
import DeleteConfirmationModal from './phonebook-component/delete-contact/Delete';
import {
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Імпорт стилів
import { AppContainer, Heading, ErrorText, SearchInput } from './appstyles';
// Головний клас застосунку
class App extends Component {
  state = {
    contacts: [],
    filter: '',
    error: '',
    editContact: null,
    isContactExistsModalOpen: false,
    isDeleteConfirmationModalOpen: false,
    contactToDelete: null,
    isClearHistoryConfirmationModalOpen: false,
  };

  handleChange = (field, value) => {
    this.setState({ [field]: value });
  };

  // Додавання нового контакту
  addContact = (name, number) => {
    const { contacts } = this.state;

    if (name.trim() === '' || number.trim() === '') {
      this.setState({
        error: 'Please fill in both name and number.',
      });
      return;
    }

    const existingContact = contacts.find(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );

    if (existingContact) {
      this.setState({ isContactExistsModalOpen: true });
      return;
    }

    const newContact = {
      id: nanoid(),
      name: name.trim(),
      number: number.trim(),
    };

    this.setState(prevState => ({
      contacts: [...prevState.contacts, newContact],
      filter: '',
      error: '',
    }));

    toast.success('Contact added successfully');
  };

  // Видалення контакту зі списку
  deleteContact = contactId => {
    this.setState({
      isDeleteConfirmationModalOpen: true,
      contactToDelete: contactId,
    });
  };

  handleDeleteConfirmation = () => {
    const { contactToDelete } = this.state;
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(
        contact => contact.id !== contactToDelete
      ),
      isDeleteConfirmationModalOpen: false,
    }));

    toast.success('Contact deleted successfully');
  };

  handleCloseDeleteConfirmationModal = () => {
    this.setState({
      isDeleteConfirmationModalOpen: false,
      contactToDelete: null,
    });
  };

  // Редагування контакту
  handleEditClick = contact => {
    this.setState({ editContact: contact });
  };

  // Збереження контакту у списку
  handleSaveEdit = editedContact => {
    this.setState(prevState => ({
      contacts: prevState.contacts.map(contact =>
        contact.id === editedContact.id ? editedContact : contact
      ),
      editContact: null,
    }));

    toast.success('Contact edited successfully');
  };

  handleContactExistsModalClose = () => {
    this.setState({ isContactExistsModalOpen: false });
  };

  clearHistory = () => {
    if (this.state.contacts.length === 0) {
      toast.warning('No contacts to clear.');
      return;
    }

    this.setState({
      isClearHistoryConfirmationModalOpen: true,
    });
  };

  handleClearHistoryConfirmation = () => {
    this.setState({
      contacts: [],
      isClearHistoryConfirmationModalOpen: false,
    });

    localStorage.removeItem('phonebookContacts');
    toast.success('Phonebook history cleared successfully');
  };

  handleCloseClearHistoryConfirmationModal = () => {
    this.setState({
      isClearHistoryConfirmationModalOpen: false,
    });
  };

  // Завантаження контактів з локального сховища
  componentDidMount() {
    const storedContacts = localStorage.getItem('phonebookContacts');
    if (storedContacts) {
      this.setState({ contacts: JSON.parse(storedContacts) });
    }
  }

  // Збереження контактів в локальному сховищі
  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem(
        'phonebookContacts',
        JSON.stringify(this.state.contacts)
      );
    }
  }

  // Рендер
  render() {
    const {
      contacts,
      filter,
      error,
      editContact,
      isContactExistsModalOpen,
      isDeleteConfirmationModalOpen,
      isClearHistoryConfirmationModalOpen,
    } = this.state;
    // Фільтр по імені
    const filteredContacts = contacts
      .filter(contact =>
        contact.name.toLowerCase().includes(filter.toLowerCase())
      )
      .sort((a, b) => a.name.localeCompare(b.name));

    return (
      <React.Fragment>
        <AppContainer>
          <Heading variant="h1">Phonebook</Heading>
          {error && <ErrorText>{error}</ErrorText>}
          <ContactForm addContact={this.addContact} />
          <Typography variant="h2">Contacts</Typography>
          <SearchInput
            type="text"
            name="filter"
            value={filter}
            onChange={e => this.handleChange('filter', e.target.value)}
            placeholder="Search contacts..."
          />
          <ContactList
            contacts={filteredContacts}
            filter={filter}
            deleteContact={this.deleteContact}
            handleEditClick={this.handleEditClick}
          />
          <Button
            variant="outlined"
            color="error"
            size="small"
            onClick={this.clearHistory}
          >
            Clear History
          </Button>
        </AppContainer>

        {editContact && (
          <EditContact
            contact={editContact}
            handleSaveEdit={this.handleSaveEdit}
            handleClose={() => this.setState({ editContact: null })}
          />
        )}

        <DeleteConfirmationModal
          open={isDeleteConfirmationModalOpen}
          handleClose={this.handleCloseDeleteConfirmationModal}
          handleConfirmation={this.handleDeleteConfirmation}
        />

        <Dialog
          open={isContactExistsModalOpen}
          onClose={this.handleContactExistsModalClose}
        >
          <DialogTitle>Contact Exists</DialogTitle>
          <DialogContent>
            <DialogContentText>
              A contact with the name <strong>{filter}</strong> already exists.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={this.handleContactExistsModalClose}
              color="primary"
            >
              OK
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog
          open={isClearHistoryConfirmationModalOpen}
          onClose={this.handleCloseClearHistoryConfirmationModal}
        >
          <DialogTitle>Clear Phonebook History</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to clear the phonebook history? This action
              cannot be undone.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={this.handleCloseClearHistoryConfirmationModal}
              color="primary"
            >
              Cancel
            </Button>
            <Button
              onClick={this.handleClearHistoryConfirmation}
              color="primary"
            >
              Clear
            </Button>
          </DialogActions>
        </Dialog>

        <ToastContainer />
      </React.Fragment>
    );
  }
}

// Експорт
export default App;
