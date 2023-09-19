import { LocationData } from '@shared/types'
import { createContext, useState, ReactNode } from 'react'

interface LocationContextType {
  selectedLocation: LocationData | null;
  setSelectedLocation: (data: LocationData | null) => void;
}

interface LocationProviderProps {
  children: ReactNode;
}

export const LocationContext = createContext<LocationContextType>({ selectedLocation: null, setSelectedLocation: () => {} })

export const LocationProvider: React.FC<LocationProviderProps> = ({ children }) => {
  const [selectedLocation, setSelectedLocation] = useState<LocationData | null>(null)

  return (
    <LocationContext.Provider value={{ selectedLocation, setSelectedLocation }}>
      {children}
    </LocationContext.Provider>
  )
}
