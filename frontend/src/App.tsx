import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom'
import './App.css'
import Homepage from 'pages/Homepage'
import Location from 'pages/Location'
import Today from 'pages/Today'
import Setting from 'pages/Setting'
import Alert from 'pages/Alert'
import Search from 'pages/Search'
import Prompt from 'pages/Prompt'
import { useContext, useEffect } from 'react'
import { LocationContext } from 'contexts/LocationContext'
// import { useNotification } from 'contexts/NotificationContext'

function NavigationHandler () {
  const { selectedLocation } = useContext(LocationContext)
  const navigate = useNavigate()

  useEffect(() => {
    // Don't force the user back to "prompt" if they are in the middle of choosing
    // a location on the search page
    if (selectedLocation === null && !window.location.href.endsWith('/search')) {
      navigate('/prompt')
    }
  }, [selectedLocation, navigate])

  return null // this component does not render anything visually
}

export default function App () {
  // const { showNotification, permissionStatus } = useNotification()
  // const [userResponsed, setUserResponsed] = useState(false)
  // const [notificationOption, setNotificationOption] = useState(permissionStatus === 'granted')

  // useEffect(() => {
  //   if (!('Notification' in window)) {
  //     alert('Browser does not support notifications')
  //   } else if (Notification.permission === 'granted') {
  //     setUserResponsed(true)
  //     setNotificationOption(true)
  //   } else if (Notification.permission === 'denied') {
  //     setUserResponsed(true)
  //     setNotificationOption(false)
  //   }
  // }, [permissionStatus, userResponsed])

  // async function enableNotificationAndClose () {
  //   try {
  //     const permission = await Notification.requestPermission()
  //     if (permission === 'granted') {
  //       setUserResponsed(true)
  //       showNotification('Thank you for enabling notifications!')
  //     }
  //   } catch (error) {
  //     // Handle any errors here
  //     console.error('Error requesting notification permission:', error)
  //   }
  // }

  // async function disableNotificationAndClose () {
  //   try {
  //     const permission = await Notification.requestPermission()
  //     if (permission === 'denied') {
  //       setUserResponsed(true)
  //       showNotification('You have denied notification permission. To enable notifications, go to settings.')
  //     }
  //   } catch (error) {
  //     // Handle any errors here
  //     console.error('Error requesting notification permission:', error)
  //   }
  // }

  return (
    <div>
      {/* {!userResponsed && (
      <div>
        <p>Would you like to enable notification?</p>
        <button onClick={enableNotificationAndClose}>Sure!</button>
        <button onClick={disableNotificationAndClose}>No thanks!</button>
      </div>
      )}

    {userResponsed && ( */}

      <Router>
        <NavigationHandler />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/prompt" element={<Prompt />} />
          <Route path="/alert" element={<Alert />} />
          <Route path="/location" element={<Location />} />
          <Route path="/today" element={<Today />} />
          <Route path="/setting" element={<Setting />} />
        <Route path="/search" element={<Search />} />
      </Routes>
    </Router>
    {/* )} */}
    </div>
  )
}
