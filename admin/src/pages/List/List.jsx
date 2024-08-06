import React, { useEffect, useState } from 'react'
import "./List.css"
import axios from 'axios'
import { toast } from 'react-toastify'

const List = () => {

  const url = "http://localhost:4000"
  const [list,setList] = useState([])

  const fetchList = async(req,res) => {
    const response = await axios.get(`${url}/api/food/list`)
    console.log(response.data.data)
    if(response.data.status === "success"){
      setList(response.data.data)
    }
    else{
      toast.error("Error")
    }
  }

  const removeFood = async(foodId) => {
    const response = await axios.post(`${url}/api/food/remove`,{id:foodId})
    await fetchList()
    toast.success("Successfully removed")
  }


  useEffect(()=>{
    fetchList()
  },[])


  return (
    <div className='list'>
      <div className='container'>
        <h1>All Foods List</h1>
        <div className="list-titles">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        <div className="list-food-items">
          {list.map((item,index)=>{
            const imageUrl = item.image

            return <div key={index} className='list-item'>
                    <img src={`${url}/images/${imageUrl}`} alt="" />
                    <p>{item.name}</p>
                    <p>{item.category}</p>
                    <p>{item.price}</p>
                    <p onClick={()=>removeFood(item._id)}>x</p>
                  </div>
          })}
        </div>

      </div>
    </div>
  )
}

export default List