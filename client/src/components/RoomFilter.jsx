import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import "../Css/Rooms.css";
import { FaWifi } from "react-icons/fa";
import { TbAirConditioning } from "react-icons/tb";
import { FaUser } from "react-icons/fa";
import { fadeIn } from "../motion/motion";
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';
import { SectionWrapper } from "../motion/index";
import { ImSpinner2 } from "react-icons/im";
import { IoStarSharp } from "react-icons/io5";

const RoomCard = ({ room, index }) => {
    return (
        <motion.div className='singleroom-card'
            style={{ backgroundColor: "#F3EEEA", position: "relative" }}
            variants={fadeIn("up", "spring", index * 0.1, 0.1)}
            viewport={{ once: true }}
            initial="hidden"
            whileInView="show">
            <CardMedia
                component="img"
                alt={room.room_name}
                image={room.room_image1.url}
                className='roomcard-img'
            />
            <CardContent>
                <div className="price-div">
                    <p className="room-price2">Rs {room.room_old_price}</p>
                    <p className="room-price">Rs {room.room_price}</p>
                </div>
                <div className="nameandrating" style={{ display: "flex", alignItems: "center" }}>
                    <Typography gutterBottom component="div" style={{ fontFamily: "Lato", fontSize: "1.1rem", letterSpacing: "2px" }}>
                        {room.room_name}
                    </Typography>
                    <p className="room-rating">
                        <IoStarSharp className='star-icons' />4.5
                    </p>
                </div>
                <Typography variant="body2" style={{ fontFamily: "Lato", fontSize: "1rem", letterSpacing: "1.4px", color: "black", lineHeight: "2rem" }}>
                    <div style={{ display: "flex", gap: "1rem", alignItems: "center", marginTop: ".8rem" }}>
                        <FaUser />
                        <span>Up to {room.room_guests} guest/s</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: ".8rem", marginTop: "1rem" }}>
                        <div style={{ background: "#ff8800", display: "flex", alignItems: "center", gap: ".8rem", color: "aliceblue", padding: ".2rem .7rem", borderRadius: "2rem" }}>
                            <FaWifi style={{ fontSize: "1rem" }} />
                            <span style={{ fontSize: ".8rem" }}>Wifi</span>
                        </div>
                        <div style={{ background: "#8686f0", display: "flex", alignItems: "center", gap: ".8rem", color: "aliceblue", padding: ".2rem .7rem", borderRadius: "2rem" }}>
                            <TbAirConditioning style={{ fontSize: "1rem" }} />
                            <span style={{ fontSize: ".8rem" }}>Air-conditioned</span>
                        </div>
                    </div>
                </Typography>
            </CardContent>
            <Link to={`/rooms/${room._id}`}>
                <div className="overlay">
                    <h2>View room</h2>
                </div>
            </Link>
            <div style={{position:"absolute", top:".7rem",left:"1.2rem",display:"flex",gap:".5rem",alignItems:"center",backgroundColor:"white",padding:".3rem .8rem",borderRadius:".3rem"}}>
                <div style={{height:".7rem",width:".7rem",borderRadius:"50%",backgroundColor: room.roomStatus === "Booked" ? "#8686f0" : room.roomStatus === "Pending" ? "#FFC107" : "lightgreen"}}></div>
                <p>{room.roomStatus}</p>
            </div>
        </motion.div>
    );
};

const RoomFilter = () => {
    const [loading, setLoading] = useState(false);
    const [roomList, setRoomList] = useState([]);
    const [allRooms, setAllRooms] = useState([]);
    const [btnClicked, setClicked] = useState("all rooms");

    

    const getAllRoomsClient = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/get-rooms`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });
            const data = await response.json();
            setAllRooms(data.rooms || []);
            setRoomList(data.rooms || []);
        } catch (error) {
            console.error('Error fetching rooms:', error);
        }
    };

    useEffect(() => {
        getAllRoomsClient();
    }, []);

    const handleFilter = (e) => {
        const choice = e.target.value.toLowerCase();
        setClicked(choice);


            if (choice === "all rooms") {
                setRoomList(allRooms);
            } else {
                setRoomList(allRooms.filter(room => room.room_category === choice));
            }

    };

    return (
        <div className='room-filter'>
            <h1>Book a room</h1>
            <div className="filter-choice">
                <button value="all rooms" onClick={handleFilter} className={btnClicked === "all rooms" ? "clicked" : ""}>
                    All rooms
                </button>
                <button value="premium" onClick={handleFilter} className={btnClicked === "premium" ? "clicked" : ""}>
                    Premium
                </button>
                <button value="deluxe" onClick={handleFilter} className={btnClicked === "deluxe" ? "clicked" : ""}>
                    Deluxe
                </button>
                <button value="luxury" onClick={handleFilter} className={btnClicked === "luxury" ? "clicked" : ""}>
                    Luxury
                </button>
            </div>
            <div className="room-cards">
                {loading ? (
                    <div className='loading-spinner'>
                        <ImSpinner2 className='loading' />
                    </div>
                ) : roomList.length === 0 ? (
                    <div className='no-special-div'>
                        <h1>No rooms available</h1>
                    </div>
                ) : (
                    roomList.map((room, index) => (
                        <RoomCard key={room._id} room={room} index={index} />
                    ))
                )}
            </div>
        </div>
    );
};

export default SectionWrapper(RoomFilter, "");
