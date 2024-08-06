import React, { useContext, useState, useNavigate } from 'react'
import "./Navbar.css"
import { assets } from "./../../assets/assets"
import { Link } from 'react-router-dom'
import { StoreContext } from '../context/StoreContext'

const Navbar = ({showLogin,setShowLogin}) => {
    const[menu,setMenu] = useState('')
    const {getTotalAmount,token,setToken} = useContext(StoreContext)

    const logout = () => {
        localStorage.removeItem("token")
        setToken("");
        navigate('/')

    }

  return (
    <div className='navbar'>
        <img className='logo' src={assets.logo} alt="" />
        <ul className="navbar-list">
            <Link to="/"><li className={menu === 'home'?"active":""} onClick={()=>setMenu('home')}>home</li></Link>
            <li className={menu === 'menu'?"active":""} onClick={()=>setMenu('menu')}>menu</li>
            <li className={menu === 'mobile'?"active":""} onClick={()=>setMenu('mobile')}>mobile-app</li>
            <li className={menu === 'contact'?"active":""} onClick={()=>setMenu('contact')}>contact us</li>
        </ul>
        <div className="navbar-right">
            <img src={assets.search_icon} alt="" />
            <div className="navbar-basket">
                <Link to="/cart"><img src={assets.basket_icon} alt="" /></Link>
                <div className={getTotalAmount()===0?"":"dot"}></div>
            </div>
            {!token?<button onClick={()=>setShowLogin(true)} className='sign-in'>sign in</button>
            :<div className='profile-img'>
                <img className='profile-icon' src={assets.profile_icon} alt="" />
                <ul className='drop-down'>
                    <li><img src={assets.bag_icon} alt="" />Orders</li>
                    <li onClick={logout}><img src={assets.logout_icon} alt="" />Logout</li>
                </ul>
             </div>}

        </div>
    </div>
  )
}

export default Navbar