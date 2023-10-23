import { createContext, useState, ReactNode, useEffect, useContext } from 'react'

export interface UserPreferences {
  temperature: number;
  humidity: number;
  windspeed: number;
}

interface UserPreferenceContextType {
  preferences: UserPreferences;
  setPreferences: React.Dispatch<React.SetStateAction<UserPreferences>>;
}

export const UserPreferenceContext = createContext<UserPreferenceContextType | undefined>(undefined)

export const useUserPreferences = (): UserPreferenceContextType => {
  const context = useContext(UserPreferenceContext)
  if (!context) {
    throw new Error('useUserPreferences must be used within a UserPreferenceProvider')
  }
  return context
}

interface UserPreferenceProviderProps {
  children: ReactNode;
}

export const UserPreferenceProvider = ({ children }: UserPreferenceProviderProps) => {
  const [preferences, setPreferences] = useState<UserPreferences>(() => {
    // Retrieve preferences from local storage when the app initializes
    const storedPreferences = localStorage.getItem('userPreferences')
    return storedPreferences
      ? JSON.parse(storedPreferences) as UserPreferences
      : {
          temperature: 15,
          humidity: 50,
          windspeed: 24
        }
  })

  // Whenever preferences change, update local storage
  useEffect(() => {
    localStorage.setItem('userPreferences', JSON.stringify(preferences))
  }, [preferences])

  const value: UserPreferenceContextType = {
    preferences,
    setPreferences
  }

  return (
    <UserPreferenceContext.Provider value={value}>
      {children}
    </UserPreferenceContext.Provider>
  )
}
