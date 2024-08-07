import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { IoStarSharp } from 'react-icons/io5';
import "../Css/menu.css"
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import MenuForm from '../components/MenuForm';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { fadeIn } from '../motion/motion';
import {Helmet} from "react-helmet"

const MenuMain = () => {
  return (
    <>
      <img src="https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=800" alt="menupage" className='menu-home' />
      <h1 className='menu-h1'>Menu</h1>
    </>
  );
};

const SpecialMenuCard = ({ item, index }) => {
  return (
    <>
      <motion.div
        className='special-card'
        style={{ backgroundColor: "#F3EEEA", position: "relative" }}
        variants={fadeIn("up", "spring", index * 0.01, 0.1)}
        initial="hidden"
        animate="show"
      >
        <CardMedia
          component="img"
          alt={item.item_name}
          image={item.item_image.url}
          className='menucard-img'
        />
        <CardContent>
          <div className="nameandrating" style={{ display: "flex", alignItems: "center" }}>
            <Typography gutterBottom component="div" style={{ fontFamily: "Lato", fontSize: "1.1rem", letterSpacing: "2px" }}>
              {item.item_name}
            </Typography>
            <p className="room-rating" style={{opacity:"1",backgroundColor: "#f8bd79"}}>
              <IoStarSharp className='star-icons' />4.5
            </p>
          </div>
        </CardContent>
      </motion.div>
    </>
  );
};

const MenuSpecial = ({ specialMenu }) => {
  const firstSection=specialMenu?.slice(0,2)
  const secondSection=specialMenu?.slice(2,4)
  return (
    <>
      <h1 className='special-h1'>
        Today's Special
      </h1>
      <div className="special-menu-container">
        {specialMenu.length>0 ?specialMenu.map((item, index) => (
          <SpecialMenuCard key={item._id} item={item} index={index} />
        )):(<>
        <div className='no-special-div'>
          <h1> No Item in Special Menu today </h1>
        </div>
        </>)}
      </div>
    </>
  );
};

const Menu = () => {
  const [specialMenu, setSpecialMenu] = useState([]);
  const [menu, setMenu] = useState({});
  const [drink, setDrink] = useState({});

  const getMenuPdf = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/get-menu-pdf`, {
        method: 'GET',
        credentials: 'include',
      });
      const data = await response.json();
      if(data.success){
        setMenu(data.menuPdfs[0]?.menu_file?.menu_url || null);
        setDrink(data.menuPdfs[0]?.drink_file?.menu_url || null);
      }
    } catch (error) {
      console.log("Error on getting menu pdf:", error);
    }
  };

  const getSpecialMenu = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/get-special-menu`, {
        method: 'GET',
        credentials: 'include',
      });
      const data = await response.json();
      if (data.success) {
        setSpecialMenu(data.specialMenuItems);
      } else {
        console.log('Failed to fetch special menu');
      }
    } catch (error) {
      console.error('Error fetching special menu:', error);
    }
  };

  

  useEffect(() => {
    getMenuPdf()
    getSpecialMenu();
  }, []);

  return (
    <>
     <Helmet>
            <title>Pakshala - Menu</title>
          </Helmet>
      <Nav />
      <motion.div initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 1 }}
        transition={{ duration: 2, ease: [0.17, 0.67, 0.83, 0.67] }}>
        <MenuMain />
        <MenuSpecial specialMenu={specialMenu} />
        <div className='view-menu'>
          <p className=''>
            You can view our menu <Link to="#">here</Link>. You will be redirected to a new page where you can explore all our offerings. Once you've made your selection, please use the form below to place your order.
          </p>
          <div>
            <Link to={menu} target='_blank'>
              <button className='overlay2'>
                <button style={{backgroundColor:"var(--primary-color)",fontSize:"1rem"}}> View Food Menu </button>
              </button>
            </Link>
            <Link to={drink} target='_blank'>
              <button className='overlay2'>
                <button style={{backgroundColor:"var(--primary-color)",fontSize:"1rem"}}> View Drink Menu </button>
              </button>
            </Link>
          </div>
        </div>
        <MenuForm />
        <Footer />
      </motion.div>
    </>
  );
};

export default Menu;
