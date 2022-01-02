import React from "react"

const Persons = ({ persons, filter }) => {
    const newPersons = persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
    return (
        <>
        {newPersons.map(person =>
            <div key={person.id}>{person.name} {person.number}</div>
          )}
        </>
    )
}

export default Persons