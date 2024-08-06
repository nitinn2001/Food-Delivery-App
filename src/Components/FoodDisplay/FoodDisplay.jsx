import React, { useContext } from 'react';
import "./FoodDisplay.css";
import FoodItem from '../FoodItem/FoodItem';
import { StoreContext } from '../context/StoreContext';

const FoodDisplay = ({ category }) => {
  const { food_list, cartItems } = useContext(StoreContext);
  console.log("Food List:", food_list);
  console.log("Cart Items in FoodDisplay:", cartItems);

  if (!food_list || food_list.length === 0) {
    return <div>No food items available.</div>;
  }

  return (
    <div className='food-display'>
      <h1>Top dishes near you</h1>
      <div className="food-items-list">
        {food_list.map((item,index) => (
          category === "All" || item.category === category ? (
            <FoodItem
              key={index}
              id={item._id}
              name={item.name}
              image={item.image}
              price={item.price}
              description={item.description}
              category={item.category}
            />
          ) : null
        ))}
      </div>
    </div>
  );
};

export default FoodDisplay;
