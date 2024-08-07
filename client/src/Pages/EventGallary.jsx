import React, { useEffect, useState } from 'react'
import { motion } from "framer-motion"
import { Link } from 'react-router-dom'
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import "../Css/nav.css"
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import {Helmet} from "react-helmet"

const EventGallary = () => {
  const [imageList,setImageList]=useState([])
  const getImages = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/get-event-images`, {
        method: 'GET',
      });

      const data = await response.json();
      if (data.success) {
        console.log(data.images)
        setImageList(data.images)

        
      }
    } catch (error) {
      console.error('Error getting images:', error);
    }
  };
  useEffect(()=>{
    getImages()
  },[])
  return (
    <>
    <Helmet>
      <title>Pakshala - Gallary</title>
    </Helmet>
    <Nav/>
    <div className='main-event-div'>
      <motion.div className="res-text">
        <h1 className="event-title">Events</h1>
        <div className="res-text-div">
          <motion.p className="text-text">
            Enjoy your stay in one of 280 rooms and suites, with views of either the Boudhanath Stupa or the lush gardens and surrounding mountain ranges.
            Every room and suite has its own distinctly Nepalese interior, including local artifacts, wooden flooring and Tibetan handwoven carpeting.
          </motion.p>
          <Link to="/about#bookvenue">
            <button className="event-button">Book Venue</button>
          </Link>
        </div>
      </motion.div>
      <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 768: 3, 992: 3 }} style={{ margin: "2rem 1rem" }}>
        <Masonry gutter='1.5rem' style={{display:"flex",flexWrap:"wr"}}>
          {imageList.map((item, index) => (
            <img className="galleryImg" src={item.image_url} key={index} alt="" />
          ))}
        </Masonry>
      </ResponsiveMasonry>
    </div>
    <Footer/>
    </>
  );
}

export default EventGallary;
