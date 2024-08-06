import React, { useContext, useState } from 'react';
import "./PlaceOrder.css";
import { StoreContext } from '../../Components/context/StoreContext';
import axios from "axios"

const PlaceOrder = () => {
  const { getTotalAmount, token, food_list, cartItems, url } = useContext(StoreContext);

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    phone: ""
  });

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData(prev => ({ ...prev, [name]: value }));
  };

  const placeOrder = async(event) => {
    event.preventDefault();
    let orderItems=[]
    food_list.map((item)=>{
      if(cartItems[item._id]>0){
        let itemInfo=item;
        itemInfo["quantity"]=cartItems[item._id]
        orderItems.push(itemInfo)
      }
    })

    let orderData = {
      address:data,
      items:orderItems,
      amount:getTotalAmount()+2
    }
    let response = await axios.post(url+"/api/order/place",orderData,{headers:{token}})
    if(response.data.success){
      const {session_url} = response.data;
      window.location.replace(session_url);
    }
    else{
      alert("Error");
    }
  }

  return (
    <div className='placeorder'>
      <div className="placeorder-left">
        <h1>Delivery Information</h1>
        <br />
        <form onSubmit={placeOrder}>
          <div className="divider">
            <input type='text' name='firstName' onChange={onChangeHandler} value={data.firstName} placeholder='First name' required />
            <input type='text' name='lastName' onChange={onChangeHandler} value={data.lastName} placeholder='Last name' required />
          </div>
          <input type='email' name='email' onChange={onChangeHandler} value={data.email} placeholder='Email address' required />
          <input type='text' name='street' onChange={onChangeHandler} value={data.street} placeholder='Street' required />
          <div className="divider">
            <input type='text' name='city' onChange={onChangeHandler} value={data.city} placeholder='City' required />
            <input type='text' name='state' onChange={onChangeHandler} value={data.state} placeholder='State' required />
          </div>
          <div className="divider">
            <input type='text' name='zipCode' onChange={onChangeHandler} value={data.zipCode} placeholder='Zip Code' required />
            <input type='text' name='country' onChange={onChangeHandler} value={data.country} placeholder='Country' required />
          </div>
          <input type='text' name='phone' onChange={onChangeHandler} value={data.phone} placeholder='Phone' required />
          <button type='submit' className='checkout'>CHECKOUT</button>
        </form>
      </div>
      <div className="cart-totals">
        <h2>Cart Totals</h2>
        <div className="subtotal">
          <h3>SUBTOTAL</h3>
          <p>{getTotalAmount()}</p>
        </div>
        <div className="delivery-fee">
          <h3>DELIVERY FEE</h3>
          <p>${getTotalAmount() === 0 ? 0 : 2}</p>
        </div>
        <div className="total">
          <h3>TOTAL</h3>
          <p>{getTotalAmount() === 0 ? 0 : getTotalAmount() + 2}</p>
        </div>
      </div>
    </div>
  );
};


export default PlaceOrder;
