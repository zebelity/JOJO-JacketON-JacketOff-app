import { LocationData } from '@shared/types'
import { createContext, useState, ReactNode } from 'react'

export type LocationPreference =
{ type: 'AUTO_DETECT' }|
{ type: 'MANUAL', location: LocationData }

export interface LocationContextType {
  // null means auto, undefined means no preference
  selectedLocation: LocationPreference | null;
  setSelectedLocation: (preference: LocationPreference) => void
  clearSelectedLocation: () => void
}

interface LocationProviderProps {
  children: ReactNode;
}

export const LocationContext = createContext<LocationContextType>({
  selectedLocation: null,
  setSelectedLocation: () => {},
  clearSelectedLocation: () => {}
})

export const LocationProvider: React.FC<LocationProviderProps> = ({ children }) => {
  const loadLocationFromLocalStorage = (): LocationPreference | null => {
    const storedLocation = localStorage.getItem('selectedLocation')
    if (!storedLocation) {
      return null
    }
    try {
      const parsedLocation: LocationPreference = JSON.parse(storedLocation) as LocationPreference

      return parsedLocation
    } catch (error) {
      console.error('Failed to parse stored location:', error)
      return null
    }
  }

  const [selectedLocation, _setSelectedLocation] = useState<LocationPreference | null>(loadLocationFromLocalStorage)

  function setSelectedLocation (preference: LocationPreference): void {
    /*
      When another component updates the preference, we need to do two things:
      1. Update the rest of the application (via the useState hook)
      2. Save the preference to localStorage for the next visit
    */
    _setSelectedLocation(preference)

    localStorage.setItem('selectedLocation', JSON.stringify(preference))
  }

  function clearSelectedLocation (): void {
    _setSelectedLocation(null)
    localStorage.removeItem('selectedLocation')
  }

  const contextValue: LocationContextType = {
    selectedLocation,
    setSelectedLocation,
    clearSelectedLocation
  }

  return (
    <LocationContext.Provider value={ contextValue }>
      {children}
    </LocationContext.Provider>
  )
}
