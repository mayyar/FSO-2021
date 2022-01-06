import React from "react"
import View from "./View"

const Display = ({ data, filterValue }) => {
  let displayCountries = data.filter(country => 
    country.name.common.toLowerCase().includes(filterValue.toLowerCase())
  )
  // console.log(displayCountries)

  if (filterValue === '') {
    return null
  } else if (displayCountries.length > 10) {
    return (
      <div>
        Too many matched, specify another filter
      </div>
    )
  } else if (displayCountries.length === 1) {
    console.log(displayCountries)
    return (
      <div>
        <View country={displayCountries[0]}/>
      </div>
      
    )
  }

  return (
    <>
      {displayCountries.map((country, i) => 
        <div key={i}>
          {country.name.common}
          <button>show</button>
        </div>
      )}
    </>
  )
}

export default Display