import { useState } from 'react';
import {
  PhonebookForm,
  PhonebookLabel,
  PhonebookInput,
  PhonebookButton,
} from './PhonebookForm.styled';

const Phonebook = ({addNewContact}) => {
const [name, setName] = useState("")
  const [number, setNumber] = useState()
  
  const handleSubmit = e => {
         e.preventDefault();
        addNewContact({name, number});

     setName("");
     setNumber("")
  };
  
   const  handleChange = e => {
    const { name, value } = e.target;
       if (name === "name") setName(value)
       else if(name==="number") setNumber(value)
       
  };

     return (
       <PhonebookForm onSubmit={handleSubmit}>
         <PhonebookLabel>
           Name:
           <PhonebookInput
             type="text"
             name="name"
             value={name}
             onChange={handleChange}
           />
         </PhonebookLabel>
         <PhonebookLabel>
           Number:
           <PhonebookInput
             type="text"
             name="number"
             value={number}
             onChange={handleChange}
           />
         </PhonebookLabel>
         <PhonebookButton type="submit">Add Contact</PhonebookButton>
       </PhonebookForm>
     );
   };

export default Phonebook;
