import React from "react"

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

export default PersonForm