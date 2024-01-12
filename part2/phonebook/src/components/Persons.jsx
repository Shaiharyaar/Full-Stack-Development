import React from 'react'

const Persons = ({ list }) => {
  return (
    <>
      {list.map((person) => (
        <p key={person.id}>
          {' '}
          {person.name} {person.number}
        </p>
      ))}
    </>
  )
}

export default Persons
