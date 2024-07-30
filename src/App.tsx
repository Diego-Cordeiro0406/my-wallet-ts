import { Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './pages/Login'
import Wallet from './pages/Wallet'

function App() {

  return (
    <Routes>
      <Route path='/' element={ <Login /> } />
      <Route path='/wallet' element={ <Wallet /> } />
    </Routes>
  )
}

export default App
