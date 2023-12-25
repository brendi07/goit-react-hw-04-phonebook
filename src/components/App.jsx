import { Component } from 'react';
import ContactsList from './contacts/ContactsList/ContactsList';
import Phonebook from './contacts/PhonebookForm/PhonebookForm';
import Filter from './contacts/Filter/Filter';

import { nanoid } from 'nanoid';

class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const localData = localStorage.getItem('contacts');
    if (localData) this.setState({ contacts: JSON.parse(localData) });
  }

  componentDidUpdate(_, prevState) {
    if (
      prevState.contacts.length !== this.state.contacts.length
    ) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  handleSubmit = newContact => {
    const contactObj = {
      ...newContact,
      id: nanoid(),
    };

    let isExist = this.state.contacts.find(
      item => item.name.toLowerCase() === newContact.name.toLowerCase()
    );
    if (isExist) {
      alert(`${isExist.name} is already in contacts.`);
      return;
    }  
      this.setState(prevState => ({
        contacts: [...prevState.contacts, contactObj],
      }));
    
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  deleteButton = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(el => el.id !== id),
    }));
  };

  render() {
    const visibleContacts = this.state.contacts.filter(contact =>
      contact.name.toLowerCase().includes(this.state.filter.toLowerCase())
    );
    return (
      <div>
        <h2>Phonebook</h2>
        <Phonebook addNewContact={this.handleSubmit} />

        <Filter filter={this.state.filter} handleChange={this.handleChange} />
        <ContactsList
          contacts={visibleContacts}
          deleteContact={this.deleteButton}
        />
      </div>
    );
  }
}

export default App;
