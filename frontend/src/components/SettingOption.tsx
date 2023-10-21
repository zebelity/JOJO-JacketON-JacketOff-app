import { useState } from 'react'
import './SettingOption.css'
import { useUserPreferences } from 'contexts/PreferenceContext'

export default function SettingOption (props: {
  toggleOption: () => void
}) {
  const { toggleOption } = props
  const { preferences, setPreferences } = useUserPreferences()

  const [temperature, setTemperature] = useState(preferences.temperature)
  const [humidity, setHumidity] = useState(preferences.humidity)
  const [windspeed, setWindSpeed] = useState(preferences.windspeed)

  function handleGoBack () {
    toggleOption()
  }

  function handleTemperatureChange (event: React.ChangeEvent<HTMLInputElement>) {
    setTemperature(Number(event.target.value))
  }

  function handleHumidityChange (event: React.ChangeEvent<HTMLInputElement>) {
    setHumidity(Number(event.target.value))
  }

  function handleWindSpeedChange (event: React.ChangeEvent<HTMLInputElement>) {
    setWindSpeed(Number(event.target.value))
  }

  function handleSave () {
    const updatedPreferences = {
      ...preferences,
      temperature,
      humidity,
      windspeed
    }
    // Call setPreferences to update the context with the new preferences
    setPreferences(updatedPreferences)
    handleGoBack()
  }

  return (
    <div className="settingOption smartphone tablet normal">
      <div className="goback-icon" onClick={handleGoBack}>
        <img src="/arrow-left.png" alt="back" />
      </div>
      <div className="setting-box">
        <h3>Preferences</h3>
        <p>Enter your answer below</p>
        <div className="question-box">
          <p>What’s temperature which you might need a jacket?</p>
          <button type="button" onClick={() => { setTemperature(temperature - 1) }}
            disabled={temperature === 0}>-</button>
          <input
              type="number"
              name="temperature"
              value={temperature}
              onChange={handleTemperatureChange}
            />
          <button type="button" onClick={() => { setTemperature(temperature + 1) }}>+</button>
        </div>
        <div className="question-box">
          <p>What’s humidity which can make you feel cold?</p>
          <button type="button" onClick={() => { setHumidity(humidity - 1) }}
            disabled={humidity === 0} >-</button>
          <input
              type="number"
              name="humidity"
              value={humidity}
              onChange={handleHumidityChange}
            />
          <button type="button" onClick={() => { setHumidity(humidity + 1) }}>+</button>
        </div>
        <div className="question-box">
          <p>What’s wind speed which make you feel uncomfortable?</p>
          <button type="button" onClick={() => { setWindSpeed(windspeed - 1) }}
            disabled={preferences.windspeed === 0}>-</button>
          <input
              type="number"
              name="windspeed"
              value={windspeed}
              onChange={handleWindSpeedChange}
            />
          <button type="button" onClick={() => { setWindSpeed(windspeed + 1) }}>+</button>
        </div>
        <button className='save-btn' onClick={handleSave}>Save</button>
      </div>
    </div>

  )
}
