import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Homepage from 'pages/Homepage'
import Location from 'pages/Location'
import Today from 'pages/Today'
import Setting from 'pages/Setting'
import Alert from 'pages/Alert'
import Search from 'pages/Search'
import { useEffect, useState } from 'react'
import { useNotification } from 'contexts/NotificationContext'

export default function App () {
  const { showNotification, permissionStatus } = useNotification()
  const [userResponsed, setUserResponsed] = useState(false)

  useEffect(() => {
    if (!('Notification' in window)) {
      showNotification('Browser does not support notifications')
    } else if (Notification.permission === 'granted') {
      setUserResponsed(true)
    } else if (Notification.permission === 'denied') {
      showNotification('You have denied notification permission. To enable notifications, go to settings.')
    }

    // if (Notification.permission === 'granted' && userResponsed) {
    //   // Schedule a daily notification at a specific time (e.g., 8:00 AM)
    //   const targetTime = new Date()
    //   targetTime.setHours(8, 0, 0, 0) // 8:00 AM

    //   // Calculate the time until the target time
    //   const timeUntilTarget = targetTime.getTime() - Date.now()

    //   // Set an interval to show a daily notification
    //   const notificationInterval = setInterval(() => {
    //     showNotification('Don\'t forget to check the weather and decide what to wear today!')
    //   }, timeUntilTarget)

    //   // Clear the interval when the component unmounts
    //   return () => {
    //     clearInterval(notificationInterval)
    //   }
    // }
  }, [showNotification, permissionStatus, userResponsed])

  async function enableNotificationAndClose () {
    await Notification.requestPermission().then((permission) => {
      if (permission === 'granted') {
        setUserResponsed(true)
        showNotification('Thank you for enabling notifications!')
      }
    })
  }

  function disableNotificationAndClose () {
    setUserResponsed(true)
  }

  return (
    <div>
    {userResponsed && (
       <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/alert" element={<Alert />} />
        <Route path="/location" element={<Location />} />
        <Route path="/today" element={<Today />} />
        <Route path="/setting" element={<Setting />} />
        <Route path="/search" element={<Search />} />
      </Routes>
    </Router>
    )}

    {!userResponsed && (
      <div>
        <p>Would you like to enable notification?</p>
        <button onClick={enableNotificationAndClose}>Sure!</button>
        <button onClick={disableNotificationAndClose}>No thanks!</button>
      </div>
    )}
    </div>
  )
}
