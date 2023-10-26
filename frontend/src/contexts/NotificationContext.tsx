import React, { createContext, useContext, ReactNode } from 'react'

interface Notification {
  text: string;
}

// Define the context type
interface NotificationContextType {
  showNotification: (text: string) => void;
  hideNotification: () => void;
  notification: Notification | null;
  permissionStatus: NotificationPermission
}

// Create the context
export const NotificationContext = createContext<NotificationContextType | undefined>(undefined)

// Create a custom hook to use the context
export const useNotification = () => {
  const context = useContext(NotificationContext)
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider')
  }
  return context
}

// Create a NotificationProvider component
interface NotificationProviderProps {
  children: ReactNode;
}

export const NotificationProvider = ({ children }: NotificationProviderProps) => {
  const [notification, setNotification] = React.useState<Notification | null>(null)
  const [permissionStatus, setPermissionStatus] = React.useState<NotificationPermission>(Notification.permission)

  const showNotification = (text: string) => {
    setNotification({ text })
  }

  const hideNotification = () => {
    setNotification(null)
  }

  return (
    <NotificationContext.Provider value={{ showNotification, hideNotification, notification, permissionStatus }}>
      {children}
    </NotificationContext.Provider>
  )
}
