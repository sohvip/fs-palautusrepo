import { useState } from 'react'

const Filter = ({ value, onChange }) => 
  <div>
    filter shown with<input value={value} onChange={onChange}/>
  </div>

const Persons = ({ persons, filter }) => {
  if (filter === '') {
    return (
      <>
        {persons.map(person =>
          <p key={person.name}>{person.name} {person.number}</p>
        )}
      </>
    )}
  else {
    return (
      <>
        {persons.filter(person => person.name.toLowerCase().indexOf(filter.toLowerCase()) !== -1).map(person =>
          <p key={person.name}>{person.name} {person.number}</p>
        )}
      </>
    )}
  }

const PersonForm = ({ submit, name, nameChange, number, numberChange}) =>
  <form onSubmit={submit}>
    <div>
      name: <input value={name} onChange={nameChange} />
    </div>
    <div>
      number: <input value={number} onChange={numberChange} />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    if (persons.map(name => name.name).indexOf(newName) !== -1) {
      alert(`${newName} is already added to phonebook`)
    } 
    else {
      const personObject = {
        name: newName,
        number: newNumber
      }
        setPersons(persons.concat(personObject))
        setNewName('')
        setNewNumber('')
      }
    }
  
  const handleNameChange = (event) =>
    setNewName(event.target.value)
  const handleNumberChange = (event) =>
    setNewNumber(event.target.value)
  const handleFilterChange = (event) =>
    setNewFilter(event.target.value)

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter value={newFilter} onChange={handleFilterChange} />
      <h2>add a new</h2>
      <PersonForm submit={addPerson} name={newName} nameChange={handleNameChange}
      number={newNumber} numberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <Persons persons={persons} filter={newFilter} />
    </div>
  )
}

export default App