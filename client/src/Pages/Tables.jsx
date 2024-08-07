import React from 'react'
import {motion} from "framer-motion"
import Nav from "../components/Nav"
import Footer from "../components/Footer"
import TableFilter from "../components/TableFilter"
import {Helmet} from "react-helmet"
const Tables = () => {
  return (
    <>
     <Helmet>
            <title>Pakshala - Tables</title>
          </Helmet>
    <Nav/>
    <motion.div exit={{ opacity: 1 }}
      initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 1.4, ease: [0.17, 0.67, 0.83, 0.67] }}>
      <TableFilter/>
      <Footer/>
    </motion.div>
    </>
  )
}

export default Tables
