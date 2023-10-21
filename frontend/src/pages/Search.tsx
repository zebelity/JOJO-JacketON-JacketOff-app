import './Search.css'
import { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import { fetchLocation } from 'api.ts'
import { LocationContext } from 'contexts/LocationContext'
import { LocationData } from '@shared/types'

export default function Search () {
  const { setSelectedLocation } = useContext(LocationContext)

  const [searchInput, setSearchInput] = useState('')
  const [searchResults, setSearchResults] = useState<LocationData[]>([])

  function handleSearchInputChange (event: React.ChangeEvent<HTMLInputElement>) {
    setSearchInput(event.target.value)
  }

  useEffect(() => {
    if (searchInput.length >= 3) {
      fetchLocation(searchInput).then((data) => {
        setSearchResults(data)
      }).catch(() => {
        // TODO: Handle error
      })
    } else {
      setSearchResults([])
    }
  }, [searchInput])

  function handleAddLocation (selectedLocation: LocationData) {
    console.log({ selectedLocation })
    const allSelectedLocation = JSON.parse(localStorage.getItem('selectedLocations') ?? '[]') as LocationData[]

    allSelectedLocation.push(selectedLocation)

    localStorage.setItem('selectedLocations', JSON.stringify(allSelectedLocation))
    setSelectedLocation(selectedLocation)

    window.location.href = '/location'
  }

  return (
    <section className='search-section'>
      <div className="wraptop-today">
        <Link to="/location">
        <div className="back-icon">
          <img src="/back.png" alt="back" />
        </div>
        </Link>
        <h2>Search</h2>
      </div>
      <div className="search-input">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search for a location..."
            value={searchInput}
            onChange={handleSearchInputChange}
          />
        </div>
        <div className="search-icon">
          <img src="/search.png" alt="search" />
        </div>
      </div>
      <div className="search-result">
        <ul>
        {searchResults.map((location) => (
          <li key={location.id} onClick={() => { handleAddLocation(location) }}>
            {location.name} - {location.country}
          </li>
        ))}
        </ul>
      </div>
    </section>

  )
}
