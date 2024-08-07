import React, { useEffect, useContext } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import Sidebar from "../components/Sidebar"
import "../css/admindashboard.css"
import { userLogged } from "../components/Cookie"
import { lognotify } from "../components/Notify"
import { ToastContainer } from "react-toastify"
import { Link } from "react-router-dom"
import { IoFastFoodOutline } from "react-icons/io5"
import { MdBedroomParent } from "react-icons/md"
import { MdOutlineTableBar } from "react-icons/md"
import { MdEvent } from "react-icons/md"
import { FaBell } from "react-icons/fa"
import { CheckContext } from "../components/CheckBoxContext"
import { RoomReserveContext } from "../components/RoomReserveContext"
import { TableReserveContext } from "../components/TableContext"
import { EventContext } from "../components/EventContext"
import { TokenContext } from "../components/TokenContext"

const AdminDashboard = () => {
  const { orderDetails, getOrderDetails } = useContext(CheckContext)
  const { reserveDetails, getReserveDetails } = useContext(RoomReserveContext)
  const { tableReservations, fetchTableReservations } =
    useContext(TableReserveContext)
  const { eventBookings, fetchEventBookings } = useContext(EventContext)
  const navigate = useNavigate()
  const location = useLocation()
  const {token} = useContext(TokenContext)

  useEffect(() => {
    if (
      !userLogged() &&
      location.pathname !== "/forgotpassword" &&
      location.pathname !== `/create-new-password/${token}` &&
      location.pathname !== "/signup"
    ) {
      navigate("/login")
    }
  }, [navigate])

  useEffect(() => {
    fetchEventBookings()
    getReserveDetails()
    getOrderDetails()
    fetchTableReservations()
    setTimeout(() => {
      if (userLogged() && localStorage.getItem("notify") === "true") {
        lognotify()
        localStorage.removeItem("notify")
      }
    }, 200)
  }, [])

  const Menunotification = orderDetails.filter(
    (order) => order.status === "Pending" || 0
  )
  const Roomnotification = reserveDetails.filter(
    (reserve) => reserve.status === "Pending" || 0
  )
  const Tablenotifications = tableReservations.filter(
    (reservation) => reservation.status === "Pending" || 0
  )
  const Eventnotifications = eventBookings.filter(
    (booking) => booking.status === "Pending" || 0
  )

  return (
    <div>
      <ToastContainer />
      <Sidebar />
      <div className="admin-dashboard">
        <h1 className="dashboard-title">
          Dashboard for user reservations and bookings
        </h1>
        <section className="dashboard">
          <Link to="/menu-dash" className="link-dash">
            <div className="dashboard-card">
              <div style={{ display: "flex" }}>
                <IoFastFoodOutline className="dash-icon" />
                <p>Menu Orders</p>
              </div>
              <div style={{ position: "relative" }}>
                <FaBell className="dash-icon" />
                <div
                  style={{
                    backgroundColor: "var(--hover-color)",
                    position: "absolute",
                    top: "-.6rem",
                    right: ".6rem",
                    height: "1.4rem",
                    width: "1.4rem",
                    borderRadius: "100%",
                    boxShadow: "0px 2px 2px rgba(0,0,0,.2)",
                  }}
                >
                  <p
                    style={{
                      position: "absolute",
                      top: "0.1rem",
                      right: ".4rem",
                      fontSize: "15px",
                      color: "white",
                    }}
                  >
                    {Menunotification.length}
                  </p>
                </div>
              </div>
            </div>
          </Link>
          <Link to="/rooms-dash" className="link-dash">
            <div className="dashboard-card">
              <div style={{ display: "flex" }}>
                <MdBedroomParent className="dash-icon" />
                <p>Room Reservations</p>
              </div>
              <div style={{ position: "relative" }}>
                <FaBell className="dash-icon" />
                <div
                  style={{
                    backgroundColor: "var(--hover-color)",
                    position: "absolute",
                    top: "-.6rem",
                    right: ".6rem",
                    height: "1.4rem",
                    width: "1.4rem",
                    borderRadius: "100%",
                    boxShadow: "0px 2px 2px rgba(0,0,0,.2)",
                  }}
                >
                  <p
                    style={{
                      position: "absolute",
                      top: "0.1rem",
                      right: ".4rem",
                      fontSize: "15px",
                      color: "white",
                    }}
                  >
                    {Roomnotification.length}
                  </p>
                </div>
              </div>
            </div>
          </Link>
          <Link to="/table-dash" className="link-dash">
            <div className="dashboard-card">
              <div style={{ display: "flex" }}>
                <MdOutlineTableBar className="dash-icon" />
                <p>Table Reservations</p>
              </div>
              <div style={{ position: "relative" }}>
                <FaBell className="dash-icon" />
                <div
                  style={{
                    backgroundColor: "var(--hover-color)",
                    position: "absolute",
                    top: "-.6rem",
                    right: ".6rem",
                    height: "1.4rem",
                    width: "1.4rem",
                    borderRadius: "100%",
                    boxShadow: "0px 2px 2px rgba(0,0,0,.2)",
                  }}
                >
                  <p
                    style={{
                      position: "absolute",
                      top: "0.1rem",
                      right: ".4rem",
                      fontSize: "15px",
                      color: "white",
                    }}
                  >
                    {Tablenotifications.length}
                  </p>
                </div>
              </div>
            </div>
          </Link>
          <Link to="/event-dash" className="link-dash">
            <div className="dashboard-card">
              <div style={{ display: "flex" }}>
                <MdEvent className="dash-icon" />
                <p>Event Bookings</p>
              </div>
              <div style={{ position: "relative" }}>
                <FaBell className="dash-icon" />
                <div
                  style={{
                    backgroundColor: "var(--hover-color)",
                    position: "absolute",
                    top: "-.6rem",
                    right: ".6rem",
                    height: "1.4rem",
                    width: "1.4rem",
                    borderRadius: "100%",
                    boxShadow: "0px 2px 2px rgba(0,0,0,.2)",
                  }}
                >
                  <p
                    style={{
                      position: "absolute",
                      top: "0.1rem",
                      right: ".4rem",
                      fontSize: "15px",
                      color: "white",
                    }}
                  >
                    {Eventnotifications.length}
                  </p>
                </div>
              </div>
            </div>
          </Link>
        </section>
      </div>
    </div>
  )
}

export default AdminDashboard
