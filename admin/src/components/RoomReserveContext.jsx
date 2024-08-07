import React, { createContext, useState, useEffect } from "react"
import {delnotify} from "./delnotify"

export const RoomReserveContext = createContext()

const RoomReserveProvider = ({ children }) => {
  const [reserveDetails, setReserveDetails] = useState([])

  const getReserveDetails = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/get-room-reserves`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      )
      const data = await response.json()
      if (data.success) {
        setReserveDetails(data.reserves)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getReserveDetails()
  }, [])

  const handleStatusChange = async (reserveId) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/accept-room-reservation/${reserveId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ reserveId }),
        }
      )

      const data = await response.json()
      if (data.success) {
        setReserveDetails((prevDetails) =>
          prevDetails.map((reserve) =>
            reserve._id === reserveId
              ? { ...reserve, status: "Completed" }
              : reserve
          )
        )
        getReserveDetails()
      } else {
        console.error("API error:", data.message)
      }
    } catch (error) {
      console.error("Fetch error:", error)
    }
  }

  const handleDeleteReservation = async (reserveId) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/reject-room-reservation/${reserveId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      )

      const data = await response.json()
      if (data.success) {
        getReserveDetails()
        delnotify()
        setReserveDetails((prevDetails) =>
          prevDetails.map((reserve) =>
            reserve._id === reserveId
              ? { ...reserve, status: "Rejected" }
              : reserve
          )
        )
      } else {
        
        console.error("API error:", data.message)
      }
    } catch (error) {
      console.error("Fetch error:", error)
    }
  }

  return (
    <RoomReserveContext.Provider
      value={{
        reserveDetails,
        handleStatusChange,
        handleDeleteReservation,
        getReserveDetails,
      }}
    >
      {children}
    </RoomReserveContext.Provider>
  )
}

export default RoomReserveProvider
