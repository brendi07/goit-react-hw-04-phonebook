import { useState, useEffect } from 'react';
import ContactsList from './contacts/ContactsList/ContactsList';
import Phonebook from './contacts/PhonebookForm/PhonebookForm';
import Filter from './contacts/Filter/Filter';

import { nanoid } from 'nanoid';

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    const localData = localStorage.getItem('contacts');
    if (localData) setContacts(JSON.parse(localData));
  }, []);

  useEffect(() => {
      localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts])

   const handleSubmit = newContact => {
    const contactObj = {
      ...newContact,
      id: nanoid(),
    };

    let isExist =contacts.find(
      item => item.name.toLowerCase() === newContact.name.toLowerCase()
    );
    if (isExist) {
      alert(`${isExist.name} is already in contacts.`);
      return;
    }  
      setContacts(prevState => 
       [...prevState, contactObj],
      );
    
  };

   const handleChange = e => {
     const { name, value } = e.target;
     if (name === 'name') setContacts(value);
     else if (name === 'filter') setFilter(value);
  };
  
   const deleteButton = id => {
    setContacts(prevState => 
      prevState.filter(el => el.id !== id),
    );
  };

   const visibleContacts = contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );

   return (
      <div>
        <h2>Phonebook</h2>
        <Phonebook addNewContact={handleSubmit} />

        <Filter filter={filter} handleChange={handleChange} />
        <ContactsList
          contacts={visibleContacts}
          deleteContact={deleteButton}
        />
      </div>
    );
}

export default App;
