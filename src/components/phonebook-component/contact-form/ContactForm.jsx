// Імпорти стилів і бібліотек
import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import { StyledForm, StyledTextField } from './contactformstyles';
// Основний клас застосунку
class ContactForm extends Component {
  handleAddContact = e => {
    e.preventDefault();
    const { name, number, addContact } = this.props;

    if (name.trim() === '' || number.trim() === '') {
      return;
    }

    const newContact = {
      id: nanoid(),
      name: name.trim(),
      number: number.trim(),
    };

    addContact(newContact);
    this.props.setName('');
    this.props.setNumber('');
  };

  render() {
    const { name, setName, number, setNumber } = this.props;

    return (
      <StyledForm onSubmit={this.handleAddContact}>
        <StyledTextField
          label="Name"
          variant="outlined"
          sx={{ width: '350px', marginBottom: '10px' }}
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />
        <StyledTextField
          label="Number"
          variant="outlined"
          type="tel"
          sx={{ width: '350px', marginBottom: '10px' }}
          value={number}
          onChange={e => setNumber(e.target.value)}
          required
        />
      </StyledForm>
    );
  }
}
// Експорт
export default ContactForm;
