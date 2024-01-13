import { useEffect, useState } from 'react'
import countryService from './services/country'
import Filter from './components/Filter'
import Countries from './components/Countries'
import Country from './components/Country'

const App = () => {
  const [countries, setCountries] = useState([])
  const [isTooMany, setIsTooMany] = useState(false)
  const [filteredCountries, setFilteredCountries] = useState([])
  const [filterName, setFilterName] = useState('')
  const [selectedCountry, setSelectedCountry] = useState(null)

  const handleSearch = async (e) => {
    setSelectedCountry(null)
    setFilterName(e?.target?.value ?? e)
    const searchVal = (e?.target?.value ?? e).toLowerCase()

    if (countries.length > 0) {
      const filteredList = countries.filter((country) =>
        country?.name?.common.toLowerCase().includes(searchVal)
      )
      if (filteredList.length <= 10) {
        setIsTooMany(false)
        setFilteredCountries(filteredList)
      } else {
        if (searchVal !== '') {
          setIsTooMany(true)
        } else {
          setIsTooMany(false)
        }
        setFilteredCountries([])
      }
    }
  }

  const handleSelect = (val) => setSelectedCountry(val)

  // first time call
  const init = () => {
    countryService
      .getAll()
      .then((response) => {
        setCountries(response)
      })
      .catch((err) => {
        console.log({ err })
        // setNotification({ color: 'red', message: `Failed to get phonebook list` })
      })
  }

  useEffect(() => {
    init()
  }, [])

  return (
    <>
      <Filter value={filterName} onChange={handleSearch} />
      {isTooMany && <p>{'Too many matches, specify another filter'}</p>}
      {selectedCountry ? (
        <Country country={selectedCountry} />
      ) : filteredCountries?.length === 1 ? (
        <Country country={filteredCountries[0]} />
      ) : (
        <Countries list={filteredCountries} handleSelect={handleSelect} />
      )}
    </>
  )
}

export default App
