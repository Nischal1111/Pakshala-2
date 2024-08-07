import React from 'react'
import Nav from "../components/Nav"
import Footer from "../components/Footer"
import "../Css/About.css"
import AboutDesc from '../components/AboutDesc'
import ContactDetail from '../components/ContactDetail'
import ContactForm from '../components/ContactForm'
import { motion } from 'framer-motion'
import {Background, Parallax} from "react-parallax";
import OurService from '../components/OurService'
import {Helmet} from "react-helmet"

const About = () => {
  return (
    <motion.div
    style={{overflowX:"hidden"}}
      exit={{ opacity: 1 }}
      initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 1.4, ease: [0.17, 0.67, 0.83, 0.67] }}
        >
          <Helmet>
            <title>Pakshala - About Us</title>
          </Helmet>
      <Nav/>
      <div className="mainContainer">
        <div className="wave top red">
          <h1>About Us</h1>
        </div>
      </div>
      <AboutDesc/>
      <Parallax strength={600}>
          <Background className="custom--about">
            <img src="https://images.pexels.com/photos/1581554/pexels-photo-1581554.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="pakshala" className="about--bg"/>
          </Background>
          <ContactDetail/>
          <ContactForm/>
      </Parallax>
      <OurService/>
      <Footer/>
    </motion.div>
  )
}

export default About;
