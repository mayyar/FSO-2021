import React from "react"

const Persons = ({ person, handleClick }) => {
    return (
        <div>
            {person.name} {person.number}
            <button onClick={handleClick}>delete</button>
        </div>
    )
}

export default Persons