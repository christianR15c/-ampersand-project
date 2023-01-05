import './App.css'
import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import SignupPage from './pages/SignupPage'
import AdminDashboard from './pages/AdminDashboard'
import Map from './components/Map'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/signup' element={<SignupPage />} />
        <Route path='/dashboard' element={<AdminDashboard />} />
        <Route path='/map' element={<Map />} />
      </Routes>
    </div>
  )
}

export default App