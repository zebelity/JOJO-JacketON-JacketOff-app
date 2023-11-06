import './Search.css'
import { useState, useEffect, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { fetchLocation } from 'api.ts'
import { LocationContext } from 'contexts/LocationContext'
import { LocationData } from '@shared/types'

export default function Search () {
  const { setSelectedLocation } = useContext(LocationContext)
  const navigate = useNavigate()

  const [searchInput, setSearchInput] = useState('')
  const [searchResults, setSearchResults] = useState<LocationData[]>([])
  const [error, setError] = useState(null)

  function handleSearchInputChange (event: React.ChangeEvent<HTMLInputElement>) {
    setSearchInput(event.target.value)
  }

  useEffect(() => {
    if (searchInput.length >= 3) {
      fetchLocation(searchInput).then((data) => {
        setSearchResults(data)
      }).catch(() => {
        console.error('Cannot find location', error)
        setError(error)
      })
    } else {
      setSearchResults([])
    }
  }, [searchInput, error])

  function handleAddLocation (selectedLocation: LocationData) {
    setSelectedLocation({ type: 'MANUAL', location: selectedLocation })
    console.log({ selectedLocation })

    const allSelectedLocation = JSON.parse(localStorage.getItem('selectedLocations') ?? '[]') as LocationData[]

    // Remember this location if it's not already saved
    if (!allSelectedLocation.find(location => location.id === selectedLocation.id)) {
      allSelectedLocation.push(selectedLocation)
    }

    localStorage.setItem('selectedLocations', JSON.stringify(allSelectedLocation))
    // setSelectedLocation(selectedLocation)

    navigate('/')
  }

  return (
    <section className='global search-section smartphone tablet normal'>
      <div className="wraptop-today">
        <Link to="/location">
        <div className="back-icon">
          <img src="/back.png" alt="back" />
        </div>
        </Link>
        <h2>Search</h2>
      </div>
      <div className="search-box">
        <div className="search-inner">
          <div className="search-icon">
            <img src="/search.png" alt="search" />
          </div>
            <input
              type="text"
              className="search-input"
              placeholder="Search for a location..."
              value={searchInput}
              onChange={handleSearchInputChange}
            />
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
