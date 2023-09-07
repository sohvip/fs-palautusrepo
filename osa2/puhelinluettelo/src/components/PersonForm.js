const PersonForm = (props) => 
    <>
        <div>
            name: <input value={props.value} onChange={props.change}/>
        </div>
        <div>
            number: <input value={props.value2} onChange={props.change2}/>
        </div>
        <div>
            <button type="submit" onClick={props.click}>add</button>
        </div>
    </>

export default PersonForm
