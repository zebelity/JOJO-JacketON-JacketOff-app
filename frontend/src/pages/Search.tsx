import "./Search.css"
import { useContext, useState, useEffect } from 'react'
import { WeatherContext } from 'WeatherContext.tsx'
import { Link } from 'react-router-dom'

export default function Search() {

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
    </section>
    
  )
}