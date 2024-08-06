import React from 'react'
import "./Navbar.css"
import { assets } from "./../../assets/assets.js"
import { useNavigate } from 'react-router-dom'

const Navbar = () => {

  const navigate=useNavigate()
  return (
    <div className='nav-bar'>
      <img className='logo' src={assets.logo} alt="" />
      <img className='profile-photo' src={assets.profile_image} alt="" />
    </div>
  )
}

export default Navbar