import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import "./styles/App.css"

// Import auth pages
import Login from "pages/auth/Login"
import Register from "pages/auth/Register"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
