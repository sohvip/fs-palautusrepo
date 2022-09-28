import React from "react"

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

export default Persons