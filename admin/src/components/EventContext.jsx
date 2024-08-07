import React, { createContext, useState, useEffect } from 'react';
import {delnotify} from './delnotify';


export const EventContext = createContext();


const EventBookingProvider = ({ children }) => {
  const [eventBookings, setEventBookings] = useState([]);


  const fetchEventBookings = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/get-event-venues`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
      const data = await response.json();
      if (data.success) {
        setEventBookings(data.books);
      }
    } catch (error) {
      console.error('Error fetching event bookings:', error);
    }
  };
  useEffect(() => {

    fetchEventBookings();
  }, []);


  const handleStatusChange = async(bookingId) => {
     try{
      const response = fetch(`${process.env.REACT_APP_API_URL}/accept-event-booking/${bookingId}`, {
        method:"PATCH",
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body:JSON.stringify({bookingId})
      })
      const data=await response.json()
      console.log(data)
      if(data.success){
         setEventBookings((bookings) =>
      bookings.map((booking) =>
        booking._id === bookingId ? { ...booking, status: "Completed" } : booking
      )
    );
    fetchEventBookings()
      }else{
        console.log("Error")
      }
    }catch(err){
      console.log(err);
    }
  };


  const handleDeleteBooking = async (bookingId) => {
    try {


      const response = await fetch(`${process.env.REACT_APP_API_URL}/reject-event-booking/${bookingId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
      const data = await response.json();
      if (data.success) {
        delnotify()
        setEventBookings((bookings) =>
          bookings.map((booking) => booking._id === bookingId?({ ...booking, status: "Rejected" }) : booking)
        );
        fetchEventBookings()
      } else {
        
        console.error('Failed to delete booking:', data.error);
      }
    } catch (error) {
      console.error('Error deleting booking:', error);
    }
  };


  const contextValue = {
    eventBookings,
    handleStatusChange,
    handleDeleteBooking,
    fetchEventBookings
  };


  return (
    <EventContext.Provider value={contextValue}>
      {children}
    </EventContext.Provider>
  );
};

export default EventBookingProvider;
