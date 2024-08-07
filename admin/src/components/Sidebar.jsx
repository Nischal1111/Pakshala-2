import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import '../css/sidebar.css';
import Cookies from "js-cookie";
import { userLogged } from "../components/Cookie";

const Sidebar = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    if (!userLogged()) {
      navigate('/login');
    }
  }, [navigate]);

  const location = useLocation();

  const activePage = (pathname) => {
    if (location.pathname === pathname) {
      return "activeSideNav";
    }
    return "";
  };

  const adminLogout = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/logout-admin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
      const result = await response.json();
      if (result.success) {
        localStorage.setItem("logout", "true");
        Cookies.remove("accessToken");
        handleClose();
        navigate('/login');
      } else {
        console.error('Logout failed:', result.message);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="left">
      <div className="leftContent">
        <h1>Admin Panel</h1>
        <hr className="line" />
        <div className="navigation_Lists">
          <Link to="/" className="nav-link">
            <button className={`distnav--button ${activePage("/")}`}>
              Dashboard
            </button>
          </Link>
          <Link to="/menu" className="nav-link">
            <button className={`distnav--button ${activePage("/menu")}`}>
              Menu
            </button>
          </Link>
          <Link to="/tables" className="nav-link">
            <button className={`distnav--button ${activePage("/tables")}`}>
              Table
            </button>
          </Link>
          <Link to="/rooms" className="nav-link">
            <button className={`distnav--button ${activePage("/rooms")}`}>
              Rooms
            </button>
          </Link>
          <Link to="/events" className="nav-link">
            <button className={`distnav--button ${activePage("/events")}`}>
              Events
            </button>
          </Link>
          <Link to="/offers" className="nav-link">
            <button className={`distnav--button ${activePage("/offers")}`}>
              Offers
            </button>
          </Link>
          <div className="nav-link">
            <button onClick={handleOpen} className="distnav--button">
              Logout
            </button>
          </div>
          <Dialog
            open={open}
            onClose={handleClose}
          >
            <DialogTitle>Logout Confirmation</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Are you sure you want to logout?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary" sx={{ color: "#06D001" }}>
                Cancel
              </Button>
              <Link to="/login" onClick={adminLogout}>
              <Button onClick={adminLogout} color="primary" autoFocus sx={{ color: "red" }}>
                Logout
              </Button>
              </Link>
            </DialogActions>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
