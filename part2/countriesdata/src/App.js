import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Filter from './component/Filter'
import Display from './component/Display'

const App = () => {
  const [countries, setCountries] = useState([])
  const [newFilter, setNewFilter] = useState('')

  useEffect(() => {
    console.log('effect')
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        console.log('promise')
        setCountries(response.data)
      })     
  }, [])
  console.log('render', countries.length, 'countries')

  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setNewFilter(event.target.value)
  }

  return (
    <div>
      
      <Filter value={newFilter} onChange={handleFilterChange} />

      <Display data={countries} filterValue={newFilter} />

    </div>
  );
}

export default App;
