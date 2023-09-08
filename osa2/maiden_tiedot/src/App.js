import { useState, useEffect } from 'react'
import axios from 'axios'

const Filter = ({ value, onChange }) => 
  <div>
    find countries <input value={value} onChange={onChange}/>
  </div>

const Countries = ({ countries, filter, showcountry, handleshow }) => {
  const filtered = countries.filter(country => country.name.common.toLowerCase().indexOf(filter.toLowerCase()) !== -1)
  if (filtered.length > 10) {
    return (
      <>
        <p>Too many matches, specify another filter</p>
      </>
    )
  }
  else if (showcountry.length === undefined) {
    return (
      <>
        <OneCountry country={showcountry} />
      </>
    )
  }
  else if (filtered.length > 1) {
    return (
      <>
        {filtered.map(country =>
          <Country key={country.name.common} country={country} handleshow={handleshow} />
        )}
      </>
    )
  }
  else if (filtered.length === 1) {
    return (
      <>
        <OneCountry country={filtered[0]} />
      </>
    )
  }
}

const Country = ({ country, handleshow }) => {
  return (
    <>
      <p>{country.name.common}</p>
      <button onClick={() => handleshow(country)}>show</button>
    </>
  )
}

const OneCountry = ({ country }) => {
  const [weather, setWeather] = useState(null)
  const apiKey = process.env.REACT_APP_API_KEY
  const address = `https://api.openweathermap.org/data/2.5/weather?q=${country.capital}&appid=${apiKey}&units=metric`
  useEffect(() => {
    axios
      .get(address)
      .then(response => {
        setWeather(response.data)
      })
  }, [])
  if (weather === null) {
    return null
  } else {
    return (
      <div>
        <h1>{country.name.common}</h1>
        <p>capital {country.capital}</p>
        <p>area {country.area}</p>
        <h3>languages:</h3>
        <ul>
          {Object.values(country.languages).map(language =>
            <li key={language}>{language}</li>
          )}
        </ul>
        <img src={country.flags.png} />
        <h2>Weather in {country.capital}</h2>
        <p>temperature {weather?.main.temp} celsius</p>
        <img src={`http://openweathermap.org/img/wn/${weather?.weather[0].icon}@2x.png`} />
        <p>wind {weather?.wind.speed} m/s </p>
      </div>
    )
  }
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [newFilter, setNewFilter] = useState('')
  const [showCountry, setShowCountry] = useState([])

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
    setShowCountry([])
  }
  
  const handleShowChange = (event) =>
    setShowCountry(event)

  return (
    <>
      <Filter value={newFilter} onChange={handleFilterChange} />
      <Countries countries={countries} filter={newFilter} showcountry={showCountry} handleshow={handleShowChange}/>
    </>
  )
}

export default App