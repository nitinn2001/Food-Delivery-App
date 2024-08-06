import React, { useContext, useEffect } from 'react'
import "./Cart.css"
import { StoreContext } from '../../Components/context/StoreContext'
import { assets, food_list } from '../../assets/assets'
import { useNavigate } from 'react-router-dom'

const Cart = () => {
  const {food_list,cartItems,addToCart,removeFromCart,getTotalAmount,url} = useContext(StoreContext)
  const navigate = useNavigate()

  useEffect(()=>{
    console.log(cartItems)
  })

  return (
    <div className='cart'>
      <div className="cart-titles">
        <p>Items</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
      </div>
      <div className="cart-items">
        {food_list.map((item,index)=>{
          if(item._id in cartItems && cartItems[item._id]>0){
            return <div className="each-cart-item">
                      <img src={url+"/images/"+item.image} alt="" />
                      <p>{item.name}</p>
                      <p>{item.price}</p>
                      <p>{cartItems[item._id]}</p>
                      <p>{cartItems[item._id]*item.price}</p>
                      <p className='remove' onClick={()=>removeFromCart(item._id)}>x</p>
                   </div>
          }
        })}
      </div>
      <div className="cart-totals">
        <div className="subtotal">
          <h3>SUBTOTAL</h3>
          <p>{getTotalAmount()}</p>
        </div>
        <div className="delivery-fee">
          <h3>DELIVERY FEE</h3>
          <p>2</p>
        </div>
        <div className="total">
          <h3>TOTAL</h3>
          <p>{getTotalAmount()+2}</p>
        </div>
        <button onClick={()=>navigate('/placeorder')} className='checkout'>CHECKOUT</button>
      </div>
    </div>
  )
}

export default Cart