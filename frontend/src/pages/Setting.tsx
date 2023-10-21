import './Setting.css'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import SettingOption from 'components/SettingOption'

export default function Setting () {
  const [showOption, setShowOption] = useState(false)
  const [selectedUnit, setSelectedUnit] = useState('°C')

  function toggleOption () {
    setShowOption(!showOption)
  }

  function handleUnitChange (event: React.ChangeEvent<HTMLSelectElement>) {
    setSelectedUnit(event.target.value)
  }

  useEffect(() => {
    console.log('Selected unit changed to:', selectedUnit)
  }, [selectedUnit])

  return (
    <section className="setting-section normal tablet smartphone">
      <div className="wraptop-today">
        <Link to="/">
        <div className="home-icon">
          <img src="./public/home.png" alt="home" />
        </div>
        </Link>
        <h2>Settings</h2>
      </div>

      { showOption
        ? (
        < SettingOption toggleOption={toggleOption}/>
          )
        : (
        <>
        <div className="setting-card">
          <h3>Preferences</h3>
            <div className="set-info" onClick={toggleOption}>
              <div className="setting-icon">
                <img src="/public/adjustments.png" alt="setting" />
              </div>
              <p>Option: By Values</p>
            </div>
        </div>
        <div className="setting-card">
          <h3>General</h3>
          <div className="set-info">
            <div className="setting-icon">
              <img src="/public/thermometer-warm.png" alt="thermometer" />
            </div>
            <p>Unit</p>
            <select
                value={selectedUnit}
                onChange={handleUnitChange}
                className="unit-select"
              >
                <option value="°C">°C</option>
                <option value="°F">°F</option>
            </select>
          </div>
          <div className="set-info">
            <div className="setting-icon">
              <img src="/public/bell.png" alt="bell" />
            </div>
            <p>Notifications</p>
          </div>
          <div className="set-info">
            <div className="setting-icon">
              <img src="/public/location.png" alt="setting" />
            </div>
            <p>Use Current Location</p>
          </div>
        </div>
        </>
          )}
    </section>
  )
}
