import './Setting.css'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import SettingOption from 'components/SettingOption'
// import { useNotification } from 'contexts/NotificationContext'

export default function Setting () {
  const [showOption, setShowOption] = useState(false)

  // const { permissionStatus } = useNotification()
  // const [notificationOption, setNotificationOption] = useState(permissionStatus === 'granted')
  // console.log({ noti: permissionStatus })
  // const [selectedUnit, setSelectedUnit] = useState('°C')

  function togglePreferenceOption () {
    setShowOption(!showOption)
  }

  // const toggleNotificationOption = async () => {
  //   try {
  //     if (notificationOption) {
  //       const permission = await Notification.requestPermission()
  //       if (permission === 'denied') {
  //         showNotification('You have denied notification permission. To enable notifications, go to settings.')
  //       }
  //     } else {
  //       await Notification.requestPermission()
  //     }
  //     setNotificationOption(!notificationOption)
  //   } catch (error) {
  //     // Handle any errors here
  //     console.error('Error requesting notification permission:', error)
  //   }
  // }

  // function showNotify () {
  //   return permissionStatus === 'granted' ? 'ON' : 'OFF'
  // }

  // function handleUnitChange (event: React.ChangeEvent<HTMLSelectElement>) {
  //   setSelectedUnit(event.target.value)
  // }

  // useEffect(() => {
  //   console.log('Selected unit changed to:', selectedUnit)
  // }, [selectedUnit])

  return (
    <section className="setting-section normal tablet smartphone">
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
            {/* <select
                value={selectedUnit}
                onChange={handleUnitChange}
                className="unit-select"
              >
                <option value="°C">°C</option>
                <option value="°F">°F</option>
            </select> */}
          </div>
          <div className="set-info"
            // onClick={toggleNotificationOption}
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
            <p>Use Current Location </p>
          </div>
        </div>
        </>
          )}
    </section>
  )
}
