import React, { useContext } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import AdminDashboard from "./Pages/AdminDashboard";
import Menu from "./Pages/Menu";
import Rooms from "./Pages/Rooms";
import Tables from "./Pages/Tables";
import Events from "./Pages/Events";
import Offer from "./Pages/Offer";
import Sidebar from "./components/Sidebar";
import Login from "./Pages/Login";
import SignUp from "./Pages/SIgnUp";
import MenuDash from "./components/MenuDash";
import RoomsDash from "./components/RoomsDash";
import TablesDash from "./components/TablesDash";
import EventDash from "./components/EventDash";
import ForgotPassword from "./Pages/ForgotPassword";
import OTP from "./Pages/OTP";
import { TokenContext } from "./components/TokenContext";

function App() {
  const {token} = useContext(TokenContext)
  const location = useLocation();
  const hideSidebar = ["/login", "/signup", "/forgotpassword", `/create-new-password/${token}`].includes(location.pathname);

  return (
    <>
      {!hideSidebar && <Sidebar />}
      <Routes>
        <Route path="/" element={<AdminDashboard />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/create-new-password/:token" element={<OTP />} />
        <Route path="/menu-dash" element={<MenuDash />} />
        <Route path="/rooms-dash" element={<RoomsDash />} />
        <Route path="/table-dash" element={<TablesDash />} />
        <Route path="/event-dash" element={<EventDash />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/rooms" element={<Rooms />} />
        <Route path="/tables" element={<Tables />} />
        <Route path="/events" element={<Events />} />
        <Route path="/offers" element={<Offer />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </>
  );
}

export default App;
