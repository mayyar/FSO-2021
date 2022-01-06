import React from "react"

const View = ({ country }) => {
  return (
    <div>
      <h2>{country.name.common}</h2>

      <div>
        capital {country.capital}
      </div>

      <div>
        population {country.population}
      </div>

      <h3>languages</h3>

      <ul>
        {Object.values(country.languages).map((language, i) => 
          <li key={i}>{language}</li>
        )}
      </ul>

      <img src={country.flags.png} alt="" />

    </div>
  )
}

export default View