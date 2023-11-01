import { useContext, useEffect, useState, useCallback } from 'react'
import { LocationContext } from 'contexts/LocationContext'
import { useNavigate } from 'react-router-dom'

export default function Prompt () {
  const { setSelectedLocation } = useContext(LocationContext)
  const [locationPermission, setLocationPermission] = useState<PermissionState | null>(null)
  const navigate = useNavigate()

  const saveAutoDetect = useCallback(() => {
    setSelectedLocation({ type: 'AUTO_DETECT' })
    navigate('/')
  }, [setSelectedLocation, navigate])

  const gotoSearch = useCallback(() => {
    navigate('/search')
  }, [navigate])

  useEffect(() => {
    // If we don't know what the permission is, query it
    if (locationPermission === null) {
      navigator.permissions.query({ name: 'geolocation' })
        .then(result => {
          console.log(result.state)
          setLocationPermission(result.state)

          if (result.state === 'denied') {
            // User has previously denied; go directly to search
            gotoSearch()
          } else if (result.state === 'granted') {
            // User has previously granted; save as AUTO_DETECT and go to home page
            saveAutoDetect()
          }
        })
        .catch((error: Error) => {
          console.error('Error querying geolocation permission:', error.message)
        })
    }
  }, [locationPermission, setSelectedLocation, navigate, gotoSearch, saveAutoDetect])

  const requestLocationPermission = () => {
    navigator.geolocation.getCurrentPosition(
      saveAutoDetect,
      gotoSearch
    )
  }

  return (
    <div>
      {locationPermission === 'prompt' &&
        <>
          <p>Would you like to share your current location for JOJO app?</p>
          <button onClick={requestLocationPermission}>Sure!</button>
          <button onClick={gotoSearch}>No Thanks!</button>
        </>
      }
    </div>
  )
}
