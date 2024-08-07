import React from 'react'
import "../Css/Reservationdesc.css"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import {fadeIn } from "../motion/motion"
import { SectionWrapper } from '../motion'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import Room1 from "../assets/Room1.jpeg"
import Room2 from "../assets/Room2.jpeg"
import Room3 from "../assets/Room3.jpeg"

const ReservationDesc = () => {

  return (
    <motion.div className='res-desc'>
      <motion.div className="res-text">
        <h1 className="res-head">Reservation</h1>
        <div className="res-text-div">
          <motion.p 
            className="text-text" 
          >
            Enjoy your stay in one of 280 rooms and suites, with views of either the Boudhanath Stupa or the lush gardens and surrounding mountain ranges.
            Every room and suite has its own distinctly Nepalese interior, including local artifacts, wooden flooring and Tibetan handwoven carpeting.
          </motion.p>
          <Link to="/rooms">
            <button className="res-button">All Rooms</button>
          </Link>
        </div>
      </motion.div>
      <motion.div 
        className="res-images" 
       variants={fadeIn('up', 'tween', .3, .8) } initial="hidden" 
       whileInView="show" 
       viewport={{once:"true"}}
      >
        <div style={{ width: "60%" }} >
          <LazyLoadImage src={Room1} alt="MainRoom" className='main-room' />
        </div>
        <div style={{ width: "36%", marginRight: "4rem" }}>
          <LazyLoadImage src={Room2} alt="Room2" className='side-room' />
          <LazyLoadImage src={Room3} alt="Room3" className='side-room2' />
        </div>
      </motion.div>
    </motion.div>
  )
}

export default SectionWrapper(ReservationDesc, "")
