// import React, { createContext, useContext, ReactNode } from 'react'

// export interface Notification {
//   text: string;
// }

// interface NotificationContextType {
//   showNotification: (text: string) => void;
//   hideNotification: () => void;
//   notification: Notification | null;
//   permissionStatus: NotificationPermission
// }

// export const NotificationContext = createContext<NotificationContextType | undefined>(undefined)

// export const useNotification = (): NotificationContextType => {
//   const context = useContext(NotificationContext)
//   if (!context) {
//     throw new Error('useNotification must be used within a NotificationProvider')
//   }
//   return context
// }

// interface NotificationProviderProps {
//   children: ReactNode;
// }

// export const NotificationProvider = ({ children }: NotificationProviderProps) => {
//   const [notification, setNotification] = React.useState<Notification | null>(null)
//   const [permissionStatus, setPermissionStatus] = React.useState<NotificationPermission>(Notification.permission)

//   const showNotification = (text: string) => {
//     setNotification({ text })
//   }

//   const hideNotification = () => {
//     setNotification(null)
//   }

//   function updatePermissionStatus () {
//     Notification.requestPermission()
//       .then(permission => {
//         setPermissionStatus(permission)
//       })
//       .catch(error => {
//       // Handle any potential errors here
//         console.error('Error updating notification permission:', error)
//       })
//   }

//   React.useEffect(() => {
//     updatePermissionStatus()
//   }, [])

//   return (
//     <NotificationContext.Provider value={{ showNotification, hideNotification, notification, permissionStatus }}>
//       {children}
//     </NotificationContext.Provider>
//   )
// }
