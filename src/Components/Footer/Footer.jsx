import React from 'react'
import { assets } from '../../assets/assets'
import "./Footer.css"

const Footer = () => {
  return (
    <div className='footer'>
        <div className="footer-left">
            <img className='logo' src={assets.logo} alt=""/>
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aperiam culpa non natus amet vel quidem quaerat alias odio quasi dolore, optio ex molestiae eos minus incidunt architecto dolorem iste doloremque?</p>
            <div className="social-icons">
                <img src={assets.facebook_icon} alt=""/>
                <img src={assets.twitter_icon} alt=""/>
                <img src={assets.linkedin_icon} alt=""/>
            </div>
        </div>
        <div className="footer-middle">
            <h1>COMPANY</h1>
            <ul className='company-abouts'>
                <li>Home</li>
                <li>About Us</li>
                <li>Delivery</li>
                <li>Privacy Policy</li>
            </ul>
        </div>
        <div className="footer-right">
            <h1>GET IN TOUCH</h1>
            <p>+1 (224)-818-9603</p>
            <p>contact@tomato.com</p>
        </div>
    </div>
  )
}

export default Footer