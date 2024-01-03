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
import {
  AppContainer,
  Heading,
  ErrorText,
  SearchInput,
  AddButton,
} from './appstyles';

// Головний клас застосунку
class App extends Component {
  state = {
    contacts: [],
    name: '',
    number: '',
    filter: '',
    error: '',
    editContact: null,
    isContactExistsModalOpen: false,
    isDeleteConfirmationModalOpen: false,
    contactToDelete: null,
  };

  handleChange = (field, value) => {
    this.setState({ [field]: value });
  };

  // Додавання нового контакту
  addContact = () => {
    const { contacts, name, number } = this.state;

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
      name: '',
      number: '',
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

  // Завантаження контактів з локального сховища
  componentDidMount() {
    const storedContacts = localStorage.getItem('phonebookContacts');
    if (storedContacts) {
      this.setState({ contacts: JSON.parse(storedContacts) });
    }
  }

  // Збереження контактів в локальному сховищі
  componentDidUpdate() {
    localStorage.setItem(
      'phonebookContacts',
      JSON.stringify(this.state.contacts)
    );
  }

  // Рендер
  render() {
    const {
      contacts,
      name,
      number,
      filter,
      error,
      editContact,
      isContactExistsModalOpen,
      isDeleteConfirmationModalOpen,
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
          <ContactForm
            name={name}
            setName={newName => this.handleChange('name', newName)}
            number={number}
            setNumber={newNumber => this.handleChange('number', newNumber)}
            addContact={this.addContact}
          />
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
          <AddButton
            variant="contained"
            onClick={this.addContact}
            disabled={name.trim() === '' || number.trim() === ''}
          >
            Add Contact
          </AddButton>
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
              A contact with the name <strong>{name}</strong> already exists.
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

        <ToastContainer />
      </React.Fragment>
    );
  }
}

// Експорт
export default App;
