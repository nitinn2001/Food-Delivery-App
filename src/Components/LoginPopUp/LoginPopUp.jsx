import React, { useContext, useEffect, useState } from 'react'
import "./LoginPopUp.css"
import { assets } from '../../assets/assets'
import axios from "axios"
import { StoreContext } from '../context/StoreContext'

const LoginPopUp = ({showLogin, setShowLogin}) => {

    const {url,setToken} = useContext(StoreContext)
    const[toggle,setToggle]=useState('Sign Up')

    const [data,setData] = useState({
        name:"",
        email:"",
        password:""
    })

    const onChangeHandler = (event) => {
        const name=event.target.name
        const value=event.target.value
        setData(data=>({...data,[name]:value}))
    }

    const onLogin = async (event) => {
        event.preventDefault()
        let newUrl = url

        if(toggle==="Sign Up"){
            newUrl+="/api/user/register"
        }
        else{
            newUrl+="/api/user/login"
        }

        const response = await axios.post(newUrl,data)
        if(response.data.success){
            setToken(response.data.token)
            localStorage.setItem("token",response.data.token)
            setShowLogin(false)
        }
        else{
            alert(response.data.message)
        }

    }

    useEffect(()=>{
        console.log(data)
    },[data])



  return (
    <div className='loginpopup'>
        <form onSubmit={onLogin} className="content">
            <h1>{toggle}</h1>
            <img className='cross-icon' onClick={()=>setShowLogin(false)} src={assets.cross_icon} alt="" />
                <div className="inputs">
                    {toggle==="Sign Up"
                    ?
                    <input name="name" type='text' onChange={onChangeHandler} value={data.name} placeholder='Your name'/>
                    :
                    <></>}
                    <input name="email" onChange={onChangeHandler} value={data.email} type='email' placeholder='Your email'/>
                    <input name="password" type='password' onChange={onChangeHandler} value={data.password} placeholder='Your password'/>
                </div>
                <button type='submit'>{toggle==="Sign Up"?"Create Account":"Log in"}</button>
                <div className="verify">
                    <input type='checkbox' />
                    <p>By continuing, I agree to the terms of use & privacy policy</p>
                </div>
                {toggle==="Sign Up"
                ?
                <p>Already have an account? <button onClick={()=>setToggle('Log In')}>Login here</button></p>
                :
                <p>Craete a new account? <button onClick={()=>setToggle('Sign Up')}>Click here</button></p>
                }
        </form>
    </div>
  )
}

export default LoginPopUp