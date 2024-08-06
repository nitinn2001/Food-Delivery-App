import React from 'react'
import Navbar from './Components/Navbar/Navbar'
import Sidebar from './Components/Sidebar/Sidebar'
import {Route, Routes} from "react-router-dom"
import Add from './pages/Add/Add'
import List from './pages/List/List'
import Order from './pages/Order/Order'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <div>
      <ToastContainer />
      <Navbar />
      <div className="app-content">
        <Sidebar />
        <Routes>
          <Route path='/' element={<></>} />
          <Route path='/add' element={<Add />} />
          <Route path='/list' element={<List />} />
          <Route path='/order' element={<Order />} />
        </Routes>
      </div>
    </div>
  )
}

export default App