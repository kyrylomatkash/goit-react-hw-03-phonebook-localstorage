// Імпорти стилів і бібліотек
import React, { Component } from 'react';
import { StyledForm, StyledTextField } from './contactformstyles';
import { Button } from '@mui/material';
// Основний клас застосунку
class ContactForm extends Component {
  state = {
    name: '',
    number: '',
  };

  handleAddContact = e => {
    e.preventDefault();

    const { name, number } = this.state;
    this.props.addContact(name, number);
    this.setState({ name: '', number: '' });
  };
  // Рендер
  render() {
    const { name, number } = this.state;

    return (
      <StyledForm onSubmit={this.handleAddContact}>
        <StyledTextField
          label="Name"
          variant="outlined"
          sx={{ width: '350px', marginBottom: '10px' }}
          value={name}
          onChange={e => this.setState({ name: e.target.value })}
          required
        />
        <StyledTextField
          label="Number"
          variant="outlined"
          type="tel"
          sx={{ width: '350px', marginBottom: '10px' }}
          value={number}
          onChange={e => this.setState({ number: e.target.value })}
          required
        />
        <Button type="submit" variant="outlined">
          Add Contact
        </Button>
      </StyledForm>
    );
  }
}
// Експорт
export default ContactForm;
