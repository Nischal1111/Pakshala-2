import React, { useState, useEffect } from 'react';
import LookAround from '../components/LookAround';
import ReservationDesc from '../components/ReservationDesc';
import HomeDescripton from '../components/HomeDescripton';
import HomeBack from "../assets/homeback.jpg";
import { motion } from 'framer-motion';
import { Parallax } from 'react-parallax';
import Footer from '../components/Footer';
import Nav from '../components/Nav';
import { Modal, Box, IconButton } from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import Map from '../components/Map';
import { Link } from 'react-router-dom';
import { Helmet } from "react-helmet";

const Home = () => {
  const [open, setOpen] = useState(false);
  const [offer, setOffer] = useState(null);

  const getOfferImage = async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/get-offers`);
      const data = await res.json();
      if (data.success) {
        setOffer(data.offers[0].offer_image_url);
      } else {
        console.log("error");
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getOfferImage();
  }, []);

  const handleClose = () => setOpen(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setOpen(true);
      const autoCloseTimer = setTimeout(() => {
        setOpen(false);
      }, 10000);
      return () => clearTimeout(autoCloseTimer);
    }, 200);
    return () => clearTimeout(timer);
  }, [offer]);

  return (
    <motion.div style={{ overflowX: "hidden" }} initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 1 }}
      transition={{ duration: 1.4, ease: [0.17, 0.67, 0.83, 0.67] }}>
      
      <Helmet>
        <title>Pakshala - Home</title>
      </Helmet>
      
      <Nav />

      {offer && 
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="offer-modal-title"
        aria-describedby="offer-modal-description"
      >
        <Box 
          sx={{
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 0,
            outline: "none",
            position: "relative"
          }}
          className="offer-box"
        >
          <img src={offer} alt="Special Offer" style={{ width: '100%', height: "100%" }} />
          <IconButton 
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
            }}
            style={{color:"white"}}
          >
            <div style={{position:"absolute", right:"1rem", top:"1rem"}} >
              <div style={{height:"2rem", width:"2rem", borderRadius:"100%", backgroundColor:"white", boxShadow:"0px 2px 4px rgba(0,0,0,.3)"}}></div>
              <CloseIcon sx={{position:"absolute", top:".35rem", color:"black", right:".25rem"}}/>
            </div>
          </IconButton>
        </Box>
      </Modal>
      }
      
      <Parallax strength={400}>
        <div className='pakshala-home-div'>
          <img src={HomeBack} alt="pakshala" className="pakshala-home" />
          <div className="text-home-bg">
            <h1>Exquisite Dining, Unforgettable Moments.</h1>
            <p>
              Pakshala is a fine dining restaurant that offers a unique blend of Indian and international cuisine.
            </p>
            <Link to="/menu">
              <button>Order Now</button>
            </Link>
          </div>
        </div>
      </Parallax>
      <Parallax strength={600}>
        <HomeDescripton />
      </Parallax>
      <ReservationDesc />
      <LookAround />
      <Map />
      <Footer />
    </motion.div>
  );
}

export default Home;
