import React, { useEffect } from 'react';
import './ExploreMenu.css';
import { menu_list } from '../../assets/assets';

const ExploreMenu = ({ category, setCategory }) => {

  useEffect(()=>{
    console.log(category)
  })
  return (
    <div className='exploremenu'>
      <h1>Explore our menu</h1>
      <p>Choose from a diverse menu featuring a delectable array of dishes crafted with the finest ingredients and culinary expertise. Our mission is to satisfy your cravings and elevate your dining experience</p>
      <div className='items'>
        {menu_list.map((menu, index) => (
          <div key={index} onClick={() => setCategory(prev => prev === menu.menu_name ? "All" : menu.menu_name)} className='item'>
            <img className={menu.menu_name === category ? "active" : ""} src={menu.menu_image} alt={menu.menu_name} />
            <p>{menu.menu_name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExploreMenu;
