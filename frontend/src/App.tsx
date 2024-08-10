import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Login } from './components/Login'
import { SharedCameras } from './components/SharedCameras'
import { SharedCameraDetail } from './components/SharedCameraDetail'
import { Home } from './components/Home'

export const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/shared-cameras" element={<SharedCameras />} />
        <Route path="/shared-camera" element={<SharedCameraDetail />} />
      </Routes>
    </Router>
  )
}
