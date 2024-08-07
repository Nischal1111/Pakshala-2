import React from 'react'
import DescImage from "../assets/deschome.jpeg"
import "../Css/HomeDesc.css"
import SectionWrapper from '../motion/SectionWrapper'
import { motion} from "framer-motion"
import { zoomIn } from '../motion/motion'

const HomeDescripton = () => {
  return (
    <motion.div className='home-desc'>
      <motion.div 
        className="desc-text" 
      >
        <h1 className='desc-h1'>Pakshala Restro and Bar</h1>
        <p className='desc-p'>
          Pakshala Restro Bar and Hotel boasts an array of special features that elevate it to a
          league of its own in the hospitality industry. Firstly, its culinary offerings are a standout
          feature, with a diverse menu that celebrates both local flavors and international cuisine,
          prepared by top-tier chefs known for their innovation and expertise. The restro bar itself
          is a vibrant hub, offering an extensive selection of craft cocktails, fine wines, and spirits
          in an inviting atmosphere perfect for socializing or unwinding after a day of exploration.
        </p>
      </motion.div>
      <div className="img-div">
        <motion.img 
          src={DescImage} 
          alt="Desc" 
          className="img-desc" 
          variants={zoomIn(0,.5)}
          viewport={{once:"true"}}
          initial="hidden"
          whileInView="show"
        />
      </div>
    </motion.div>
  )
}

export default SectionWrapper(HomeDescripton, "")
