import React, { useEffect, useState } from 'react'
import weatherServices from '../services/weather'
import Header from './Header'
const Country = ({ country }) => {
  const [temperate, setTemperate] = useState(null)

  const getWeatherInfo = () => {
    weatherServices
      .get(...country.latlng)
      .then((response) => {
        setTemperate(response.data.current)
      })
      .then((err) => console.log({ err }))
  }
  useEffect(() => {
    getWeatherInfo()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div>
      <Header title={country.name.common} />
      <p>Capital {country.capital[0]}</p>
      <p>Area {country.area}</p>
      <h3>{'Languages:'}</h3>
      <ul>
        {Object.entries(country.languages).map(([key, value]) => (
          <li key={key}>{value}</li>
        ))}
      </ul>
      <img className={'flag-image'} src={country.flags.png} alt='flag' />
      <Header title={`Weather in ${country.name.common}`} />
      {temperate && (
        <div>
          <p>Temperature {temperate?.temp} celcius</p>
          <img
            src={`https://openweathermap.org/img/wn/${temperate.weather[0].icon}@2x.png`}
            alt={'weather icon'}
          />
          <p>Wind {temperate.wind_speed} m/s</p>
        </div>
      )}
    </div>
  )
}

export default Country
