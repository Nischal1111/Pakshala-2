import React from 'react'
import "../Css/Menudesc.css"
import mainFood from "../assets/mainfood.jpeg"
import secondFood from "../assets/secondfood.webp"
import thirdFood from "../assets/thirdfood.jpeg"
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {fadeIn, slideIn} from "../motion/motion"
import {SectionWrapper} from "../motion/index"

const MenuDescription = () => {
  return (
    <motion.div className='menu-desc' >
        <motion.div className="images-div" variants={fadeIn('up', 'tween', .2, .7) } initial="hidden" whileInView="show" viewport={{once:"true"}}>
            <div style={{width:"100%",display:"flex"}} className='images-div-menu-food'>
            <div className="main-food-div">
                <img src={mainFood} alt="main-food" className='mainfood-img'/>
            </div>
            <div className="two-foods">
                <img src={secondFood} alt="" className="secondfood-img"/>
                <img src={thirdFood} alt="" className='thirdfood-img'/>
            </div>
            </div>
        </motion.div>
        <motion.div className="menu-text" variants={slideIn('right', 'tween', .2, .7) } initial="hidden" whileInView="show" viewport={{once:"true"}}>
            <h1>Exquisite Dining, Unforgettable Moments.</h1>
            <p>Set on 37 acres of landscaped grounds, Hyatt Regency Kathmandu is a luxury five-star hotel designed in traditional 
                Newari-style architecture, ideally located only 4 kilometres away from the international airport.
            </p>
            <Link to="/menu">
            <button className="see-menu">
                View menu
            </button>
            </Link>
        </motion.div>
    </motion.div>
  )
}

export default SectionWrapper(MenuDescription,"")
