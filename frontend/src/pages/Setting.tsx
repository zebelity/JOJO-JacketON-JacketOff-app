import './Setting.css'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import SettingOption from 'components/SettingOption'

export default function Setting () {
  const [showOption, setShowOption] = useState(false)
  // const [locationPermission, setLocationPermission] = useState<PermissionState | null>(null)

  // useEffect(() => {
  //   navigator.permissions.query({ name: 'geolocation' })
  //     .then((result) => {
  //       setLocationPermission(result.state)
  //     })
  //     .catch((error) => {
  //       console.error('Error checking geolocation permission:', error)
  //     })
  // }, [])

  function togglePreferenceOption () {
    setShowOption(!showOption)
  }

  return (
    <section className="global setting-section normal tablet smartphone">
      <div className="wraptop-today">
        <Link to="/">
        <div className="home-icon">
          <img src="/home.png" alt="home" />
        </div>
        </Link>
        <h2>Settings</h2>
      </div>

      { showOption
        ? (
        < SettingOption toggleOption={togglePreferenceOption}/>
          )
        : (
        <>
        <div className="setting-card">
          <h3>Preferences</h3>
            <div className="set-info" onClick={togglePreferenceOption}>
              <div className="setting-icon">
                <img src="/adjustments.png" alt="setting" />
              </div>
              <p>Option: By Values</p>
            </div>
        </div>
        <div className="setting-card">
          <h3>General</h3>
          <div className="set-info">
            <div className="setting-icon">
              <img src="/thermometer-warm.png" alt="thermometer" />
            </div>
            <p>Unit °C - Celsius</p>
          </div>
          <div className="set-info"
            >
            <div className="setting-icon">
              <img src="/bell.png" alt="bell" />
            </div>
            <p>Notifications</p>
          </div>
          <div className="set-info">
            <div className="setting-icon">
              <img src="/location.png" alt="setting" />
            </div>
            <p>Use Current Location</p>
          </div>
        </div>
        </>
          )}
    </section>
  )
}
