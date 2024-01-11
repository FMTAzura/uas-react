import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import SwaggerUI from 'swagger-ui-react'
import 'swagger-ui-react/swagger-ui.css'
import HomeActivity from './assets/Pages/HomeActivity'
import HomeDay from './assets/Pages/HomeDay'
import HomeUser from './assets/Pages/HomeUser'
import Login from './assets/Pages/Login'
import SignUp from './assets/Pages/SignUp'
import PageNotFound from './assets/Pages/Not'
import Index from './assets/Components/index'
import Edit from './assets/Pages/Admin/Edit/EditUser'

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/useractivity" element={<HomeActivity />} />
        <Route path="/userday" element={<HomeDay />} />
        <Route path="/user" element={<HomeUser />} />
        <Route path="/user/edit/:userId" element={<Edit />} />
        <Route path="/documentation" element={<SwaggerUI url="swagger.json" />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Router>
  )
}

export default App
