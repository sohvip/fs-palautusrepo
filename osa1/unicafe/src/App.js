import { useState } from 'react'

const Heading = ({text}) => <h1>{text}</h1>
const Button = ({handleClick, text}) => (
  <button onClick={handleClick}>{text}</button>)
const StatisticLine = ({text, value}) => {
  if (text === 'positive') {
    return (
      <tbody>
        <tr>
          <td>{text}</td><td>{value} %</td>
        </tr>
      </tbody>
    )
  }
  return (
    <tbody>
      <tr>
        <td>{text}</td><td>{value}</td>
      </tr>
    </tbody>
  )
}
const Statistics = ({counterg, countern, counterb, countera, counterav, counterp}) => {
  if (countera === 0) {
    return (
      <p>No feedback given</p>
    )
  }

  return (
    <table>
      <StatisticLine text='good' value={counterg}/>
      <StatisticLine text='neutral' value={countern}/>
      <StatisticLine text='bad' value={counterb}/>
      <StatisticLine text='all' value={countera}/>
      <StatisticLine text='average' value={counterav}/>
      <StatisticLine text='positive' value={counterp}/>
    </table>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const text = ['give feedback', 'statistics']
  const handleGoodClick = () => {
    setGood(good + 1)
  }
  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
  }
  const handleBadClick = () => {
    setBad(bad + 1)
  }


  return (
    <div>
      <Heading text={text[0]} />
      <Button handleClick={handleGoodClick} text='good' />
      <Button handleClick={handleNeutralClick} text='neutral' />
      <Button handleClick={handleBadClick} text='bad' />
      <Heading text={text[1]} />
      <Statistics counterg={good} countern={neutral} counterb={bad} 
      countera={good+neutral+bad} counterav={(good*1+bad*(-1))/(good+neutral+bad)} 
      counterp={good/(good+neutral+bad)} />
    </div>
  )
}

export default App