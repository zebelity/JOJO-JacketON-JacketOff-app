import './Location.css'
import { useContext, useState, useEffect } from 'react'
import { WeatherContext } from 'contexts/WeatherContext'
import { LocationContext } from 'contexts/LocationContext'
import { fetchWeather } from 'api.ts'
import { Link } from 'react-router-dom'
import { LocationData, WeatherData } from '@shared/types'

export default function Location () {
  const { weather } = useContext(WeatherContext)
  const { selectedLocation, setSelectedLocation } = useContext(LocationContext) // Get the selected location from the context
  const [selectedLocations, setSelectedLocations] = useState<LocationData[]>([])

  const location = weather?.location

  useEffect(() => {
    const storedLocations = JSON.parse(localStorage.getItem('selectedLocations') ?? '[]') as LocationData[]
    setSelectedLocations(storedLocations)
  }, [])

  function handleDeleteLocation (index: number) {
    const updatedLocations = [...selectedLocations]
    updatedLocations.splice(index, 1)

    setSelectedLocations(updatedLocations)
    localStorage.setItem('selectedLocations', JSON.stringify(updatedLocations))
  }

  function handleSelectLocation (location: LocationData) {
    setSelectedLocation(location)
    window.location.href = '/'
  }

  return (
    <section className="location-section smartphone tablet normal">
      <div className="wraptop-today">
        <Link to="/">
        <div className="home-icon">
          <img src="/home.png" alt="home" />
        </div>
        </Link>
        <h2>Manage Location</h2>
        <Link to="/search">
        <div className="plus-icon">
          <img src="/plus.png" alt="plus" />
        </div>
        </Link>
      </div>
      <div className="info-location">
        <div className="location-card">
          <div className="location-icon">
            <img src="/location.png" alt="location" />
          </div>
          <p>{location?.name} - {location?.country}</p>
        </div>
        {selectedLocations.map((locationItem, index) => (
          <div className="location-card" key={index}>
            <p onClick={() => { handleSelectLocation(locationItem) }} >{locationItem.name} - {locationItem.country}</p>
            <div className="trash-icon" onClick={() => { handleDeleteLocation(index) }}>
              <img src="/trash.png" alt="trash" />
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
