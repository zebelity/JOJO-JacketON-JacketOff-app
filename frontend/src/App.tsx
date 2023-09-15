import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Homepage from 'pages/Homepage'
import Location from 'pages/Location'
import Today from 'pages/Today'
import Setting from 'pages/Setting'
import Alert from 'pages/Alert'

export default function App () {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/alert" element={<Alert />} />
        <Route path="/location" element={<Location />} />
        <Route path="/today" element={<Today />} />
        <Route path="/setting" element={<Setting />} />
      </Routes>
    </Router>
  )
}
