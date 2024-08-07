import React from 'react'
import {motion} from "framer-motion"
import {staggerContainer } from './motion'

const SectionWrapper = (Component,idName) =>
  function HOC(){
    return(<>
    <motion.section 
        variants={staggerContainer()}
        initial="hidden"
        whileInView="show"
        viewport={{once:"true",amount:.25
        }}
        className='section-wrapper-div'
    >
        <Component/>
    </motion.section>
    </>)

}

export default SectionWrapper
