import React from 'react'
import "./Sidebar.css"
import { assets } from '../../assets/assets'
import { useNavigate } from 'react-router-dom'

const Sidebar = () => {
  const navigate = useNavigate()

  return (
    <div className='sidebar'>
      <div onClick={() => navigate('/add')} className="sidebar-options">
        <img src={assets.add_icon} alt="Add Items" />
        <p>Add Items</p>
      </div>
      <div onClick={() => navigate('/list')} className="sidebar-options">
        <img src={assets.order_icon} alt="List Items" />
        <p>List Items</p>
      </div>
      <div onClick={() => navigate('/orders')} className="sidebar-options">
        <img src={assets.order_icon} alt="Orders" />
        <p>Orders</p>
      </div>
    </div>
  )
}

export default Sidebar
