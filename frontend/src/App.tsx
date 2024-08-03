import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Login } from './components/Login'
import { useEffect } from 'react'
import HealthService from './services/HealthService'

export const App = () => {
  useEffect(() => {
    checkServerStatus()
  }, [])

  const checkServerStatus = async () => {
    try {
      const response = await HealthService.health()
      console.log(response)
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />}></Route>
      </Routes>
    </Router>
  )
}
