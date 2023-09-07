const Persons = (props) => {
    return (
      <p>{props.name} {props.number} <button type='submit' onClick={props.handle}>delete</button></p>
    )
  }

export default Persons
