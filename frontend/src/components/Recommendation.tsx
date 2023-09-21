import { WeatherContext } from 'contexts/WeatherContext'
import { useContext } from 'react'
import './Recommendation.css'

export default function Recommendation() {

  const { weather } = useContext(WeatherContext)

  const currentWeather = weather?.current
  // Get user preferences from local storage
  const userPreferences = getUserPreferencesFromLocalStorage(); // Implement this function
  console.log({userPreferences})

  // Function to retrieve user preferences from local storage
  function getUserPreferencesFromLocalStorage() {
    const preferences = localStorage.getItem("userPreferences");
    console.log({preferences})
    return preferences ? JSON.parse(preferences) : null;
  }

  const defaultRecommendation =
  currentWeather?.temp_c < 15 && currentWeather?.humidity < 50 && currentWeather?.wind_mph > 24 ? "Jacket ON" : "Jacket OFF";
 
  function preferenceRecommendation() {
    if (
      currentWeather?.temp_c < userPreferences?.temperature || // Note the use of "?"
      currentWeather?.humidity < userPreferences?.humidity || // Note the use of "?"
      currentWeather?.wind_mph > userPreferences?.windSpeed // Note the use of "?"
    ) {
      return "Jacket ON";
    } else {
      return "Jacket OFF"; // You were missing the "return" statement here
    }
  }


// Calculate recommendation based on user preferences (if available)
  const recommendation = userPreferences? preferenceRecommendation() : defaultRecommendation
  console.log({recommendation})
  console.log({defaultRecommendation})
  return (
    <section className='recommendation-section'>
      { weather
      ? (
      <>
      <p>{recommendation}</p>
      {recommendation === 'Jacket ON' ? (
        <img src="/public/jacket.png" alt="jacket-on" />
        ) : (
        <img src="/public/shirt.png" alt="jacket-off" />
      )}
      </>
    ) : <p className='code'>Loading recommendation data...</p>}
    </section>
  )
}