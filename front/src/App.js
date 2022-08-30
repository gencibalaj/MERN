import './App.css'
import Register from './Register'
import Login from './Login'
import Todos from './Todos'
import Home from './Home'
import Profile from './Profile'
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/todos" element={<Todos />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </div>
  )
}

export default App;
