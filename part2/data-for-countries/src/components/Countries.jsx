const Countries = ({ list, handleSelect }) => {
  if (!list) return null
  return (
    <>
      {list.map((country, index) => (
        <div key={index}>
          <p style={{ display: 'inline' }}>{country.name.common}</p>
          <button onClick={() => handleSelect(country)}>{'Show'}</button>
        </div>
      ))}
    </>
  )
}

export default Countries
