import React, { useState } from 'react'
import Navbar from './Components/Navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home/Home'
import Cart from './Pages/Cart/Cart'
import Footer from './Components/Footer/Footer'
import LoginPopUp from './Components/LoginPopUp/LoginPopUp'
import PlaceOrder from './Pages/PlaceOrder/PlaceOrder'

const App = () => {

  const [showLogin,setShowLogin]=useState(false)

  return (
    <div className='main'>
        {showLogin
        ?
        <LoginPopUp showLogin={showLogin} setShowLogin={setShowLogin}/>
        :
        <></>
        }
      <div className='container'>
        <Navbar showLogin={showLogin} setShowLogin={setShowLogin} />
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/cart' element={<Cart />}/>
          <Route path='placeorder' element={<PlaceOrder />} />
        </Routes>
      </div>
      <Footer />
    </div>
  )
}

export default App