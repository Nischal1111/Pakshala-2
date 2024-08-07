import React from 'react'
import "../Css/About.css"
import { MdCall } from "react-icons/md";
import { MdEmail } from "react-icons/md";
import { MdLocationOn } from "react-icons/md";

const ContactDetail = () => {
  return (
    <div className='about-choose'>
      <div className="contact-container">
        <div style={{height:"100%",position:"relative"}}>
        <h1 className='contact-title'>Our Contacts</h1>
        <hr className='contact-line'/>
        <div className="contact-icons">
          <div className="call" style={{display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column",textAlign:"center"}}>
              <MdCall/>
            <div style={{fontFamily:"Lato",fontSize:"1rem",marginTop:"1rem"}}>
              <p>+977 014 583773</p>
              <p>+977 9847376437</p>
            </div>
          </div>
          <div className="location" style={{display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column",textAlign:"center"}}>
            <MdLocationOn />
            <div style={{fontFamily:"Lato",fontSize:"1rem",marginTop:"1rem"}}>
              <p>Bhagwati Marga</p>
              <p>Naxal, Kathmandu</p>
            </div>
          </div>
          <div className="email" style={{display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column",textAlign:"center"}}>
            <MdEmail/>
            <div style={{fontFamily:"Lato",fontSize:"1rem",marginTop:"1rem"}}>
              <p>pakshala@gmail.com</p>
              <p>restroakshala@gmail.com</p>
            </div>
          </div>
        </div>
        <div className="contact-hours">
          <h2>HOURS</h2>
          <h3>Monday - <span>10am-10pm</span></h3>
          <h3>Tuesday - <span>10am-10pm</span></h3>
          <h3>Wednesday - <span>10am-10pm</span></h3>
          <h3>Thursday - <span>10am-10pm</span></h3>
          <h3>Friday - <span>10am-2am</span></h3>
          <h3>Saturday - <span>10am-2am</span></h3>
          <h3>Sunday - <span>10am-2am</span></h3>
        </div>
        </div>
      </div>
    </div>
  )
}

export default ContactDetail
