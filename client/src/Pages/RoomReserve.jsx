import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import "../Css/Rooms.css";
import { FaWifi } from "react-icons/fa";
import { TbAirConditioning } from "react-icons/tb";
import { FaUser } from "react-icons/fa";
import { IoStarSharp } from "react-icons/io5";
import { GiWashingMachine } from "react-icons/gi";
import { IoCallSharp } from "react-icons/io5";
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import {failednotify } from '../components/Notify';
import { ToastContainer } from 'react-toastify';
import {ImSpinner2} from "react-icons/im"
import ConfirmationModal from '../components/ConfirmationModal';
import {Helmet} from "react-helmet"

const RoomReserve = () => {
  const [allRooms, setAllRooms] = useState([]);
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [refetch,setRefetch]=useState(false)



  const [modalOpen,setModalOpen]=useState(false)
  const handleModalClose=()=>setModalOpen(false)

  const getAllRoomsClient = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/get-rooms`);
      const data = await response.json();
      setAllRooms(data.rooms || []);
      setRefetch(true)
    } catch (error) {
      console.error('Error fetching rooms:', error);
    }
  };

  useEffect(() => {
    setRefetch(false)
    getAllRoomsClient();
  }, []);
  useEffect(()=>{
    if(refetch){
      getAllRoomsClient()
    }

  },[refetch])
  const { id } = useParams();
  const room = allRooms.find(room => room._id === id);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/request-room-reserve/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, contact, checkInDate, checkOutDate }),
      });

      const data = await response.json();
      if (data.success) {
        getAllRoomsClient()
        setModalOpen(true)
        setName("");
        setContact("");
        setCheckInDate("");
        setCheckOutDate("");

      } else {
        failednotify()
      }

    } catch (error) {
      failednotify()
      console.error('Error reserving room:', error);
    }
  };

  if (!room) {
    return <div className='loading-spinner'>
                <ImSpinner2 className='loading' />
              </div>
  }

  const today = new Date().toISOString().split('T')[0];

  return (
    <>
    <ToastContainer/>
      <Nav />
       <Helmet>
            <title>Pakshala - Room - {room.room_name}</title>
          </Helmet>
      <div>
        <div className="room-reserve">
          <div className="left-part">
            <div className="room-reserve-img-div">
              <img src={room.room_image1.url} alt={room.room_name} className="main-img" />
              <div className='small-imgs-div' style={{ marginTop: "1rem" }}>
                <img src={room.room_image2.url} alt="Small 1" />
                <img src={room.room_image3.url} alt="Small 2" />
                <img src={room.room_image4.url} alt="Small 3" />
              </div>
            </div>
            <div className="room-reserve-desc">
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between",flexWrap:"wrap" }}>
                <div className="nameandrating" style={{ display: "flex", alignItems: "center" }}>
                  <p style={{ fontFamily: "Lato", fontSize: "1.8rem", letterSpacing: "2px" }}>
                    {room.room_name}
                  </p>
                  <p className="room-rating">
                    <IoStarSharp className='star-icons' />4.5
                  </p>
                </div>
                <div className="price-div-2">
                  <p className="room-price-22">Rs {room.room_old_price}</p>
                  <p className="room-price-2">Rs {room.room_price}</p>
                </div>
              </div>
              <p style={{ fontSize: "1rem", fontFamily: "Lato", lineHeight: "2rem" }}>
                The rooms have on-call service, housekeeping service, 24/7 stable and fast Wi-Fi, assistance, 
                airport transfers and lodging if previously informed, and air-conditioned rooms with comfortable beds, comfortable and best hospitality. Breakfast, lunch, and 
                dinner are served to the room, but premium rooms do not have breakfast. Laundry service is available for additional costs.
              </p>
              <div style={{ display: "flex", gap: "1rem", alignItems: "center", margin: "1.2rem 0rem" }}>
                <FaUser />
                <span>Up to {room.room_guests} guest/s</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: ".8rem", marginTop: "1rem", flexWrap: "wrap" }}>
                <div style={{ background: "#ff8800", display: "flex", alignItems: "center", gap: ".8rem", color: "aliceblue", padding: ".2rem .7rem", borderRadius: "2rem" }}>
                  <FaWifi style={{ fontSize: "1rem" }} />
                  <span style={{ fontSize: ".8rem" }}>Wifi</span>
                </div>
                <div style={{ background: "#8686f0", display: "flex", alignItems: "center", gap: ".8rem", color: "aliceblue", padding: ".2rem .7rem", borderRadius: "2rem" }}>
                  <TbAirConditioning style={{ fontSize: "1rem" }} />
                  <span style={{ fontSize: ".8rem" }}>Air-conditioned</span>
                </div>
                <div style={{ background: "#03AED2", display: "flex", alignItems: "center", gap: ".8rem", color: "aliceblue", padding: ".2rem .7rem", borderRadius: "2rem" }}>
                  <IoCallSharp style={{ fontSize: "1rem" }} />
                  <span style={{ fontSize: ".8rem" }}>On-call service</span>
                </div>
                <div style={{ background: "#74E291", display: "flex", alignItems: "center", gap: ".8rem", color: "aliceblue", padding: ".3rem .7rem", borderRadius: "2rem" }}>
                  <GiWashingMachine style={{ fontSize: "1rem" }} />
                  <span style={{ fontSize: ".8rem" }}>Laundry service</span>
                </div>
              </div>
            </div>
          </div>
          <div className="right">
              <div className="user-form">
                <div className="user-form-title">
                  <h3>Reserve This room</h3>
                </div>
                <form onSubmit={handleSubmit}>
                  <div>
                    <label>Name</label>
                    <input type="text" required value={name} onChange={(e) => setName(e.target.value)} />
                  </div>
                  <div>
                    <label>Contact</label>
                    <input type="number" required value={contact} onChange={(e) => setContact(e.target.value)} />
                  </div>
                  <div>
                    <label>Check-in Date</label>
                    <input type="date" required value={checkInDate} onChange={(e) => setCheckInDate(e.target.value)} min={today} />
                  </div>
                  <div>
                    <label>Check-out Date</label>
                    <input type="date" required value={checkOutDate} onChange={(e) => setCheckOutDate(e.target.value)} min={checkInDate || today} />
                  </div>
                  {room.roomStatus==="Pending" && <p style={{color:"var(--primary-color)",marginBottom:"-1rem",marginTop:".6rem"}}>This room is currently being requested. Thank you for your understanding.</p>}
                  {room.roomStatus==="Booked" && <p style={{color:"var(--primary-color)",marginBottom:"-1rem",marginTop:".6rem"}}>This room is currently booked. Thank you for your understanding.</p>}
                  <button type="submit" style={{ backgroundColor:room.roomStatus==="Pending"? "#FFC107":room.roomStatus==="Booked"?"gray": "var(--primary-color)",cursor:room.roomStatus==="Pending"|| room.roomStatus==="Booked"?"not-allowed":""}} disabled={room.roomStatus==="Pending" || room.roomStatus==="Booked"}>{room.roomStatus==="Pending"?"In Queue":room.roomStatus==="Booked"?"Booked":("Reserve")}</button>
                </form>
              </div>
          </div>
        </div>
      </div>
      <ConfirmationModal open={modalOpen} message={"booked a room"} handleClose={handleModalClose}/>
      <Footer />
    </>
  );
}

export default RoomReserve;
