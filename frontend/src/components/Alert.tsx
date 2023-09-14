import { useContext,useState } from 'react'
import { WeatherContext } from 'WeatherContext.tsx';
import './Alert.css'


export default function Alert() {

  const { weather } = useContext(WeatherContext);

  const [alertVisible, setAlertVisible] = useState(false);

  const toggleAlert = () => {
    setAlertVisible(!alertVisible);
  };

  const alertWeather = weather?.alerts.alert

  const shouldShowAlertIcon = alertWeather?.length > 0

  return (
    <header className='app-header'>
      <div className='logo'>
        <img src="./public/logo.png" alt="logo" />
      </div>
      {shouldShowAlertIcon && (
        <div className='alert-icon'>
          <button onClick={toggleAlert}>
            <img src="./public/alert.png" alt="alert" />
          </button>
        </div>
      )}
      {alertVisible && shouldShowAlertIcon && (
        <div className="alert-message">
          { alertWeather? (
            <>
            {alertWeather.map((alert, index) => (
              <div className='alert-content' key={index}>
                <h3>{alert.event}</h3>
                <p>{alert.headline}</p>
                <p>{alert.areas}</p>
                <p>{alert.instruction}</p>
              </div>
            ))}
            </>
          ): null}
          <button onClick={toggleAlert}>Close</button>
        </div>
      )}
    </header>
  )
}
