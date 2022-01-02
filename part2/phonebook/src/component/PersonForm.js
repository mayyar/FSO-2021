import React from "react"

const PersonForm = ({ handleSubmit, valName, valPhone, handleNameChange, handlePhoneChange}) => {
    return (
      <form onSubmit={handleSubmit}>
          <div>
            name: <input value={valName} onChange={handleNameChange} />
          </div>
          <div>
            number: <input value={valPhone} onChange={handlePhoneChange} />
          </div>
          <div>
            <button type="submit">add</button>
          </div>
      </form>
    )
}

export default PersonForm