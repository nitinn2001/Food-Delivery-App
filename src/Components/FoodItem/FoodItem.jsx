import React, { useContext, useState, useEffect } from 'react';
import "./FoodItem.css";
import { assets } from '../../assets/assets';
import { StoreContext } from '../context/StoreContext';

const FoodItem = ({ id, name, image, price, description, category }) => {
  const { cartItems, addToCart, removeFromCart, url } = useContext(StoreContext);
  const [itemCount, setItemCount] = useState(cartItems ? cartItems[id] || 0 : 0);

  useEffect(() => {
    setItemCount(cartItems ? cartItems[id] || 0 : 0);
  }, [cartItems, id]);

  useEffect(() => {
    console.log("Cart Items:", cartItems);
  }, [cartItems]);

  return (
    <div className='food-item'>
      <div className="food-item-img-container">
        {image && url ? (
          <>
            <img className='food-item-image' src={`${url}/images/${image}`} alt={name} />
            {!itemCount ? (
              <img onClick={() => addToCart(id)} className='only-add-image' src={assets.add_icon_white} alt="Add to cart" />
            ) : (
              <div className='add-delete'>
                <img onClick={() => addToCart(id)} className='add-image' src={assets.add_icon_green} alt="Add more" />
                <p>{itemCount}</p>
                <img onClick={() => removeFromCart(id)} className='delete-image' src={assets.remove_icon_red} alt="Remove from cart" />
              </div>
            )}
          </>
        ) : (
          <p>Image not available</p>
        )}
      </div>
      <div className="food-item-info">
        <div className="food-item-rating">
          <h2>{name}</h2>
          <img src={assets.rating_starts} alt="Rating stars" />
        </div>
        <p className="food-item-description">{description}</p>
        <h3 className="food-item-price">${price}</h3>
      </div>
    </div>
  );
};

export default FoodItem;
