import React, { useState } from 'react'
import PersonForm from './component/PersonForm'
import Persons from './component/Persons'
import Filter from './component/Filter'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [newFilter, setNewFilter] = useState('')

  const addName = (event) => {
    const names = persons.map(person => person.name)
    event.preventDefault()

    if (names.includes(newName)) {
      alert(`${newName} is already added to phonebook`)
    } else {
      // console.log(event.target)
      const newObject = { 
        name: newName,
        number: newPhone,
        id: persons.length + 1
      }

      setPersons(persons.concat(newObject))
      setNewName('')
      setNewPhone('')
    }
  }

  const handleFilter = (event) => {
    console.log(event.target)
    setNewFilter(event.target.value)
  }

  const handleNameChange = (event) => {
    console.log(event.target)
    setNewName(event.target.value)
  }

  const handlePhoneChange = (event) => {
    console.log(event.target)
    setNewPhone(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter valFilter={newFilter} handleFilter={handleFilter} />

      <h3>Add a new</h3>

      <PersonForm 
        handleSubmit={addName}
        valName={newName}
        valPhone={newPhone}
        handleNameChange={handleNameChange}
        handlePhoneChange={handlePhoneChange}
      />

      <h3>Numbers</h3>

      <Persons persons={persons} filter={newFilter} />
    </div>
  )
}

export default App