import { useEffect, useState } from 'react'
import Filter from './components/Filter'
import Persons from './components/Persons'
import Notification from './components/Notification'
import Footer from './components/Footer'
import SubHeading from './components/SubHeading'
import PhoneBookForm from './forms/PhoneBookForm'
import personService from './services/person'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setFilterName] = useState('')
  const [notification, setNotification] = useState(null)
  const [filteredPersons, setFilteredPersons] = useState([])

  const handleSubmit = (e) => {
    e.preventDefault()
    const newNameTrimmed = newName.trim()
    if (newNameTrimmed.trim() === '') {
      alert('Empty name cannot be added to phonebook')
    } else if (persons.some((person) => person.name === newNameTrimmed)) {
      if (
        window.confirm(
          `${newNameTrimmed} is already added to phonebook, replace the old number with the new one?`
        )
      ) {
        const person = persons.find((p) => p.name === newNameTrimmed)
        personService
          .update(person.id, { name: person.name, number: newNumber })
          .then(init)
          .catch((err) => {
            console.log({ err })
            setNotification({ color: 'red', message: `Failed to update '${newNameTrimmed}'!` })
          })
      }
    } else {
      const personObject = {
        name: newNameTrimmed,
        number: newNumber,
      }
      personService
        .create(personObject)
        .then((response) => {
          const newPersonsList = [...persons, response]
          setPersons(newPersonsList)
          setNotification({ color: 'green', message: `Added ${response.name}!` })

          const filterHandlerFunction = handleSearch(newPersonsList)
          filterHandlerFunction(filterName)
          setNewName('')
          setNewNumber('')
        })
        .catch((err) => {
          console.log({ err })
          setNotification({
            color: 'red',
            message: err?.response?.data?.error ?? `Failed to add '${newNameTrimmed}'!`,
          })
        })
    }
  }

  const nameChangeHandler = (e) => setNewName(e.target.value)
  const numberChangeHandler = (e) => setNewNumber(e.target.value)

  const handleSearch = (list) => (e) => {
    setFilterName(e?.target?.value ?? e)
    const searchVal = (e?.target?.value ?? e).toLowerCase()

    const filteredList = list.filter((item) => item?.name?.toLowerCase().includes(searchVal))
    setFilteredPersons(filteredList)
  }

  const handleDelete = (data) => () => {
    if (window.confirm(`Delete ${data.name} ?`)) {
      personService
        .remove(data.id)
        .then(init)
        .catch((err) => {
          console.log({ err })
          setNotification({
            color: 'red',
            message: `Information of ${data.name} has already been removed from server`,
          })
          init()
        })
    }
  }

  const init = () => {
    personService
      .getAll()
      .then((response) => {
        setPersons(response)
        const filterHandlerFunction = handleSearch(response)
        filterHandlerFunction(filterName)
      })
      .catch((err) => {
        console.log({ err })
        setNotification({ color: 'red', message: `Failed to get phonebook list` })
      })
  }

  // hooks

  useEffect(() => {
    init()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (notification?.message) {
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [notification?.message])

  return (
    <div>
      <SubHeading title={'Phonebook'} />
      <Notification color={notification?.color} message={notification?.message} />
      <Filter value={filterName} onChange={handleSearch(persons)} />

      <SubHeading title={'Add a new'} />
      <PhoneBookForm
        name={newName}
        nameChangeHandler={nameChangeHandler}
        number={newNumber}
        numberChangeHandler={numberChangeHandler}
        handleSubmit={handleSubmit}
      />
      <SubHeading title={'Numbers'} />
      <Persons list={filteredPersons} handleDelete={handleDelete} />
      <Footer />
    </div>
  )
}

export default App
