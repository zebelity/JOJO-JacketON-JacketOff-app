import "./SettingOption.css"
import { useState } from "react"
import { Link } from 'react-router-dom'

export default function SettingOption({toggleOption}) {

  const [temperature, setTemperature] = useState<number | ''>('');
  const [humidity, setHumidity] = useState<number | ''>('');
  const [windspeed, setWindSpeed] = useState<number | ''>('');
  const [showOption, setShowOption] = useState(false);

  function handleGoBack() {
    toggleOption();
  }

  function handleTemperatureChange (event: React.ChangeEvent<HTMLInputElement>) {
    const value = Number(event.target.value);
    setTemperature(value);
  };

  function handleHumidityChange (event: React.ChangeEvent<HTMLInputElement>) {
    const value = Number(event.target.value);
    setHumidity(value);
  };

  function handleWindSpeedChange (event: React.ChangeEvent<HTMLInputElement>) {
    const value = Number(event.target.value);
    setWindSpeed(value);
  };

  const incrementValue = (stateSetter: React.Dispatch<React.SetStateAction<number | ''>>) => {
    stateSetter((prevValue) => (typeof prevValue === 'number' ? prevValue + 1 : prevValue));
  };

  const decrementValue = (stateSetter: React.Dispatch<React.SetStateAction<number | ''>>) => {
    stateSetter((prevValue) => (typeof prevValue === 'number' ? prevValue - 1 : prevValue));
  };

  function handleSave () {
    // You can save the state values here or perform any other necessary actions
    console.log('Saving...', temperature, humidity, windspeed);
  };

  return (
    <div className="settingOption">
      <div className="goback-icon" onClick={handleGoBack}>
        <img src="/public/arrow-left.png" alt="back" />
      </div>
      <div className="setting-box">
        <h3>Preference by Values</h3>
        <p>Enter your answer below</p>
        <div className="question-box">
          <p>What’s temperature which you might need a jacket?</p>
          <button type="button" onClick={() => 
            decrementValue(setTemperature)}
            disabled={temperature === 0}>-</button>
          <input
              type="number"
              name="temperature"
              value={temperature}
              onChange={handleTemperatureChange}
            />
          <button type="button" onClick={() => incrementValue(setTemperature)}>+</button>
        </div>
        <div className="question-box">
          <p>What’s humidity which can make you feel cold?</p>
          <button type="button" onClick={() => 
            decrementValue(setHumidity)}
            disabled={humidity === 0} >-</button>
          <input
              type="number"
              name="humidity"
              value={humidity}
              onChange={handleHumidityChange}
            />
          <button type="button" onClick={() => incrementValue(setHumidity)}>+</button>
        </div>
        <div className="question-box">
          <p>What’s wind speed which make you feel uncomfortable?</p>
          <button type="button" onClick={() => 
            decrementValue(setWindSpeed)}
            disabled={windspeed === 0}>-</button>
          <input
              type="number"
              name="windspeed"
              value={windspeed}
              onChange={handleWindSpeedChange}
            />
          <button type="button" onClick={() => incrementValue(setWindSpeed)}>+</button>
        </div>
        <button onClick={handleSave}>Save</button>
      </div>
      
    </div>
    
  )
}