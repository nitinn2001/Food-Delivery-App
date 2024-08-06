import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [food_list, setFoodList] = useState([]);
  const url = "http://localhost:4000";
  const [token, setToken] = useState("");
  const [cartItems, setCartItems] = useState({});

  console.log(cartItems)

  const fetchFoodList = async () => {
    try {
      const response = await axios.get(`${url}/api/food/list`);
      setFoodList(response.data.data);
    } catch (error) {
      console.error("Error fetching food list:", error);
    }
  };

  const loadCartData = async (token) => {
    try {
      const response = await axios.post(`${url}/api/cart/get`, {}, {
        headers: { token }
      });
      setCartItems(response.data.cartItems);
      console.log("Cart Items Loaded:", response.data.cartItems);
    } catch (error) {
      console.error("Error loading cart data:", error);
    }
  };

  useEffect(() => {
    fetchFoodList();
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
      loadCartData(storedToken);
    }
  }, []);

  const addToCart = async (itemId) => {
    console.log(typeof(itemId), itemId);
    if (!itemId) {
      console.error("Invalid itemId:", itemId);
      return;
    }

    console.log("Sjsbjhsv")
    console.log(cartItems,typeof(cartItems))
    const newCartItems = { ...cartItems, [itemId]: (cartItems[itemId] || 0) + 1 };
    console.log("Updated Cart Items: ", newCartItems);
    setCartItems(newCartItems);
    console.log("Added to cart:", newCartItems);
  
    if (token) {
      try {
        const response = await axios.post(`${url}/api/cart/add`, { itemId }, { headers: { token } });
      } catch (error) {
        console.error('Error adding item to cart:', error);
      }
    }
  };
  
  

  const removeFromCart = async (itemId) => {
    const updatedCartItems = { ...cartItems };
    if (updatedCartItems[itemId] > 0) {
      updatedCartItems[itemId] -= 1;
      if (updatedCartItems[itemId] === 0) {
        delete updatedCartItems[itemId];
      }
      setCartItems(updatedCartItems);
      console.log("Removed from cart:", updatedCartItems);

      if (token) {
        try {
          await axios.post(`${url}/api/cart/remove`, { itemId }, { headers: { token } });
        } catch (error) {
          console.error('Error removing item from cart:', error);
        }
      }
    }
  };

  const getTotalAmount = () => {
    let total = 0;
    for (const itemId in cartItems) {
      if (cartItems[itemId] > 0) {
        const myItem = food_list.find((item) => item._id === itemId);
        if (myItem) {
          total += myItem.price * cartItems[itemId];
        }
      }
    }
    return total;
  };

  const contextValue = {
    food_list,
    cartItems,
    setCartItems,
    getTotalAmount,
    addToCart,
    removeFromCart,
    url,
    token,
    setToken
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
