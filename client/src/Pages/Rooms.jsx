import React from 'react'
import Nav from "../components/Nav"
import "../Css/Rooms.css"
import { motion } from 'framer-motion'
import RoomFilter from '../components/RoomFilter'
import Footer from "../components/Footer"
import {Helmet} from "react-helmet"

const Rooms = () => {
  return (
    <>
     <Helmet>
            <title>Pakshala - Rooms</title>
          </Helmet>
    <Nav/>
    <motion.div exit={{ opacity: 1 }}
      initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 1.4, ease: [0.17, 0.67, 0.83, 0.67] }}>
      <RoomFilter/>
      <Footer/>
    </motion.div>
    </>
  )
}

export default Rooms
