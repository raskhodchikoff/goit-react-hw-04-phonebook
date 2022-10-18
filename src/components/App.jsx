// import { Component } from 'react';
import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import { ContactForm } from 'components/ContactForm/ContactForm';
import { ContactList } from 'components/ContactList/ContactList';
import { Filter } from 'components/Filter/Filter';

import { MainTitle, ContactsTitle } from './App.styled';
import { Box } from './Box';

// import saveContacts from 'db/contacts';

export const App = () => {
  // state = {
  //   contacts: [],
  //   filter: '',
  // };

  const [contacts, setContacts] = useState(() => {
    return JSON.parse(window.localStorage.getItem('contacts')) ?? [];
  });
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const formSubmitHandler = ({ name, number }, actions) => {
    const data = {
      id: nanoid(),
      name,
      number,
    };

    contacts.find(contact => contact.name.toLowerCase() === name.toLowerCase())
      ? Notify.warning(`${name} is already in contacts.`, {
          timeout: 2000,
          position: 'center-top',
          fontSize: '20px',
          width: '400px',
          clickToClose: true,
        })
      : setContacts(contacts => [...contacts, data]);

    actions.resetForm();
  };

  const onFilter = e => {
    setFilter(e.currentTarget.value);
  };

  const filteredContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  const deleteContact = dataId => {
    setContacts(contacts.filter(contact => contact.id !== dataId));
  };

  return (
    <Box
      as="main"
      mx="auto"
      mt={5}
      width="400px"
      p={5}
      bg="mainBgr"
      border="m"
      borderRadius="m"
      borderColor="greyBorder"
      boxShadow="shadow"
    >
      <Box as="section" mb={3}>
        <MainTitle>Phonebook</MainTitle>
        <ContactForm onSubmit={formSubmitHandler} />
      </Box>
      <Box as="section">
        <ContactsTitle>Contacts</ContactsTitle>
        <Filter onFilter={onFilter} value={filter} />
        <ContactList
          contacts={filteredContacts()}
          onDeleteContact={deleteContact}
        />
      </Box>
    </Box>
  );
};
