import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Login } from './components/Login'
import { useEffect } from 'react'
import HealthService from './services/HealthService'
import { SharedCameras } from './components/SharedCameras'

export const App = () => {
  useEffect(() => {
    checkServerStatus()
  }, [])

  const checkServerStatus = async () => {
    try {
      const response = await HealthService.health()
      console.info('Connection status: ', response)
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/shared-cameras" element={<SharedCameras />} />
      </Routes>
    </Router>
  )
}
