import { useState, useEffect } from 'react'
import axios from 'axios'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(response =>
        setPersons(response))
  }, [])
  
  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleAdd = (event) => {
    event.preventDefault()
    if (checkDuplicate()) {
      const personObject = {
        name: newName,
        number: newNumber
      }
      personService
        .create(personObject)
        .then(response =>
          setPersons(persons.concat(response))
        )
      }
    setNewName('')
    setNewNumber('')
  }

  const handleDelete = (person) => {
    if (window.confirm(`Do you really want to delete ${person.name}?`)) {
      personService
        .remove(person.id)
      setPersons(persons.filter(n => n.id !== person.id))
        }
    }

  const handleNumberMod = (person) => {
    const changedNumber = { ...person, number: newNumber }
    personService
      .update(person.id, changedNumber)
      .then(response => {
      setPersons(persons.map(p => p.id !== person.id ? p : response))
    })
  }

  const checkDuplicate = () => {
    const duplicatePerson = persons.find(
      (person) => person.name === newName
    ) 
    if (duplicatePerson) {
      if (duplicatePerson.number !== newNumber) {
        if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
          return handleNumberMod(duplicatePerson)
          }
        return false
        } else {
          alert('Person already exists with the given number')
          return false
        }
      }
    return true
  }

  const filteredPersons = newFilter
    ? persons.filter(person =>
      person.name.toLowerCase().includes(newFilter.toLowerCase()))
    : persons

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <Filter value={newFilter} change={handleFilterChange} />
        <h2>Add a new person</h2>
        <PersonForm value={newName} change={handleNameChange} value2={newNumber} change2={handleNumberChange} click={handleAdd} />
      </form>
      <h2>Numbers</h2>
      {filteredPersons.map(person => 
        <Persons key={person.id} id={person.id} name={person.name} number={person.number} handle={() => handleDelete(person)} />
      )}
    </div>
  )

}

export default App