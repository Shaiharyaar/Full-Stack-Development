import { useState } from 'react'
import SubHeading from './components/SubHeading'
import Filter from './components/Filter'
import Persons from './components/Persons'
import PhoneBookForm from './forms/PhoneBookForm'
const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 },
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setFilterName] = useState('')

  const [filteredPersons, setFilteredPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 },
  ])

  const handleSubmit = (e) => {
    e.preventDefault()
    const newNameTrimmed = newName.trim()
    if (newNameTrimmed.trim() === '') {
      alert('Empty name cannot be added to phonebook')
    } else if (persons.some((person) => person.name === newNameTrimmed)) {
      alert(`${newNameTrimmed} is already added to phonebook`)
    } else {
      const newPersonsList = [
        ...persons,
        { name: newNameTrimmed, number: newNumber, id: persons.length + 1 },
      ]
      setPersons(newPersonsList)
      const filterHandlerFunction = handleSearch(newPersonsList)
      filterHandlerFunction(filterName)
      setNewName('')
      setNewNumber('')
    }
  }

  const nameChangeHandler = (e) => setNewName(e.target.value)
  const numberChangeHandler = (e) => setNewNumber(e.target.value)

  const handleSearch = (list) => (e) => {
    setFilterName(e?.target?.value ?? e)
    const searchVal = (e?.target?.value ?? e).toLowerCase()

    const filteredList = list.filter((item) => item.name.toLowerCase().includes(searchVal))
    setFilteredPersons(filteredList)
  }

  return (
    <div>
      <SubHeading title={'Phonebook'} />
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
      <Persons list={filteredPersons} />
    </div>
  )
}

export default App
