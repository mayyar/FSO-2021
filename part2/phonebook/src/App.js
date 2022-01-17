import React, { useState, useEffect } from 'react'
import PersonForm from './component/PersonForm'
import Persons from './component/Persons'
import Filter from './component/Filter'
import personServices from './services/persons'
import Notification from './component/Notification'
import './index.css'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [addMessage, setAddMessage] = useState(null)

  useEffect(() => {
    personServices
      .getAll()
      .then(initialPersons => {
        console.log('promise fulfilled')
        setPersons(initialPersons)
      })
  }, [])

  const addName = (event) => {
    const names = persons.map(person => person.name)
    event.preventDefault()

    if (names.includes(newName)) {
      const num = names.indexOf(newName)
      if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const person = persons[num]
        const changedPerson = { ...person, number: newPhone}
        // console.log(persons[num].id, changedPerson)
        personServices
          .update(persons[num].id, changedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== persons[num].id ? person : returnedPerson))
          })
          .catch(error => {
            setAddMessage(`Information of '${person.name}' has already been removed from server`)
            setTimeout(() => {
              setAddMessage(null)
            }, 3000)
          })
      }
    } else {
      // console.log(event.target)
      const newObject = { 
        name: newName,
        number: newPhone,
        // id: persons.length + 1
      }

      personServices
        .create(newObject)
        .then(returnedPerson => {
          // console.log(response)
          setPersons(persons.concat(returnedPerson))
          
        })
    }
    setAddMessage(`Added ${newName}`)

    setTimeout(() => {
      setAddMessage(null)
    }, 3000)
    
    setNewName('')
    setNewPhone('')
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

  const handleDeleteClick = (name, id) => {
    const person = persons.find(p => p.id === id)
    const changePersons = persons.filter(p => {
      // console.log(p.id, typeof p.id, id, typeof id)
      return p.id !== id
    })
    if (window.confirm(`Delete ${name} ?`)) {
      personServices
      .remove(id)
      .then(returnedPersons => {
        console.log(returnedPersons)
        setPersons(changePersons)
      })
    }    
  }

  const personsToShow = persons.filter(person => 
    person.name.toLowerCase().includes(newFilter.toLowerCase())
  )
  console.log(personsToShow)

  return (
    <div>
      <h2>Phonebook</h2>

      <Notification message={addMessage} />

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

      {personsToShow.map((person, i) => 
        <Persons
          key={i}
          person={person}
          handleClick={() => handleDeleteClick(person.name, person.id)} // function or function reference, not function call
        />
      )}
    </div>
  )
}

export default App