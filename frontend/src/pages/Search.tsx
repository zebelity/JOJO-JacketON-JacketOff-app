import "./Search.css"
import { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import { fetchLocation } from "api.ts"
import { LocationContext } from "contexts/LocationContext"


export default function Search() {

  const { setSelectedLocation } = useContext(LocationContext)

  const [searchInput, setSearchInput] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  function handleSearchInputChange(event) {
    setSearchInput(event.target.value);
  };

  useEffect(() => {
    if (searchInput.length >= 3) {
      fetchLocation(searchInput).then((data) => {
        setSearchResults(data);
      });
    } else {
      setSearchResults([]);
    }
  }, [searchInput]);

  function handleLocationSelection (selectedLocation) {
    console.log({selectedLocation})
    localStorage.setItem('selectedLocation', JSON.stringify(selectedLocation))
    setSelectedLocation(selectedLocation)

    window.location = '/location'
  };
  

  return (
    <section className='search-section'>
      <div className="wraptop-today">
        <Link to="/location">
        <div className="back-icon">
          <img src="./public/back.png" alt="back" />
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
          <img src="/public/search.png" alt="search" />
        </div>
      </div>
      <div className="search-result">
        <ul>
        {searchResults.map((location) => (
          
          <li key={location.id} onClick={() => handleLocationSelection(location)}>
            {location.name} - {location.country}
          </li>
        ))}
        </ul>
      </div>
    </section>
    
  )
}