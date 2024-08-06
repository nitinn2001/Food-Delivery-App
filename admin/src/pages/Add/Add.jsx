import React, { useState,useEffect } from 'react'
import "./Add.css"
import { assets } from '../../assets/assets'
import axios from "axios"
import { toast } from 'react-toastify'


const Add = () => {

  const url = "http://localhost:4000"

  const [image,setImage] = useState(false)
  const [data,setData] = useState({
    name:"",
    description:"",
    price:"",
    category:"Rolls"
  })

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value=e.target.value;
    setData({...data,[name]:value})
  }

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("name",data.name)
    formData.append("description",data.description)
    formData.append("price",Number(data.price))
    formData.append("category",data.category)
    formData.append("image",image)

    const result = await axios.post(`${url}/api/food/add`,formData);
    
    if(result.data.status === "success"){
      setData({
        name:"",
        description:"",
        price:"",
        category:"Rolls"
      })
      setImage(false)
      console.log("Item added successfully")
      toast.success(result.data.status)
    }
    else{
      toast.error
    }
  }

  useEffect(()=>{
    console.log(data)
  })

  return (
    <div className='add'>
      <form onSubmit={onSubmitHandler} className="flex-col">
        <div className="upload-image">
          <p>Upload Image</p>
          <label htmlFor='image'>
            <img className='item-img' src={image?URL.createObjectURL(image):assets.upload_area} alt="upload image"/>
          </label>
          <input onChange={(e)=>setImage(e.target.files[0])} type="file" id="image" hidden required />
        </div>
        <div className="product-name">
          <p>Product Name</p>
          <input onChange={onChangeHandler} type='text' name='name' placeholder='Type here' required/>
        </div>
        <div className="product-description">
          <p>Product Description</p>
          <textarea onChange={onChangeHandler} name='description' rows="6" placeholder='Write the description'></textarea>
        </div>
        <div className="product-category">
          <p>Product Category</p>
          <select onChange={onChangeHandler} name='category'>
            <option value="Salad">Salad</option>
            <option value="Rolls">Rolls</option>
            <option value="Deserts">Deserts</option>
            <option value="Sandwich">Sandwich</option>
            <option value="Cake">Cake</option>
            <option value="Pure Veg">Pure Veg</option>
            <option value="Pasta">Pasta</option>
            <option value="Noodles">Noodles</option>
          </select>
        </div>
        <div className="product-price">
          <p>Product price</p>
          <input onChange={onChangeHandler} type='number' name='price' placeholder='$20'/>
        </div>
        <button className='add-btn' type='submit'>Add</button>
      </form>
    </div>
  )
}

export default Add