import React, { useState, useEffect } from 'react'
import PersonForm from './component/PersonForm'
import Persons from './component/Persons'
import Filter from './component/Filter'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [newFilter, setNewFilter] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])

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