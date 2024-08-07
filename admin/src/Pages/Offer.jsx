import React, { useState, useEffect } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { FaTrash } from "react-icons/fa";
import "../css/offers.css";
import { notify } from "../components/Notify";
import { ToastContainer } from 'react-toastify';
import { Infonotify } from '../components/Notify';
import { delnotify, failedaddnotify } from '../components/delnotify';

const Offers = () => {
  const [offerImg, setOfferImg] = useState(null);
  const [offerImagePath, setOfferImagePath] = useState(null);
  const [uploaded, setUploaded] = useState(null);
  const [open, setOpen] = useState(false);
  const [offerDetails, setOfferDetails] = useState({});
  const [uploading,setUploading]=useState()

  const getOffers = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/get-offers`, {
        method: 'GET',
        credentials: "include"
      });
      const result = await response.json();
      if (result.success) {
        setOfferDetails(result.offers[0]);
        setUploaded(result.offers[0]?.offer_image_url || '');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setOfferImagePath(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setOfferImg(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (event) => {
    setUploading(true)
    event.preventDefault();
    const formData = new FormData();
    formData.append('img', offerImagePath);

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/add-offer`, {
        method: 'POST',
        credentials: "include",
        body: formData
      });
      const result = await response.json();
      if (result.success) {
        setOfferImagePath(null)
        setOfferImg(null)  
        setUploading(false)
        notify();
        getOffers();
      }else{
        setUploading(false)
        failedaddnotify()
      }
    } catch (error) {
      setUploading(false)
      failedaddnotify()
      console.error('Error:', error);
    }
  }

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDeleteOffer = async (id, imageId) => {
    console.log(id, imageId);
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/delete-offer/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: "include",

        body: JSON.stringify({ imageId }),
      });
      const result = await response.json();
      if (result.success) {
        setOfferImg(null);
        setOfferImagePath(null);
        setUploaded(null);
        delnotify();
        handleClose();
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    getOffers();
  }, []);

  return (
    <div className='offers-div'>
      <ToastContainer />
      <h1>Offers</h1>
      <form onSubmit={handleSubmit}>
        <input
          accept="image/*"
          style={{ display: 'none' }}
          id="offer-image-file"
          type="file"
          onChange={handleImageChange}
        />
        <label htmlFor="offer-image-file">
          <Button variant="contained" component="span" style={{ border: "none", backgroundColor: "transparent", color: "blue", boxShadow: "none", textDecoration: "underline" }}>
            Upload Offer Image
          </Button>
        </label>
        <div className='offers-list'>
          {offerImg &&
            <div className='offer-item'>
              <img src={offerImg} alt="offer" className="offer-image" />
            </div>
          }
        </div>
        {offerImg ? (
          <>
          <Button type="submit" variant="contained" disabled={uploading}
           className='submit-button' style={{ marginLeft: ".5rem", marginTop: "1rem", marginBottom: "1rem", backgroundColor:"orange" }}>
          {uploading ? "Uploading...":"Confirm Upload"}
        </Button>
          </>
        ):(
          <>
          <Button variant="contained"
           className='submit-button disabled-button' style={{ marginLeft: ".5rem", marginTop: "1rem", marginBottom: "1rem", backgroundColor: "lightgray",boxShadow:"none"}}onClick={()=>Infonotify()}>
          Confirm Upload
        </Button>
          </>
        )}
        
      </form>
      {uploaded &&
        <div className='offer-item-2'>
          <img src={uploaded} alt="offer" className="offer-image" />
          <div style={{ backgroundColor: "white", padding: ".4rem", borderRadius: "50%", height: "2rem", width: "2rem", right: ".8rem" }}
            className='fa-trash-icon2'
            onClick={handleOpen}
          >
            <FaTrash
              style={{ cursor: "pointer", color: "red" }}
              className='fa-trash-icon2-icon'
            />
          </div>
        </div>
      }

      <Dialog
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>Delete Offer</DialogTitle>
        <DialogContent >
          <DialogContentText>
            Are you sure you want to delete this offer?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" sx={{color:"#06D001"}}>
            Cancel
          </Button>
          <Button onClick={
            ()=>handleDeleteOffer(offerDetails?._id, offerDetails?.offer_image_Id )} 
            color="primary" autoFocus sx={{color:"red"}}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Offers;
